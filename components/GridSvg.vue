<!-- SVG definitions for patterns -->
<template>
  <svg class="grid-element" 
       width="100%" 
       height="100%" 
       :style="!visible ? 'background-color: #232323' : 'background-color: #232323'"
       xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern v-if="gridPosition === 'left'" id="gridleft" x="100%" y="50%" :width="gridSize || 79" :height="gridSize || 79" patternUnits="userSpaceOnUse">
        <g fill="none">
          <path class="dot" fill="#fff" fill-opacity="1" d="M78 78h1v1h-1z" />
            <g class="lines" stroke="#fff" stroke-linecap="square" stroke-opacity=".13">
              <path class="d-line" 
                    d="M77.5,77.5 L0.5,0.5" 
                    :style="`stroke-dashoffset: ${lines.dLine.strokeDash}`" />
              <path class="v-line" 
                    d="M78.5.5v77" 
                    :style="`stroke-dashoffset: ${lines.vLine.strokeDash}`" />
              <path class="h-line" 
                    d="M0.5,78.5 L77.5,78.5" 
                    :style="`stroke-dashoffset: ${lines.hLine.strokeDash}`" />
            </g>
        </g>
      </pattern>
      <pattern v-if="gridPosition === 'right'" id="gridright" x="0%" y="50%" :width="gridSize || 79" :height="gridSize || 79" patternUnits="userSpaceOnUse" patternTransform="translate(0, 0)">
        <g fill="none">
          <path class="dot" fill="#fff" fill-opacity="1" d="M78 78h1v1h-1z" />
          <g class="lines" stroke="#fff" stroke-linecap="square" stroke-opacity=".13">
              <path class="d-line" 
                    d="M77.5,77.5 L0.5,0.5" 
                    :style="`stroke-dashoffset: ${lines.dLine.strokeDash}`" />
              <path class="v-line" 
                    d="M78.5.5v77" 
                    :style="`stroke-dashoffset: ${lines.vLine.strokeDash}`" />
              <path class="h-line" 
                    d="M0.5,78.5 L77.5,78.5" 
                    :style="`stroke-dashoffset: ${lines.hLine.strokeDash}`" />
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

export default {
  props: [
    'gridPosition',
    'gridSize',
    'visible'
  ],
  computed: {
    lines () {
      return {
        dLine: {
          strokeDash: !this.visible ? 0 : 330
        },
        vLine: {
          strokeDash: !this.visible ? 0 : 78
        },
        hLine: {
          strokeDash: !this.visible ? 0 : 78
        }
      }
    }
  },
  methods: {
    fadeoutGrid (line) {
      this.strokeDashoffset.line = 0
    },
    fadeinGrid (line) {
      this.strokeDashoffset.line = 110
    }
  }
}
</script>

<style lang="scss" scoped>
  .grid-element {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1;
    background-color: green;
    transition: background-color .25s ease-out .05s;
  }

  svg.grid-element .lines .v-line,
  svg.grid-element .lines .h-line {
    stroke-dasharray: 78;
    transition-duration: .7s;
    transition-delay: .05s;
    transition-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }

  svg.grid-element .lines .d-line {
    stroke-dasharray: 110;
    transition-delay: 0s;
    transition-duration: 1.4s;
    transition-timing-function: cubic-bezier(0.23, 1, 0.320, 1);
  }
</style>
