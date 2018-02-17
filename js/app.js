Vue.component('ligne', {
  props: ['id','name','created_at','description','clone_url'],
  template: '<tr><td>{{ id }}</td><td>{{ name }}</td><td>{{ created_at }}</td><td>{{ description }}</td><td>{{ clone_url }}</td></tr>'
})

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
    getData: _.debounce(
      function(){
        axios.get("https://api.github.com/users/"+this.nom+"/repos")
          .then((response) => {

            var tableau = document.getElementById('tableau')

            if (tableau.style.display == "")
                tableau.style.display = "inline-block"

            for(var i = 0; i < response.data.length; i ++ )
            {
              document.getElementById('corps').innerHTML += '' +
              '<tr class=" color' + i%2 + '">' +
                '<td>' + response.data[i].id          + '</td>' +
                '<td>' + response.data[i].name        + '</td>' +
                '<td>' + response.data[i].created_at  + '</td>' +
                '<td>' + response.data[i].description + '</td>' +
                '<td>' + response.data[i].clone_url   + '</td>' +
              '</tr>'
              // '<ligne id="' +response.data[i].id+ '" name="' +response.data[i].name+ '" created_at="' +response.data[i].created_at+ '" description="' +response.data[i].description+ '" clone_url="' +response.data[i].clone_url+ '"></ligne>'
            }
          })
      },
      500
    )
  }
})
