<template>
  <div id="game-scene" :class="['scene',show ? 'in' : 'out']">
    <a href="javascript:void(0);" id="scene-btn" class="button" @click="showGameOverScene()"></a>
    <div class="card player a" :class="[{'flipped': cardAFlipped},{'selected':cardASelected },cardAOut? 'out':'in']" @click = 'cardAClick()'>
      <div class="front face"></div>
      <div class="back face"></div>

    </div>
    <div class="card player b" :class="[{'flipped': cardBFlipped},{'selected':cardBSelected },cardBOut? 'out':'in']" @click = 'cardBClick()'>
      <div class="front face"></div>
      <div class="back face"></div>
    </div>
    <div class="card player c" :class="[{'flipped': cardCFlipped},{'selected':cardCSelected },cardCOut? 'out':'in']" @click = 'cardCClick()'>
      <div class="front face"></div>
      <div class="back face"></div>
    </div>
    <div class="card opponent" :class="cardOpponentOut ? 'out' : 'in'">
      <div class="front face"></div>
      <div class="back face"></div>
    </div>
  </div>
</template>
<script>
import constant from './constant'
export default {
  data () {
    return {
      show: false,
      userWon: true,
      cardAFlipped: false,
      cardBFlipped: false,
      cardCFlipped: false,
      cardAOut: true,
      cardBOut: true,
      cardCOut: true,
      cardASelected: false,
      cardBSelected: false,
      cardCSelected: false,
      selectedCardPower: 0,
      opponentCardPower: 100,
      cardOpponentOut: true
    }
  },
  mounted () {
    constant.Event.$on(constant.MSG_START_SCENE,
      function () {
        this.show = true
        setTimeout(this.cardFlipped, 500)
      }.bind(this)
    )
  },
  methods: {
    showGameOverScene () {
      constant.Event.$emit(constant.MSG_OVER_GAME_SCENE, this.userWon)
    },
    cardFlipped () {
      this.cardAFlipped = true
      this.cardBFlipped = true
      this.cardCFlipped = true
      this.cardAOut = false
      this.cardBOut = false
      this.cardCOut = false
    },
    cardAClick () {
      this.cardASelected = true
      this.cardAFlipped = false
      this.cardBOut = true
      this.cardCOut = true
      this.cardOpponentOut = false
    },
    cardBClick () {
      this.cardBSelected = true
      this.cardBFlipped = false
      this.cardAOut = true
      this.cardCOut = true
      this.cardOpponentOut = false
    },
    cardCClick () {
      this.cardCSelected = true
      this.cardCFlipped = false
      this.cardBOut = true
      this.cardAOut = true
      this.cardOpponentOut = false
    }
  }
}
</script>
<style lang="stylus" scoped>
  .scene.out {
    transform: translate3d(100%, 0, 0);
  }
  .scene.in {
    transform: translate3d(0, 0, 0)
  }
  #game-scene {
    background url('../../static/images/battle-bg.png') no-repeat
  }
  .card {
    position absolute
    width 140px
    height 180px
    perspective 700px
    transition all .5s ease-out
    bottom 0
  }
    .a
      left 15px
    .b
      left 170px
    .c
      left 325px
  .card > .face {
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    border-radius 4px
    backface-visibility hidden
    transition all .5s ease-out
  }
  .card > .face.front {
    background #81d1e9 url(../../static/images/front-face.png)
    transform: rotate3d(0, 1, 0, 0deg)
  }
  .card > .face.back {
    background #4474b5 url(../../static/images/back-face-pattern.png)
    transform: rotate3d(0, 1, 0, 180deg);
    border 3px solid white
  }
  .card.flipped > .face.front {
    transform rotate3d(0, 1, 0, -180deg)
  }
  .card.flipped > .face.back {
    transform rotate3d(0, 1, 0, 0deg)
  }
  .card.player.out {
    transform translate3d(0, 180%, 0)
  }
  .card.player.in {
    transform translate3d(0, 0, 0)
  }
  .card.player.flipped {
    cursor pointer
  }
  .card.player.in.flipped:hover {
    transform translate3d(0, -10px, 0)
  }
  .card.selected {
    bottom: 150px
    left: 300px
  }
  .card.power{
    position absolute
    width:100%
    text-align center
    font-size 2em
    bottom 30px
  }
  .card.opponent{
    bottom 150px
  }
  .card.opponent.out{
    left -200px
  }
  .card.opponent.in{
    transition-delay .8s
    left 40px
  }
</style>
