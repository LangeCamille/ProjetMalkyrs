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
  getters: {
    getHead(){
      return store.state.head
    },
    getLignes(){
      if(store.state.lignes){
        return store.state.lignes
      }
      else {
        return null
      }
    }
  },
  mutations: {
    addLigne(state, ligne) { // rajoute une ligne au tableau
      let newDate = ligne.date.split("T")
      newDate = newDate[0].split("-")

      let newMaJ = ligne.mAj.split("T")
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
