const state = {
  lignes: [{
    id   = "Id",
    name = "Nom",
    date = "Créé le",
    mAj  = "Mise à jour le",
    desc = "Description",
    url  = "Clone URL"
  }]
}

const getters = {
  getLignes(){
    if(state.lignes[1]){
      return state.lignes
    }
    else {
      return null
    }
  }?
  getHead(){
    return state.lignes[0]
  }
}

const mutations = {
  addNewLigne(newDatas) { // rajoute une ligne au tableau

    let newDate = newDatas.date.split("T")
    newDate = newDate[0].split("-")

    let newMaJ = newDatas.mAj.split("T")
    newMaJ = newMaJ[0].split("-")

    state.lignes[state.lignes.length] = {
      id: ligne.id,
      name: ligne.name,
      date: newDate[2]+"/"+newDate[1]+"/"+newDate[0], //reformatage de la date au format dd/mm/yyyy
      mAj: newMaJ[2]+"/"+newMaJ[1]+"/"+newMaJ[0], //reformatage de la date au format dd/mm/yyyy
      desc: ligne.desc,
      url: ligne.url
    }
  }
}

const actions = {
  addLigne(ligne) { // rajoute une ligne au tableau
    commit('addNewLigne', ligne)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
