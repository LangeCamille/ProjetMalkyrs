// Vue.component('ligne', {
//   props: ['id','name','created_at','description','clone_url'],
  // template: '<tr><td>{{ id }}</td><td>{{ name }}</td><td>{{ created_at }}</td><td>{{ description }}</td><td>{{ clone_url }}</td></tr>'
// })
const store = new Vuex.Store({
  state: {
    lignes: [
      null
    ],
    head:[
     "Id",
     "Nom",
     "Créé le",
     "Description",
     "Clone URL"
   ]
  },
  mutations: {
    addLigne(state, ligne)
    {
      state.lignes[state.lignes.length] = {
        id: ligne.id,
        name: ligne.name,
        date: ligne.date,
        desc: ligne.desc,
        url: ligne.url
      }
    },
    viderTableau(state)
    {
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
    ancienNom: '',
    texte: 'J\'attend le nom de l\'agent'
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
    viderTableau(){
      store.commit("viderTableau")
    },
    getData: _.debounce(
      function()
      {
        if(this.nom != "")
        {
          var vue = this
          axios.get("https://api.github.com/users/"+this.nom+"/repos")
          .then((response) =>
          {
            vue.cacher = false

            for(var i = 0; i < response.data.length; i ++ )
            {
              vue.addLigne(
                            response.data[i].id,
                            response.data[i].name,
                            response.data[i].created_at,
                            response.data[i].description,
                            response.data[i].clone_url)
              // '<ligne id="' +response.data[i].id+ '" name="' +response.data[i].name+ '" created_at="' +response.data[i].created_at+ '" description="' +response.data[i].description+ '" clone_url="' +response.data[i].clone_url+ '"></ligne>'
            }
          })
          .catch(function () {
            console.log("Erreur ! Impossible d'accéder à l'API.")
            vue.cacher = true
          })
        }
        else
        {
          this.viderTableau()
          this.cacher = true
        }
      },
      500
    ),
    addLigne(newid, newname, created_at, description, clone_url){
      var ligne = {
        id: newid,
        name: newname,
        date: created_at,
        desc: description,
        url: clone_url
      }
      store.commit('addLigne',ligne)
    },
  }
})
