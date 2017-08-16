<template>
  <div class="panel-title font--stylized" 
       :class="!loading ? 'visible' : 'hidden'"
       @mousemove="mouseOver = true"
       @mouseleave="mouseOver = false">
    <span >
      {{title}}
      <span class="safari-sucks"
            :class="mouseOver ? 'from-enter' : 'from-leave'">
      </span>
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
      mouseOver: true
    }
  },
  computed: {
    ...mapState([
      'loading'
    ])
  },
  mounted () {
    setTimeout(() => {
      this.mouseOver = false
    }, 550)
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
    transition: all .3s ease-out 1s;
    color: white;
    opacity: 0;
    transform-origin: 50% 50%;

    span {
      position: relative;
      padding-bottom: 5px;
      overflow: hidden;
      font-size: 15px;
      perspective: 500px;
      transform: rotate3d(0deg);
      
      .safari-sucks {
        position: absolute;
        top: 0;
        bottom: 2px;
        left: 0;
        right: 0;
      }

      .safari-sucks::after,
      .safari-sucks::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
        animation-fill-mode: forwards!important;
        perspective: 1000px;
      }

      .from-enter.safari-sucks::after {
        color: rgba(255,255,255,.5);
        box-shadow: inset 0 -1px;
        transform: translate3d(-102%,0,0);
        animation: spanEnter .3s;
      }

      .from-leave.safari-sucks::before {
        color: rgba(255,255,255,.5);
        box-shadow: inset 0 -1px;
        animation: spanLeave .3s;
      }
    }

    &.visible {
      opacity: 1;
      // animation: panelFadein .9s cubic-bezier(0.62, 0, 0, 1) .7s forwards;
    }
  }

  @keyframes spanEnter {
    from {
      transform: translate3d(-102%,0,0)
    }
    to {
      transform: translate3d(0,0,0)
    }
  }

  @keyframes spanLeave {
    from {
      transform: translate3d(0,0,0)
    }
    to {
      transform: translate3d(102%,0,0)
    }
  }
</style>
