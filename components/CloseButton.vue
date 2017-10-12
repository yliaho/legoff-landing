<template>
  <div id="CloseButton">
    <svg v-if="windowWidthInPx > 885" xmlns="http://www.w3.org/2000/svg" width="80" height="81" viewBox="0 0 80 81">
      <g class="close__cross" stroke="#fff" stroke-width="2">
        <path class="close__cross--right"d="M2.016 81.123l78.557-79.395" />
        <path class="close__cross--left"d="M2.051 2l78.557 79.395" />
      </g>
    </svg>
    <div v-else class="close__arrow">
      <span>←</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Anime from 'animejs'

export default {
  data () {
    return {
      animationDuration: 300
    }
  },

  computed: {
    ...mapGetters({
      windowWidthInPx: 'windowWidthInPx'
    })
  },

  watch: {
    windowWidthInPx: function (val) {
      console.log(val)
    }
  },

  methods: {
    AnimateCross (side) {
      Anime({
        targets: [
          this.$el.querySelector(`.close__cross--${side}`)
        ],
        strokeDashoffset: () => {
          return side === 'left'
            ? [120, 240]
            : [120, 0]
        },
        delay: () => {
          return side === 'left'
            ? 0
            : this.animationDuration
        },
        easing: () => {
          return side === 'left'
           ? 'easeInOutCirc'
           : 'easeInOutCirc'
        },
        duration: () => {
          return side === 'left'
            ? this.animationDuration
            : this.animationDuration
        },
        strokeWidth: {
          value: [8, 3],
          delay: (this.animationDuration) * 2 + 400,
          duration: this.animationDuration,
          easing: 'easeOutSine'
        }
      })
    }
  },

  mounted () {
    this.AnimateCross('left')
    this.AnimateCross('right')
  }
}
</script>

<style lang="scss">
#CloseButton {
  position: fixed!important;
  height: calc(80px * 1);
  display: flex;
  justify-content: center;
  flex-direction: column;
  transform: translateX(-80px);
  overflow: visible;
  cursor: pointer;

  @media (max-width: 885px) {
    transform: none!important;
    justify-content: flex-start;
    transform: translateY(-27px)!important;
    line-height: 30px;
  }

  .close__cross--left,
  .close__cross--right {
    position: fixed!important;
    stroke-dasharray: 120;
  }
}

.close__arrow {
  font-size: 20px;
}
</style>
