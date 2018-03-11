<template>
<div>
<header>
  <div class="row">
    <h1>Card Battle!</h1>
    <section id="game" class="row">
      <startscene></startscene>
      <gamescene></gamescene>
      <gameoverscene></gameoverscene>
    </section>
  </div>
  </header>
    <section class="how-to-play">
      <h2>玩法介绍</h2>
      <p>选择一张牌，然后观看点数的PK结果</p>
    </section>
    <footer>
      <p>给我个打赏吧！</p>
      <img id="payme" src="../../static/payme.png">
    </footer>
  </div>
</template>
<script>
import startscene from './startscenecomponent'
import gamescene from './gamescenecomponet.vue'
import gameoverscene from './gameoverscenecomponet.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    startscene,
    gamescene,
    gameoverscene
  }
}
</script>
<style lang="stylus" scoped>
  #game
    width: 480px
    height: 600px
    border-radius: 8px
    overflow: hidden
    position relative
  .scene
    width: 100%
    height: 100%
    position: absolute
    overflow: hidden
    border-radius: 8px
    transition: all .3s ease-out
  #payme
    width:240px
    height: 256px

</style>
