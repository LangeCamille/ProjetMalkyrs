var app1 = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    echange: function(){
      var tab = this.message.split(' ')
      return tab[1] + " " + tab[0]
    }
  }
})
var test = new Vue({
  el: '#test',
  data: {
    message: 'test',
    hide: true,
    color: 'red'
  },
  methods: {
    coloriage: function(){
      return "color:"+this.color+";"
    }
  }
})
