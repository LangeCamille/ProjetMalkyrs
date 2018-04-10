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
