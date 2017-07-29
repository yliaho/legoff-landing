<template>
  <div class="panels">
    <LandingModal></LandingModal>
    <div id="panel" 
         class="panelLeft"
         @mousemove="changePanelState(left, true)"
         @mouseleave="changePanelState(left, false)">
      <span class="panel-title font--stylized"
            v-show="!loading"
            :class="!loading ? 'visible' : 'hidden'">
        UI
      </span>
      <GridSvg grid-position="left" :visible="left.isActive"></GridSvg>
      <ImageCarousell side="left"></ImageCarousell>  
    </div>
    <div id="panel" 
         class="PanelRight" 
         @mouseover="changePanelState(right, true)"
         @mouseleave="changePanelState(right, false)">
      <span class="panel-title font--stylized"
            v-show="!loading"
            :class="!loading ? 'visible' : 'hidden'">
        visdev
      </span>
      <GridSvg grid-position="right" :visible="right.isActive"></GridSvg>
      <ImageCarousell side="right"></ImageCarousell>  
    </div>
  </div>
</template>

<script>
import LandingModal from './LandingModal'
import ImageCarousell from './ImageCarousell'
import GridSvg from './GridSvg'
import { mapState } from 'vuex'

export default {
  components: {
    LandingModal,
    ImageCarousell,
    GridSvg
  },
  data () {
    return {
      left: {
        isActive: true
      },
      right: {
        isActive: true
      }
    }
  },
  computed: mapState([
    'loading',
    'ready'
  ]),
  mounted () {
    if (this.loading) {
      this.right.isActive = true
      this.left.isActive = true
      setTimeout(() => {
        this.right.isActive = false
        this.left.isActive = false

        this.$store.commit('changeLoading', false)

        setTimeout(() => {
          this.$store.commit('changeReady', true)
        }, 400)
      }, 2000)
    }
  },
  methods: {
    changePanelState (side, state) {
      if (this.ready) {
        side.isActive = state
      }
    }
  }
}
</script>

<style lang="scss">
  .panels {
    display: flex;
    height: 100vh;
    width: 100vw;

    #panel {
      background-color: #232323;   
      flex-basis: 50%;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      .panel-title {
        position: relative;
        z-index: 3;
        overflow: hidden;
        transition: all 2.3s ease-out;
        background-color: white;
        transform-origin: 0% 50%;

        &.visible {
          opacity: 0;
          animation: panelFadein .9s cubic-bezier(0.62, 0, 0, 1) .7s forwards;
        }
      }
    }
  }

@keyframes panelFadein {
  0% {
    opacity: 1;
    background-color: white;
    transform: scale(0,1);
  }
  20% {
    background-color: white;
    color: black;
    transform: scale(1,1)
  }
  80% {
    background-color: transparent;
    color: white;
  }
  100% {
    color: white;
    background-color: transparent;
    opacity: 1;
  }
}

</style>
