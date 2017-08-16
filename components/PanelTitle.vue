<template>
  <div class="panel-title font--stylized" 
       :class="!loading ? 'visible' : 'hidden'"
       @mousemove="mouseOver = true"
       @mouseleave="mouseOver = false">
    <span :class="mouseOver ? 'active' : null">
      {{title}}
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: [
    'isActive',
    'title'
  ],
  data () {
    return {
      mouseOver: false
    }
  },
  computed: {
    ...mapState([
      'loading'
    ])
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  .panel-title {
    position: absolute;
    top: 0;
    bottom: 10px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    overflow: hidden;
    transition: all .6s ease-out;
    color: white;
    opacity: 0;
    transform-origin: 50% 50%;

    span {
      position: relative;
      padding-bottom: 3px;
      
      &:after {
        content: "";
        color: rgba(255,255,255,.5);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 0;
        box-shadow: 0 1px;
        transition: .25s cubic-bezier(0.455, 0.03, 0.515, 0.955);
      }

      &.active:after {
        width: 100%;
      }
    }

    &.visible {
      opacity: 1;
      // animation: panelFadein .9s cubic-bezier(0.62, 0, 0, 1) .7s forwards;
    }
  }
</style>
