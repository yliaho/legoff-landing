<template>
  <div class="panel-title font--stylized" 
       :class="!loading ? 'visible' : 'hidden'"
       @mousemove="ready ? mouseOver = true : null"
       @mouseleave="ready ? mouseOver = false : null">
    <div class="text" 
         :class="mouseOver ? 'from-enter' : (mouseOver === false ? 'from-leave' : null)">
      <span>{{title}}</span>
      <span class="underline"></span>
    </div>
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
      mouseOver: null // I know, but safari is being a dick about the animation
    }
  },
  computed: {
    ...mapState([
      'loading',
      'ready'
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

    .text {
      position: relative;
      padding-bottom: 5px;
      overflow: hidden;
      font-size: 15px;
      
      .underline {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }

      .underline:after,
      .underline:before {
        content: "";
        color: rgba(255,255,255,.5);
        position: absolute;
        top: 0;
        bottom: 2px;
        width: 100%;
        animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
      }

      &.from-enter .underline:after {
        transform: translate3d(105%,0,0);
        animation: spanEnter .3s forwards;
        box-shadow: inset 0 -1px;
      }

      &.from-leave .underline:after {
        transform: translate3d(0%,0,0);
        animation: spanLeave .3s forwards;
        animation-delay: .15s;
        box-shadow: inset 0 -1px;
      }
    }

    &.visible {
      opacity: 1;
      // animation: panelFadein .9s cubic-bezier(0.62, 0, 0, 1) .7s forwards;
    }
  }

  @keyframes spanEnter {
    from {
      transform: translate3d(105%,0,0)
    }
    to {
      transform: translate3d(0%,0,0)
    }
  }

  @keyframes spanLeave {
    from {
      transform: translate3d(0%,0,0)
    }
    to {
      transform: translate3d(-105%,0,0)
    }
  }
</style>
