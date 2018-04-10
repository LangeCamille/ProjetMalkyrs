<script>
import agent from './composants/TheAgent.vue';

export default {
  name: 'TheApp',
	components: { TheAgent }
};
</script>

<template>
  <div id="app">
    <h1 id="titre">Identification des agents ennemis</h1>
    <TheAgent/>
  </div>
</template>

<style>
  h1{
    text-align: center;
  }
</style>
