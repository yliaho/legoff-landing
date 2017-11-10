<template>
  <div id="CloseButton" @click="goToIndex">
    <svg v-if="windowWidthInPx > 885" xmlns="http://www.w3.org/2000/svg" width="80" height="81" viewBox="0 0 80 81">
      <g class="close__cross" stroke="#fff" stroke-width="2">
        <path class="close__cross--right"
          :style="animationFinished ? `stroke-dashoffset: 0` : `stroke-dashoffset: 120`"
          d="M2.016 81.123l78.557-79.395" />
        <path class="close__cross--left"
          :style="animationFinished ? `stroke-dashoffset: 0` : `stroke-dashoffset: 120`"
          d="M2.051 2l78.557 79.395" />
      </g>
    </svg>
    <div v-else class="close__arrow">
      <span class="close">←</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Anime from 'animejs'

export default {
  data () {
    return {
      animationDuration: 280,
      animationFinished: false
    }
  },

  computed: {
    ...mapGetters({
      windowWidthInPx: 'windowWidthInPx',
      pageSwipeStatus: 'pageSwipeStatus'
    })
  },

  watch: {
    windowWidthInPx: function (val) {
      console.log(val)
    },
    pageSwipeStatus: function (val) {
      if (val === 'finished' || val === '') {
        this.initAnimateCross()
      }
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
            ? 300
            : this.animationDuration + 300
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
        },
        complete: () => {
          this.animationFinished = true
        }
      })
    },
    initAnimateCross () {
      this.AnimateCross('left')
      this.AnimateCross('right')
    },
    goToIndex () {
      this.$router.push({path: '/'})
    }
  },

  mounted () {
    if (this.pageSwipeStatus === '' && this.windowWidthInPx > 768) {
      this.initAnimateCross()
    }
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
    position: absolute!important;
  }

  @media (max-width: 711px) {
    position: relative!important;
    margin-top: 50px;
  }

  .close__cross--left,
  .close__cross--right {
    position: fixed!important;
    stroke-dasharray: 120;
    stroke-dashoffset: 120;
  }
}

.close__arrow {
  font-size: 20px;
}

#CloseButton:hover {
  .close__cross {
    path {
      stroke: #F8E71C;
      color: #F8E71C;
    }
  }

  .close__arrow {
    span {
      color: #F8E71C;
    }
  }
}
</style>
