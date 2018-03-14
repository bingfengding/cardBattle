<template>
  <div id="gameover-scene"
    :class="['scene', show ? 'in' : 'out',isWon ? 'won' : 'loss']"
  >
    <div class="reStart">
      <button @click = "reStart" class="reStartBtn">重新开始游戏</button>
    </div>
  </div>
</template>
<script>
import constant from './constant.vue'
export default {
  data () {
    return {
      show: false,
      isWon: true
    }
  },
  mounted () {
    constant.Event.$on(constant.MSG_OVER_GAME_SCENE,
      function (userWon) {
        this.isWon = userWon
        this.show = true
      }.bind(this)
    )
  },
  methods: {
    reStart () {
      window.location.reload()
    }
  }
}
</script>
<style lang="stylus" scoped>
  #gameover-scene.won{
    background url(../../static/images/you-won.png) no-repeat
  }
  #gameover-scene.loss{
    background url(../../static/images/you-loss.png) no-repeat
  }
  #gameover-scene.out
    transform: translate3d(100%, 0, 0)
  #gameover-scene.in
    transform: translate3d(0, 0, 0)
  .reStart{
    width 200px
    position absolute
    left 140px
    top 200px

  }
    .reStartBtn{
      width 200px
      font-size 24px
      border-radius 8px
      height 40px
      background-color #d1cfda
    }
</style>
