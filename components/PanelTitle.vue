<template>
  <div class="panel-title font--stylized" 
       :class="[getTransitionPhase >= 3 ? 'visible' : 'hidden', titlePositionClass]"
       @mousemove="getTransitionPhase >= 3 ? mouseOver = true : null"
       @mouseleave="getTransitionPhase >= 3 ? mouseOver = false : null"
       @click="unclickableShake">
    <div class="text" 
         :style="`font-size: ${fontSize}px`"
         :class="mouseOver 
                 ? 'from-enter' 
                 : (mouseOver === false ? 'from-leave' : null)">
      <span>{{title}}{{(fontSize > normalSize && clickable ? '→' : null)}}</span>
      <span :class="windowWidth !== 'sm' ? 'underline' : null"></span>
    </div>
    <transition name="fade">
      <div v-if="contentReady && !clickable" class="unclickable" :style="`font-size: ${fontSize}px`">
        <span>coming soon</span>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import anime from 'animejs'

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
      return (this.windowWidth === 'sm')
        ? `mobile-${this.side}`
        : `${this.side}`
    }
  },
  methods: {
    unclickableShake () {
      console.log('moi')
      if (this.contentReady && !this.clickable) {
        const shake = anime({
          targets: this.$el.querySelector('.unclickable'),
          translateX: [
            { value: -10 },
            { value: 9 },
            { value: -6 },
            { value: 5 },
            { value: -2 },
            { value: 1 },
            { value: 0 }
          ],
          offset: 0,
          easing: 'linear',
          duration: 400
        })
        shake.restart
      }
    }
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
      font-size: 24px;
      padding-bottom: calc(25vh + 25px);
      align-items: flex-end;
    }
    &.mobile-right {
      font-size: 24px;
      padding-top: calc(25vh + 25px);
      align-items: flex-start;
    }

    &.right {
      padding-left: calc(80px * 2);
    }

    &.left {
      padding-right: calc(80px * 2);
    }

    .text {
      position: relative;
      padding-bottom: 5px;
      overflow: hidden;
      user-select: none;
      
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
      height: 1em;
      padding-top: calc(11px * 2);
      user-select: none;
      pointer-events: none;

      span {
        font-family: 'Akkurat Mono', sans-serif;
        color: rgba(white, .5);
        font-size: 11px;      
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

  .fade-enter-active, .fade-leave-active {
    transition: all .5s cubic-bezier(0.19, 1, 0.22, 1) .25s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(-2px);
    opacity: 0;
  }
</style>
