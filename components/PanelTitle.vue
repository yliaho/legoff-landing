<template>
  <div class="panel-title font--stylized" 
       :class="[getTransitionPhase >= 3 ? 'visible' : 'hidden', titlePositionClass]"
       @mousemove="getTransitionPhase >= 3 ? mouseOver = true : null"
       @mouseleave="getTransitionPhase >= 3 ? mouseOver = false : null">
    <div class="text" 
         :style="`font-size: ${fontSize}px`"
         :class="mouseOver 
                 ? 'from-enter' 
                 : (mouseOver === false ? 'from-leave' : null)">
      <span>{{title}}{{(fontSize > normalSize ? '→' : null)}}</span>
      <span :class="windowWidth !== 'sm' ? 'underline' : null"></span>
    </div>
    <transition name="fade">
      <span v-if="!clickable && isActive" class="unclickable">coming soon</span>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  props: [
    'isActive',
    'fontSize',
    'side',
    'title',
    'clickable'
  ],
  data () {
    return {
      // need to be null, thank safari
      mouseOver: null,
      normalSize: 15
    }
  },
  computed: {
    ...mapState([
      'loading',
      'ready',
      'contentReady'
    ]),
    ...mapGetters([
      'windowWidth',
      'getTransitionPhase'
    ]),
    titlePositionClass () {
      return (this.windowWidth === ('sm' || 'xs'))
        ? `mobile-${this.side}`
        : null
    }
  },
  mounted () {
    console.log(this.clickable)
  }
}
</script>

<style lang="scss" scoped>
  .panel-title {
    position: absolute;
    top: 0;
    bottom: 6px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    z-index: 3;
    overflow: hidden;
    color: white;
    opacity: .3;
    align-items: center;
    transform-origin: 50% 50%;

    &.mobile-left {
      bottom: calc(50% + 30px);
      align-items: flex-end;
    }
    &.mobile-right {
      top: calc(50% + 40px);
      bottom: 0;
      align-items: flex-start;
    }

    .text {
      position: relative;
      padding-bottom: 5px;
      overflow: hidden;
      
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
        animation: spanLeave .2s forwards;
        animation-delay: .15s;
        box-shadow: inset 0 -1px;
      }
    }

    .unclickable {
      display: block;
      position: absolute;
      margin-top: 2rem;
      font-family: 'Akkurat Mono', sans-serif;
      color: rgba(white, .5);
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

  .fade-enter-active, .fade-leave-active {
    transition: all .5s cubic-bezier(0.19, 1, 0.22, 1) .25s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(-2px);
    opacity: 0;
  }
</style>
