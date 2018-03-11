<template>
  <div id="app">
    <gamecontainer></gamecontainer>
  </div>
</template>

<script>
import gamecontainer from './components/gamecontainer.vue'
export default {
  components: {
    gamecontainer
  },
  name: 'app'
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #app {

  }
</style>
