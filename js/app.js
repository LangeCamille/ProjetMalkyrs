const store = new Vuex.Store({
  state: {
    lignes: [null], //contiendra les infos sur les dossiers de l'agent ennemis
    head:[
     "Id",
     "Nom",
     "Créé le",
     "Mise à jour le",
     "Description",
     "Clone URL"
   ]
  },
  mutations: {
    addLigne(state, ligne) { // rajoute une ligne au tableau
      var newDate = ligne.date.split("T")
      newDate = newDate[0].split("-")

      var newMaJ = ligne.mAj.split("T")
      newMaJ = newMaJ[0].split("-")

      state.lignes[state.lignes.length] = {
        id: ligne.id,
        name: ligne.name,
        date: newDate[2]+"/"+newDate[1]+"/"+newDate[0], //reformatage de la date au format dd/mm/yyyy
        mAj: newMaJ[2]+"/"+newMaJ[1]+"/"+newMaJ[0], //reformatage de la date au format dd/mm/yyyy
        desc: ligne.desc,
        url: ligne.url
      }
    },
    viderTableau(state) { //fais place propre
      state.lignes = []
    }
  }
})

const agent = new Vue({
  el: '#agent',
  data: {
    store,
    nom: '',
    cacher: true,
    texte: 'J\'attend le nom de l\'agent',
    actifCheck: false,
    recentCheck: false
  },
  watch: {
    nom: function(newText, oldText) {
      if(this.nom == '')
        this.texte = 'J\'attend le nom de l\'agent'
      else
      {
        this.texte = "le nom de votre agent est : " + this.nom
        this.getData();
      }
    }
  },
  methods: {
    viderTableau(){ // cache le haut du tableau et demande au store de se netoyer
      store.commit("viderTableau")
      if (document.getElementById('head'))
        document.getElementById('head').classList.add("cacher")
    },
    getData: _.debounce(
      function()
      {
        if(this.nom != "") // pour éviter de faire des requête si le nom de l'agent n'est pas renseigné
        {
          var vue = this
          axios.get("https://api.github.com/users/"+this.nom+"/repos") // la requête récupérera les dossiers de l'agent dont le nom est dans stocké dans la vue
          .then((response) =>
          {
            this.viderTableau()
            vue.cacher = false // on affiche le tableau de résultats

            for(var i = 0; i < response.data.length; i ++ )
            {
              vue.addLigne( // on ajoute les infos récupérées sur l'agent ennemis dans notre magasin
                            response.data[i].id,
                            response.data[i].name,
                            response.data[i].created_at,
                            response.data[i].updated_at,
                            response.data[i].description,
                            response.data[i].clone_url)
            }
          })
          .catch(function () {
            console.log("Erreur ! Impossible d'accéder à l'API.")
            vue.cacher = true // si on a pas de résultat on camoufle le tableau
          })
        }
        else
          this.cacher = true
      },
      500 // la requête se déclanchera qu'au bout de 500 millisecondes sans saisie de l'utilisateur
    ),
    addLigne(newid, newname, created_at, updated_at, description, clone_url){ // demande au magasin d'ajouter une ligne
      var ligne = { // préparation de la ligne à ajouter
        id: newid,
        name: newname,
        date: created_at,
        mAj: updated_at,
        desc: description,
        url: clone_url
      }
      store.commit('addLigne',ligne)
    },
    recent: function(){ //cherche les dossiers récent (c'est à dire créés il y a moins de 3 mois)
      if (this.recentCheck) // permet le reset de l'affichage
        this.recentCheck = false
      else
        this.recentCheck = true

      var date = new Date();

      for (var i = 1; i < store.state.lignes.length; i++) {
        var temp = this.store.state.lignes[i].date.split("/")
        var mois = parseInt(temp[1].substr(1,temp[1].length)) // récupère le mois de création du dossier
        var an = parseInt(temp[3]) // récupère l'année de création du dossier
        var ligne = document.getElementById(i) // récupère la ligne en cour de traitement

        if (this.recentCheck) { // permet le reset de l'affichage
          ligne.classList.add("cacher") // cache la ligne
          if (mois >= date.getMonth()-3 && an >= parseInt(date.getFullYear)) // si le dossier est récent
            ligne.classList.remove("cacher") // affiche la ligne
        }
        else
          ligne.classList.remove("cacher") // affiche toutes les lignes
      }
    },
    actif: function(){ //cherche les dossiers actifs (les dossiers avec un commit plus récent qu'une semaine)
      if (this.actifCheck) // permet le reset de l'affichage
        this.actifCheck = false
      else
        this.actifCheck = true

      var vue = this
      var date = new Date();

      var an = date.getFullYear() // on récupère l'année

      var mois
      if(date.getMonth() < 10) // formate le mois au format mm (donc de 01 à 12)
        mois = "0"+date.getMonth()
      else
        mois = date.getMonth()

      var jour
      if(date.getDate() <= 7) { // on va devoir addapter le mois et éventuellement l'année
        if(date.getMonth() == 1) { // on opère la passation sur le mois précédent ET l'année précédente
          jour = 0
          mois = 0
          an --
        }
        else { // on opère la passation sur le mois précédent
          jour = 0
          mois --
        }
      }
      else
        jour = date.getDate() - 7 // on récupère le jour actuel - 1 semaine

      for (var i = 1; i < store.state.lignes.length; i++) {
        var ligne = document.getElementById(i) // récupère la ligne en cour de traitement
        if (vue.actifCheck) // permet le reset de l'affichage
        {
          ligne.classList.add("cacher") // cache la ligne
          axios.get("https://api.github.com/repos/"+this.nom+"/"+this.store.state.lignes[i].id+"/commits?since="+an+"-"+mois+"-"+jour+"T00:00:00Z") // requête trouvant les tous lescommits sur un répertoire depuis la date du jour - une semaine
          .then((response) =>
          {
            ligne.classList.remove("cacher") // affiche la ligne
          })
          .catch(function () {
            console.log("Erreur ! Impossible d'accéder à l'API.")
          })
        }
        else
          ligne.classList.remove("cacher") // affiche toutes les lignes
      }
    },
    resetNom: function(){ //permet de reset l'application en un clic
      this.nom = ''
      this.viderTableau()
      this.cacher = true
    }
  }
})
