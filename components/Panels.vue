<template>
  <div class="panels">
    <div id="panel" 
         class="panelLeft"
         @mouseover="changePanelState(left, true)"
         @mouseleave="changePanelState(left, false)">
      <GridSvg grid-position="left" :visible="left.isActive"></GridSvg>
      <ImageCarousell></ImageCarousell>
    </div>
    <div id="panel" 
         class="PanelRight" 
         @mouseover="changePanelState(right, true)"
         @mouseleave="changePanelState(right, false)">
      <GridSvg grid-position="right" :visible="right.isActive"></GridSvg>
      <ImageCarousell></ImageCarousell>
    </div>
  </div>
</template>

<script>
import ImageCarousell from './ImageCarousell'
import GridSvg from './GridSvg'

export default {
  components: {
    ImageCarousell,
    GridSvg
  },
  data () {
    return {
      isLoading: false,
      left: {
        isActive: false
      },
      right: {
        isActive: false
      }
    }
  },
  methods: {
    changePanelState (side, state) {
      console.log(side, state)
      side.isActive = state
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
      flex-basis: 50%;
      position: relative;
      overflow: hidden;
    }
  }
</style>
