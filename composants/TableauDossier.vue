<script>
import TableauDossierHeader from './composants/TableauDossierHeader.vue'
import TableauDossierLigne-ligne from './composants/TableauDossierLigne.vue'

export default {
  name: 'TableauDossier',
  components: {
    TableauDossierHeader,
    TableauDossierLigne
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

<template>
  <table>
    <tr is="TableauDossierHeader"
        :values="entete"
    ></tr>
    <tr is="TableauDossierLigne"
        v-for="(ligne, i) in donnees"
        v-bind:datas="ligne"
        v-bind:index="i"
        v-bind:key="ligne.id"
    ></tr>
  </table>
</template>

<style>
  table{
    border-collapse: collapse;
    border: 1px solid black;
  }

  tr, td, th{
    border: 1px solid black;
  }
</style>
