<template>
  <tr v-if="index%2 === 0">
    <td v-for="value in datas" class="color0">{{ value }}</td>
  </tr>
  <tr v-else>
    <td v-for="value in datas" class="color1">{{ value }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    datas: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
}
</script>

<style type="text/css">
  .color0{
    background-color: #b3b3cc;
  }

  .color1{
    background-color: #e0e0eb;
  }
</style>
