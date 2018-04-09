<template>
  <tr>
    <th v-for="value in values">{{ value }}</th>
  </tr>
</template>

<script>
export default {
  props: {
    values: {
      type: Array,
      required: true
    }
  }
}
</script>
