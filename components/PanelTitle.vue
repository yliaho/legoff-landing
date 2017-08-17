<template>
  <div class="panel-title font--stylized" 
       :class="!loading ? 'visible' : 'hidden'"
       @mousemove="ready ? mouseOver = true : null"
       @mouseleave="ready ? mouseOver = false : null">
    <span :class="mouseOver ? 'from-enter' : 'from-leave'">
      {{title}}
    </span>
    <span class="underline" :class="mouseOver ? 'from-enter' : 'from-leave'">
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
      'loading',
      'ready'
    ])
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
      padding-bottom: 5px;
      overflow: hidden;
      font-size: 15px;
    }

    &.visible {
      opacity: 1;
      // animation: panelFadein .9s cubic-bezier(0.62, 0, 0, 1) .7s forwards;
    }
  }

  .underline {
    color: transparent;
    position: absolute!important;
  }

  .underline:before,
  .underline:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }

  .underline.from-enter:after {
    box-shadow: inset 0 -1px rgba(255,255,255,.5);
    width: 100%;
    transform: translate3d(105%,0,0);
    animation: spanEnter .3s forwards;
  }

  .underline.from-leave:after {
    box-shadow: inset 0 -1px rgba(255,255,255,.5);
    width: 100%;
    transform: translate3d(0%,0,0);
    animation: spanLeave .3s forwards;
    animation-delay: .15s;
  }

  @keyframes spanEnter {
    from {
      width: 100%;
      transform: translate3d(105%,0,0)
    }
    to {
      width: 100%;
      transform: translate3d(0%,0,0)
    }
  }

  @keyframes spanLeave {
    from {
      width: 100%;
      transform: translate3d(0%,0,0)
    }
    to {
      width: 100%;
      transform: translate3d(-105%,0,0)
    }
  }
</style>
