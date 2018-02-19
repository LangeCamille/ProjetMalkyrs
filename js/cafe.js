const cafe = new Vue({ // ça fait le café : no comments please
  el: "#cafe",
  data: {
    link: "asset/chargement.jpg",
    checked: false
  },
  methods: {
    seul: function(){
      if (!this.checked) {
        this.link = "asset/gif_cafe.gif"
        this.checked = true
      }
      else
      {
        this.link = "asset/chargement.jpg"
        this.checked = false
      }
    },
    groupe: function(){
      if (!this.checked) {
        this.link = "asset/gif_cafe_groupe.gif"
        this.checked = true
      }
      else
      {
        this.link = "asset/chargement.jpg"
        this.checked = false
      }
    }
  }
})
