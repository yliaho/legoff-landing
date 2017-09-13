<template>
  <div class="panels"
       :class="windowWidth">
    <LandingModal></LandingModal>
    <div id="panel"
         class="panelLeft"
         @mousemove="changePanelState(left, true)">
        <a :href="contentReady ? content.panels.left.url : null">
          <PanelTitle :is-active="left.isActive"
                      :font-size="windowWidth === ('sm' || 'xs') ? 24 : 15"
                      side="left"
                      title="UI">
          </PanelTitle>
          <GridSvg grid-position="left" 
                  :visible="left.isActive">
          </GridSvg>
          <ImageCarousell side="left" 
                          :active="left.isActive"
                          :active-index="left.index">
          </ImageCarousell> 
        </a>
    </div>
    <div id="panel" 
         class="PanelRight" 
         @mousemove="changePanelState(right, true)">
        <a :href="contentReady ? content.panels.right.url : null">
          <PanelTitle :is-active="right.isActive"
                      :font-size="windowWidth === ('sm' || 'xs') ? 24 : 15"
                      side="right"
                      title="visdev">
          </PanelTitle>
          <GridSvg grid-position="right" 
                  :visible="right.isActive">
          </GridSvg>
          <ImageCarousell side="right" 
                          :active="right.isActive"
                          :active-index="right.index">
          </ImageCarousell>  
        </a>
    </div>
  </div>
</template>

<script>
import LandingModal from './LandingModal'
import ImageCarousell from './ImageCarousell'
import GridSvg from './GridSvg'
import PanelTitle from './PanelTitle'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    LandingModal,
    ImageCarousell,
    GridSvg,
    PanelTitle
  },
  data () {
    return {
      left: {
        isActive: true,
        index: 0,
        intervalID: null
      },
      right: {
        isActive: true,
        index: 0,
        intervalID: null
      }
    }
  },
  computed: {
    ...mapState([
      'loading',
      'content',
      'contentReady',
      'ready'
    ]),
    ...mapGetters([
      'imagesLength',
      'url',
      'windowWidth'
    ])
  },
  mounted () {
    if (this.loading) {
      this.right.isActive = true
      this.left.isActive = true
      setTimeout(() => {
        this.$store.commit('changeLoading', false)
        this.right.isActive = false
        this.left.isActive = false
      }, 300)
    }
  },
  methods: {
    changePanelState (side, state) {
      if (this.ready) {
        /*eslint-disable */
        if (side === this.left && !side.isActive) {
          this.left.isActive = true
          this.right.isActive = false
          clearInterval(this.right.intervalID)
          this.doImageInterval(this.left)
        } else if (!side.isActive) {
          this.left.isActive = false
          this.right.isActive = true
          clearInterval(this.left.intervalID)
          this.doImageInterval(this.right)
        }
      }
    },
    doImageInterval(side) {
      const length = this.$store.getters.imagesLength(side)
      if (this.windowWidth !== ('sm' || 'xs')) {
        side.intervalID = setInterval(() => {
          side.index = (side.index < length - 1)
            ? side.index = side.index + 1
            : side.index = 0
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss">
  .panels {
    display: flex;
    height: 100%;
    width: 100vw;

    &.sm {
      flex-direction: column;
    }

    #panel {
      background-color: #232323;   
      flex-basis: 50%;
      height: 100%;
      position: relative;
      overflow: hidden;
    }
  }

@keyframes panelFadein {
  0% {
    opacity: 1;
    transform: scale(0,1);
  }
  20% {
    transform: scale(1,1)
  }
  80% {

    color: white;
  }
  100% {
    color: white;
    background-color: transparent;
    opacity: 1;
  }
}

</style>
