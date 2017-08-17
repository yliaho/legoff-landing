<!-- SVG definitions for patterns -->
<template>
  <svg class="grid-element" 
       :class="gridClasses"
       width="100%" 
       height="100%" 
       :style="!visible ? 'background-color: #232323' : 'background-color: transparent'"
       xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern :id="`grid${gridPosition}`" 
               :x="(gridPosition === 'left') ? '100%' : '0%'" 
               y="49.9%" 
               :width="gridSize || 79" 
               :height="gridSize || 79" 
               patternUnits="userSpaceOnUse">
        <g fill="none">
          <path class="dot" fill="#fff" fill-opacity=".60" d="M78 78h1v1h-1z" />
            <g class="lines" 
               stroke="#fff" 
               stroke-width="1" 
               stroke-linecap="square" 
               stroke-opacity=".08">
              <path class="d-line"
                    d="M0.5,0.5 L77.5,77.5" 
                    :style="`stroke-dashoffset: ${lines.dLine.strokeDash};
                             transition-duration: ${transitionDuration}ms;`" />
              <path class="v-line" 
                    d="M78.5.5v77" 
                    :style="`stroke-dashoffset: ${lines.vLine.strokeDash};
                             transition-duration: ${transitionDuration}ms;`" />
              <path class="h-line"
                    d="M0.5,78.5 L77.5,78.5" 
                    :style="`stroke-dashoffset: ${lines.hLine.strokeDash};
                             transition-duration: ${transitionDuration}ms;`" />
            </g>
        </g>
      </pattern>
    </defs>
  
    <rect :fill="`url('#grid${gridPosition}')`" 
          width="100%" 
          height="100%" />
  </svg>
</template>

<script>
/* eslint-disable */
import { mapState } from 'vuex'
// import TWEEN from '@tweenjs/tween.js'

export default {
  props: [
    'gridPosition',
    'gridSize',
    'visible'
  ],
  data () {
    return {
      transitionDuration: 600,
      transitioning: false,
      path: {
        dLine: 110,
        gridLine: 78
      }
    }
  },
  watch: {
    visible: function (value) {   
      if (this.transitioning && !value) {
        this.moveLines('down')
      } else {
        this.moveLines('up')
      }

      this.transitioning = true
      setTimeout(() => {
        this.transitioning = false
      }, this.transitionDuration / 2);
    },
    path: {
      handler (event) {
        if (event.dLine === 220) {
          setTimeout(() => {
            this.$store.commit('changeReady', true)
          }, this.transitionDuration)
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState([
      'loading',
      'ready'
    ]),
    gridClasses () {
      return [
        (this.loading) ? null : 'ready',
        (this.gridPosition === 'left') ? 'left' : 'right'
      ]
    },
    lines () {
      return {
        dLine: {
          strokeDash: this.path.dLine
        },
        vLine: {
          strokeDash: this.path.gridLine
        },
        hLine: {
          strokeDash: this.path.gridLine
        }
      }
    }
  },
  methods: {
    moveLines (toValue) {
      this.path.gridLine = (toValue === 'up')
        ? this.path.gridLine + 78
        : this.path.gridLine - 78
      this.path.dLine = (toValue === 'up')
        ? this.path.dLine + 110
        : this.path.dLine - 110
    }
  }
}
</script>

<style lang="scss" scoped>
  .grid-element {
    position: absolute;
    top: 0px;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 2;
    transition: background-color .15s ease-out .2s;
    overflow: hidden;
  }

  svg.grid-element .lines {
    shape-rendering: optimizeSpeed;
  }

  svg.grid-element .lines .v-line,
  svg.grid-element .lines .h-line {
    stroke-dasharray: 78;
    transition-delay: .05s;
    transition-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }

  svg.grid-element .lines .d-line {
    stroke-dasharray: 110;
    transition-delay: .05s;
    transition-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }
</style>
