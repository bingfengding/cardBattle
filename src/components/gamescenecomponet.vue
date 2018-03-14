<template>
  <div id="game-scene" :class="['scene',show ? 'in' : 'out']">
    <a href="javascript:void(0);" id="scene-btn" class="button" @click="showGameOverScene()"></a>
    <div class="hp-background">
      <div class="hp opponent" :style="{'width':opponentHPWidth}"></div>
      <div class="hp player" :style="{'width':playerHPWidth}"></div>
    </div>
    <div class="battle-indicator"></div>
    <div class="card player a" :class="[{'flipped': cardAFlipped},{'selected':cardASelected },{'shake' :cardAShake},cardAOut? 'out':'in']" @click = 'cardAClick()'>
      <div class="front face">
        <div class="power">
          {{ selectedCardPower }}
        </div>
      </div>
      <div class="back face"></div>
    </div>
    <div class="card player b" :class="[{'flipped': cardBFlipped},{'selected':cardBSelected },{'shake' :cardBShake},cardBOut? 'out':'in']" @click = 'cardBClick()'>
      <div class="front face">
        <div class="power">
          {{ selectedCardPower }}
        </div>
      </div>
      <div class="back face"></div>
    </div>
    <div class="card player c" :class="[{'flipped': cardCFlipped},{'selected':cardCSelected },{'shake' :cardCShake},cardCOut? 'out':'in']" @click = 'cardCClick()'>
      <div class="front face">
        <div class="power">
          {{ selectedCardPower }}
        </div>
      </div>
      <div class="back face"></div>
    </div>
    <div class="card opponent" :class="[cardOpponentOut ? 'out' : 'in',opponentCardShake ? 'shake':'']">
      <div class="front face">
        <div class="power">
          {{ opponentCardPower }}
        </div>
      </div>
      <div class="back face"></div>
    </div>
    <div class="blaze toward-left" :class="{'attack':blazeAttackLeft}"></div>
    <div class="blaze toward-right" :class="{'attack':blazeAttackRight}"></div>
  </div>
</template>
<script>
import $ from 'jquery'
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
      opponentCardPower: 0,
      cardOpponentOut: true,
      opponentCardObject: null,
      blazeTowardLeftObject: null,
      blazeTowardRightObject: null,
      opponentCardShake: false,
      blazeAttackLeft: false,
      blazeAttackRight: false,
      cardAShake: false,
      cardBShake: false,
      cardCShake: false,
      transitionState: '',
      playerHP: 100,
      opponentHP: 100,
      opponentHPWidth: '200px',
      playerHPWidth: '200px',
      selectedCardObject: null,
      resultClick: false
    }
  },
  mounted () {
    constant.Event.$on(constant.MSG_START_SCENE,
      function () {
        this.show = true
        setTimeout(this.cardFlipped, 500)
      }.bind(this)
    )
    this.opponentCardObject = $('.card.opponent')
    this.blazeTowardLeftObject = $('.blaze.toward-left')
    this.blazeTowardRightObject = $('.blaze.toward-right')
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
      if (!this.resultClick) {
        this.cardASelected = true
        this.cardAFlipped = false
        this.cardBOut = true
        this.cardCOut = true
        this.cardOpponentOut = false
        this.beginBattleAnimation()
      }
      this.resultClick = true
    },
    cardBClick () {
      if (!this.resultClick) {
        this.cardBSelected = true
        this.cardBFlipped = false
        this.cardAOut = true
        this.cardCOut = true
        this.cardOpponentOut = false
        this.beginBattleAnimation()
      }
      this.resultClick = true
    },
    cardCClick () {
      if (!this.resultClick) {
        this.cardCSelected = true
        this.cardCFlipped = false
        this.cardBOut = true
        this.cardAOut = true
        this.cardOpponentOut = false
        this.beginBattleAnimation()
      }
      this.resultClick = true
    },
    randomizePower () {
      this.selectedCardPower = Math.round(Math.random() * 80) + 20
      this.opponentCardPower = Math.round(Math.random() * 80) + 20
    },
    beginBattleAnimation () {
      this.randomizePower()
      this.handleTransitionEnd(this.opponentCardObject)
      this.transitionState = constant.OPPONENT_CARD_TRANSITION_END
      this.cardOpponentOut = false
    },
    handleTransitionEnd (htmlObj) {
      let listener = function (e) {
        //  $(e.target).off('webkitTransitionEnd', listener)
        this.handleTransitionEvent(e)
      }.bind(this)
      htmlObj.one('webkitTransitionEnd', listener)
    },
    handleAnimationEnd (htmlObj) {
      let listener = function (e) {
        //  $(e.target).off('webkitAnimationEnd', listener)
        this.handleTransitionEvent(e)
      }.bind(this)
      htmlObj.one('webkitAnimationEnd', listener)
    },
    handleTransitionEvent (e) {
      switch (this.transitionState) {
        case constant.OPPONENT_CARD_TRANSITION_END:
          if (this.cardOpponentOut === false) {
            this.transitionState = constant.BLAZE_TOWARD_LEFT_ANIMATION_END
            this.blazeAttackLeft = true
            this.handleAnimationEnd(this.blazeTowardLeftObject)
          }
          break
        case constant.BLAZE_TOWARD_LEFT_ANIMATION_END:
          this.handleAnimationEnd(this.opponentCardObject)
          this.opponentCardShake = true
          this.transitionState = constant.OPPONENT_CARD_ANIMATION_END
          break
        case constant.OPPONENT_CARD_ANIMATION_END:
          this.handleAnimationEnd(this.blazeTowardRightObject)
          this.blazeAttackRight = true
          this.transitionState = constant.BLAZE_TOWARD_RIGHT_ANIMATION_END
          break
        case constant.BLAZE_TOWARD_RIGHT_ANIMATION_END:
          let selectedCard = ''
          if (this.cardASelected) {
            //  console.log('card A shake')
            this.cardAShake = true
            selectedCard = '.card.player.a'
          } else if (this.cardBSelected) {
            //  console.log('card B shake')
            this.cardBShake = true
            selectedCard = '.card.player.b'
          } else if (this.cardCSelected) {
            //  console.log('card C shake')
            this.cardCShake = true
            selectedCard = '.card.player.c'
          }
          //  console.log(this.selectedCardPower, this.opponentCardPower)
          this.hurtOpponent(this.selectedCardPower, this.opponentCardPower)
          this.hurtPlayer(this.opponentCardPower, this.selectedCardPower)
          this.selectedCardObject = $(selectedCard)
          this.transitionState = constant.SELECTED_CARD_SHAKE_END
          this.handleAnimationEnd(this.selectedCardObject)
          break
        case constant.SELECTED_CARD_SHAKE_END:
          if (this.isSomeOneDead()) {
            if (this.isPlayerDead()) {
              this.userWon = false
            } else {
              this.userWon = true
            }
            this.showGameOverScene()
          } else {
            this.restartGame()
          }
          break
      }
    },
    isSomeOneDead () {
      return (this.playerHP <= 0 || this.opponentHP <= 0)
    },
    isPlayerDead () {
      if (this.playerHP <= 0) {
        return true
      }
      return false
    },
    hurtPlayer (attackPower, defensePower) {
      let diff = attackPower - defensePower
      if (diff > 0) {
        this.playerHP = Math.max(this.playerHP - diff, 0)
        this.playerHPWidth = this.playerHP / 100 * 200 + 'px'
      }
      //  console.log('player width:' + this.playerHPWidth)
    },
    hurtOpponent (attackPower, defensePower) {
      var diff = attackPower - defensePower
      if (diff > 0) {
        this.opponentHP = Math.max(this.opponentHP - diff, 0)
        this.opponentHPWidth = this.opponentHP / 100 * 200 + 'px'
      }
      //  console.log('opponent width' + this.opponentHPWidth)
    },
    restartGame () {
      this.cardASelected = false
      this.cardBSelected = false
      this.cardCSelected = false
      this.cardOpponentOut = true
      this.transitionState = constant.OPPONENT_CARD_TRANSITION_END
      this.blazeAttackLeft = false
      this.opponentCardShake = false
      this.blazeAttackRight = false
      this.cardAShake = false
      this.cardBShake = false
      this.cardCShake = false
      this.resultClick = false
      this.cardFlipped()
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
    bottom 100px
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
    bottom: 225px
    left: 300px
  }
  .card .power{
    position absolute
    width:100%
    font-size 72px
    text-align center
    line-height 180px
  }
  .card.opponent{
    bottom 225px
  }
  .card.opponent.out{
    left -200px
  }
  .card.opponent.in{
    transition-delay .8s
    left 40px
  }
  @keyframes shake {
    0%    {transform: translate3d(0,0,0);}
    20%   {transform: translate3d(-5%,0,0);}
    40%   {transform: translate3d(5%,0,0);}
    60%   {transform: translate3d(-5%,0,0);}
    80%   {transform: translate3d(5%,0,0);}
    100%  {transform: translate3d(0,0,0);}
  }
  .card.shake{
    animation shake 300ms ease-out
  }
  .blaze{
    position absolute
    bottom 300px
    width: 50px
    height: 50px
    opacity 0
    animation-timing-function ease-out
    animation-duration 1000ms
  }
  .blaze.toward-left {
    background-image url(../../static/images/blaze-left.png)
  }
  .blaze.toward-right {
    background-image url(../../static/images/blaze-right.png)
  }
  @keyframes blaze-toward-left {
    0%
    20%  {opacity: 1;transform: translate3d(325px,0,0)}
    80%  {transform: translate3d(100px,0,0)}
    100% {opacity: 0; transform: translate3d(100px,0,0)}
  }
  @keyframes blaze-toward-right {
    0%
    20%  {opacity: 1; transform: translate3d(100px,0,0)}
    80%  {transform: translate3d(325px,0,0)}
    100% {opacity: 0; transform: translate3d(325px,0,0)}
  }
  .blaze.toward-left.attack {
    animation-name blaze-toward-left
  }
  .blaze.toward-right.attack {
    animation-name blaze-toward-right
  }
  .battle-indicator {
    position absolute
    width 80px
    height 80px
    top 0
    left 200px
    background url(../../static/images/battle.png)
  }
  .hp-background {
    border-bottom 1px solid #333
    background-color #ababab
    height 30px
  }
    .hp {
      position absolute
      width 200px
      height 30px
      transition all .3s ease-out
    }
    .hp.opponent {
      background url(../../static/images/blue-hp.png) repeat
      left 0
    }
    .hp.player {
      background url(../../static/images/red-hp.png) repeat
      right 0
    }
</style>
