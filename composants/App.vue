<template>
  <div id="app">
    <h1 id="titre">Identification des agents ennemis</h1>
    <div="agent"></div>
  </div>
</template>

<script>
import agent from './composants/agent.vue'

export default {
	components: {
    agent
	}
}
</script>

<style>
  h1{
    text-align: center;
  }
</style>
