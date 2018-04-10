<template>
  <div id="agent">
    <p>Saisissez le nom d'un agent</p>
    <p>
      <input v-model="nom"/>
      <button type="button" v-on:click="resetNom">Reset</button>
    </p>
    <p>{{ texte }}</p>
    <div v-if="!cacher">
      <p>Dossier(s) de {{ nom }}</p>
      <div>
        <h4>Filtres : </h4>
        <p>
          <label for="recent">Dossiers récent : </label>
          <input type="checkbox" name="recent" v-on:click="recent">
        </p>
        <p>
          <label for="actif">Dossiers actifs : </label>
          <input type="checkbox" name="actif" v-on:click="actif">
        </p>
      </div>
      <div v-if="store.state.lignes.length > 0">
        <tableau-dossier :entete="store.getters.getHead" :donnees="store.getters.getLignes"></tableau-dossier>
      </div>
      <div>
        <h4>Statistiques :</h4>
        <p>
          Nombre de dossier : {{ nbDossiers }}</br>
          Présent depuis : {{ datePresence }}</br>
          Dossier le plus récent : {{ dateRecent}}</br>
          Durée de présence : {{ duree }}
        </p>
      </div>
    </div>
    <div v-else>
      <h2>Envie d'une pause Café ? </h2>
      <button type="button" v-on:click="cafe">
        <img src="asset/tasse_cafe.jpg">
      </button>
    </div>
  </div>
</template>

<script>
import agent from './composants/cafe.vue'
import agent from './composants/tableau-dossier.vue'

export default {
    components: {
      cafe,
      tableau-dossier
  	},
    data: () {
      return {
        nom: '',
        cacher: true,
        texte: `J'attend le nom de l'agent`,
        actifCheck: false,
        recentCheck: false
      }
    },
    watch: {
      nom: function(newText, oldText) {
        if(this.nom == '')
          this.texte = `J'attend le nom de l'agent`
        else
        {
          this.texte = "le nom de votre agent est : " + this.nom
          this.getData();
        }
      }
    },
    computed: {
      nbDossiers: function(){ // retourne le nombre de dossier de l'agent
        return store.state.lignes.length
      },
      datePresence: function(){ //return la date du plus vieux dossier de l'agent
        let dateMin = new Date()

        for (let i = 0; i < store.state.lignes.length; i++) {
          let dateCourante = store.state.lignes[i].date
          dateCourante = dateCourante.split("/")
          dateCourante = new Date(dateCourante[2], dateCourante[1], dateCourante[0]) // préparation de la date pour faire la comparaison

          if (dateCourante.getTime() < dateMin.getTime()) {
            dateMin = dateCourante // si la date est plus petite que la dateMin que l'on a déjà on remplace la dateMin
          }
        }
        //reconversion de la date pour avoir un affichage plus lisible
        dateMin = dateMin.toISOString().split("T")
        dateMin = dateMin[0].split("-")
        return dateMin[2]+"/"+dateMin[1]+"/"+dateMin[0]
      },
      dateRecent: function() { // retourne le dossier le plus récent
        let dateMax = store.state.lignes[store.state.lignes.length-1].date
        dateMax = dateMax.split("/")
        dateMax = new Date(dateMax[2], dateMax[1], dateMax[0]) // initialisation de la date qui servira de comparaison

        for (let i = store.state.lignes.length-1; i > 0; i--) {
          let dateCourante = store.state.lignes[i].date
          dateCourante = dateCourante.split("/")
          dateCourante = new Date(dateCourante[2], dateCourante[1], dateCourante[0]) // préparation de la date pour faire la comparaison

          if (dateCourante.getTime() > dateMax.getTime()) {
            dateMax = dateCourante // si la date est plus grande que la dateMax que l'on a déjà on remplace la dateMax
          }
        }
        //reconversion de la date pour avoir un affichage plus lisible
        dateMax = dateMax.toISOString().split("T")
        dateMax = dateMax[0].split("-")
        return dateMax[2]+"/"+dateMax[1]+"/"+dateMax[0]
      },
      duree: function() { // retourne la différence entre la date du dosser le plsu récent et le dossier le plus vieux
        let max = this.dateRecent.split("/") // récupération de la date max
        let min = this.datePresence.split("/") // récupération de la date min

        max = new Date(max[2], max[1], max[0])
        min = new Date(min[2], min[1], min[0])

        let duree = Math.floor((max.getTime() - min.getTime()) / 1000) // recupération de la durée
        let jours = Math.floor(duree/86400)
        let mois = Math.floor(jours/31)
        jours = jours - (mois*31)
        let an = Math.floor(mois/12)
        mois = mois - (an*12)

        return an + " an(s) " + mois + " mois " + jours + " jour(s)"
      }
    },
    methods: {
      $_agent_viderTableau(){ // cache le haut du tableau et demande au store de se netoyer
        store.commit("viderTableau")
        if (document.getElementById('head'))
          document.getElementById('head').classList.add("cacher")
      },
      getData: _.debounce(
        function()
        {
          if(this.nom != "") // pour éviter de faire des requête si le nom de l'agent n'est pas renseigné
          {
            let vue = this
            axios.get("https://api.github.com/users/"+this.nom+"/repos") // la requête récupérera les dossiers de l'agent dont le nom est dans stocké dans la vue
            .then((response) =>
            {
              this.$_agent_viderTableau()
              vue.cacher = false // on affiche le tableau de résultats

              for(let i = 0; i < response.data.length; i ++ )
              {
                vue.$_agent_addLigne( // on ajoute les infos récupérées sur l'agent ennemis dans notre magasin
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
      $_agent_addLigne(newid, newname, created_at, updated_at, description, clone_url){ // demande au magasin d'ajouter une ligne
        let ligne = { // préparation de la ligne à ajouter
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

        let date = new Date();

        for (let i = 1; i < store.state.lignes.length; i++) {
          let temp = this.store.state.lignes[i].date.split("/")

          let mois = parseInt(temp[1]) // récupère le mois de création du dossier

          let an = parseInt(temp[2]) // récupère l'année de création du dossier
          let ligne = document.getElementById(i) // récupère la ligne en cour de traitement

          let anTest = parseInt(date.getFullYear)

          let moisTest
          if (date.getMonth()-3 < 0) {
            moisTest = 12 - date.getMonth()-3
            anTest --
          }
          else {
            moisTest = date.getMonth()-3
          }

          if (this.recentCheck) { // permet le reset de l'affichage
            ligne.classList.add("cacher") // cache la ligne
            if ((mois >= moisTest && an == anTest) || (mois <= moisTest && an > anTest)) // si le dossier est récent
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

        let vue = this
        let date = new Date();

        let an = date.getFullYear() // on récupère l'année

        let mois
        if(date.getMonth() < 10) // formate le mois au format mm (donc de 01 à 12)
          mois = "0"+date.getMonth()
        else
          mois = date.getMonth()

        let jour
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

        for (let i = 1; i < store.state.lignes.length; i++) {
          let ligne = document.getElementById(i) // récupère la ligne en cour de traitement
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
        this.$_agent_viderTableau()
        this.cacher = true
      },
      cafe: function(){
        javascript:window.open('./cafe.html');
      }
    }
}
</script>

<style type="text/css">
  .cacher{
    display: none;
  }
</style>
