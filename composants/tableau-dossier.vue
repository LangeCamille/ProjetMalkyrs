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
import tableau-header from './composants/tableau-header.vue'
import tableau-ligne from './composants/tableau-ligne.vue'

export default {
  components: {
    tableau-header,
    tableau-ligne
  },
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

<style>
  table{
    border-collapse: collapse;
    border: 1px solid black;
  }

  tr, td, th{
    border: 1px solid black;
  }
</style>
