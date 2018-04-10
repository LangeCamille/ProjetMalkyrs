import lignes from "./modules/lignes.js"
import header from "./modules/header.js"
import mutation from "mutations.js"

export default new Vuex.Store({
  modules: {
    lignes
  }
  mutations: {
    mutations
  }
})
