<template>
  <div id="start-scene" class="scene">
    <a href="#"
      id="start-btn"
      class="button"
      @click="startBtnClick()"
    ></a>
  </div>
</template>
<script>
import constant from './constant.vue'
export default {
  data () {
    return {

    }
  },
  methods: {
    startBtnClick () {
      constant.Event.$emit(constant.MSG_START_SCENE)
    }
  }
}
</script>
<style lang="stylus" scoped>
  #start-scene
    background url("../../static/images/start-scene-bg.png") no-repeat
    .button
      position absolute
      width:100%
      height 100%
      top 0
      left 0
</style>
