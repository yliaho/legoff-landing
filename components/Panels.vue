<template>
  <div class="panels"
       :class="windowWidth">
    <LandingModal></LandingModal>
    <div id="panel"
         class="panelLeft"
         @mousemove="changePanelState(left, true)">
        <a :href="isContentReady ? panelLink('left') : null">
          <PanelTitle :is-active="left.isActive"
                      :font-size="windowWidth === 'sm' || windowWidth === 'xs' ? 24 : 15"
                      :clickable="isContentReady ? panelLink('left') : null"
                      side="left"
                      :title="isContentReady ? content.panels.left.text : null">
          </PanelTitle>
          <GridSvg grid-side="left" 
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
        <a :href="isContentReady ? panelLink('right') : null">
          <PanelTitle :is-active="right.isActive"
                      :font-size="windowWidth === 'sm' || windowWidth === 'xs' ? 24 : 15"
                      :clickable="isContentReady ? panelLink('right') : null"
                      side="right"
                      :title="isContentReady ? content.panels.right.text : null">
          </PanelTitle>
          <GridSvg grid-side="right" 
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
        isActive: false,
        index: 0,
        intervalID: null
      },
      right: {
        isActive: false,
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
      'windowWidth',
      'isContentReady',
      'getTransitionPhase'
    ])
  },
  mounted () {
    if (this.getTransitionPhase === 0) {
      setTimeout(() => {
        this.$store.commit('incrementTransitionPhase')
        setTimeout(() => {
          this.$store.commit('incrementTransitionPhase')
          setTimeout(() => {
            this.$store.commit('incrementTransitionPhase')
            setTimeout(() => {
              this.$store.commit('incrementTransitionPhase')
            }, 400)
          }, 600)
        }, 800)
      }, 200)
    }
  },
  methods: {
    changePanelState (side, state) {
      if (this.getTransitionPhase >= 4) {
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
      const length = this.imagesLength(side)
      side.intervalID = setInterval(() => {
        side.index = (side.index < length - 1 && this.windowWidth !== 'sm')
          ? side.index = side.index + 1
          : side.index = 0
      }, 1000)
    },
    panelLink (side) {
      if (this.isContentReady) {
        return this.content.panels[side].url !== '#disable'
          ? this.content.panels[side].url
          : null
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

    &.sm, &.xs {
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
