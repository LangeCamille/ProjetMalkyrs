// Vue.component('ligne', {
//   props: ['id','name','created_at','description','clone_url'],
  // template: '<tr><td>{{ id }}</td><td>{{ name }}</td><td>{{ created_at }}</td><td>{{ description }}</td><td>{{ clone_url }}</td></tr>'
// })
// const dataLigne = new Vuex.store({
  // state: {
    // id: null,
    // name: null,
    // date: null,
    // desc: null,
    // url: null
  // },
  // mutations: {
    // setId(newID){
      // sate.id = newID
    // },
    // setName(newName){
      // state.name = newName
    // },
    // setDate(newDate){
      // state.date = newDate
    // },
    // setDesc(newDesc){
      // state.desc = newDesc
    // },
    // setURL(newUrl){
      // state.url = newUrl
    // }
  // }
// })

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
      function()
      {
        var tableau = document.getElementById('tableau')

        if(this.nom != "")
        {
          axios.get("https://api.github.com/users/"+this.nom+"/repos")
          .then((response) =>
          {
            if (tableau.style.display == "" || tableau.style.display == "none")
              tableau.style.display = "inline-block"

            for(var i = 0; i < response.data.length; i ++ )
            {
              this.addLigne(i,
                            response.data[i].id,
                            response.data[i].name,
                            response.data[i].created_at,
                            response.data[i].description,
                            response.data[i].clone_url)
              // '<ligne id="' +response.data[i].id+ '" name="' +response.data[i].name+ '" created_at="' +response.data[i].created_at+ '" description="' +response.data[i].description+ '" clone_url="' +response.data[i].clone_url+ '"></ligne>'
            }
          })
        }
        else
        {
          document.getElementById('corps').innerHTML = ""
          tableau.style.display = "none"
        }
      },
      500
    ),
    addLigne(i, id, name, created_at, description, clone_url){
      document.getElementById('corps').innerHTML += '' +
      '<tr class=" color' + i%2 + '">' +
        '<td>' + id          + '</td>' +
        '<td>' + name        + '</td>' +
        '<td>' + created_at  + '</td>' +
        '<td>' + description + '</td>' +
        '<td>' + clone_url   + '</td>' +
      '</tr>'
    }
  }
})
