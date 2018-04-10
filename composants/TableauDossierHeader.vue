<script>
export default {
  name: 'TableauDossierHeader',
  props: {
    values: {
      type: Array,
      required: true
    }
  }
};
</script>

<template>
  <tr>
    <th v-for="value in values">{{ value }}</th>
  </tr>
</template>
