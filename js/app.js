var agent = new Vue({
  el: '#agent',
  data: {
    nom: '',
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
    getData: function(){
      axios.get("https://api.github.com/users/"+this.nom).then((response) => {
        console.log(response.data.id)
      })
    }
  }
})
