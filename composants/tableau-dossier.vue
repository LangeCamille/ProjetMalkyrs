²<template>
  <table>
    <tr is="tableau-header"
        :values="entete"
    ></tr>
    <tr is="tableau-ligne"
        v-for="(ligne, i) in donnees"
        v-bind:datas="ligne"
        v-bind:index="i"
        v-bind:key="ligne.id"
    ></tr>
  </table>
</template>

<script>
import agent from './composants/tableau-header.vue'
import agent from './composants/tableau-ligne.vue'

export default {
  props: {
    entete: {
      type: Array,
      required: true
    },
    donnees: {
      type: Array,
      required: true
    }
  }
}
</script>
