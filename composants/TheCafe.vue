<script>
export default { // ça fait le café : no comments please
    el: "#cafe",
    name: 'TheCafe',
    data: () {
      return {
        link: "asset/chargement.jpg",
        checked: false
      }
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
};
</script>

<template>
  <div id="cafe">
    <p>Combien êtes vous ? (vous ne pourrez pas choisir les 2 options)</p>
    <p>
      <input type="checkbox" v-on:click="seul">Je suis seul </br>
      <input type="checkbox" v-on:click="groupe">Nous sommes en groupe </br>
    </p>
    <div>
      <img v-bind:src="link">
    </div>
  </div>
</template>
