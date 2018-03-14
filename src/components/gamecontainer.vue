<template>
<div>
  <div class="mask"></div>
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
  <div class="right">
    <details class="how-to-play">
      <summary>玩法介绍</summary>
      <p>选择一张牌，然后观看点数的PK结果!</p>
    </details>
    <footer>
      <p>赞赏支持</p>
      <img id="payme" src="../../static/payme.png">
    </footer>
  </div>
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
    margin 10px auto
    text-align center
    border-radius: 8px
    overflow: hidden
    position relative
  .row
    width 480px
    margin 20px auto
    text-align center
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
  footer
    margin 20px auto
    width 480px
    text-align: center;
    p
      width 120px
      height 40px
      line-height 40px
      font-size 18px
      color white
      background-color rgb(236,97,73)
      margin 10px auto
      border-radius 20px
      cursor pointer
  .how-to-play
    margin 20px auto
    width 480px
    text-align: center;
    summary
      font-size 20px
      outline none
      cursor pointer
  .mask
    width 100%
    height 1100px
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0,0,0,0.3)
    z-index -1
</style>
