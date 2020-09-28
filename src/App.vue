<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld></HelloWorld>
<!--    <zf-tree></zf-tree>-->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// import ZfTree from "./components/tree/tree";

export default {
  name: 'App',
  components: {
    // ZfTree,
    HelloWorld,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
