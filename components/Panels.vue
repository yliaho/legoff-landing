<template>
  <div class="panels">
    <LandingModal></LandingModal>
    <div id="panel"
         class="panelLeft"
         @mouseover="changePanelState(left, true)">
        <a :href="contentReady ? content.panels.left.url : null">
          <div class="panel-title font--stylized"
                v-show="!loading"
                :class="!loading ? 'visible' : 'hidden'">
            <span :class="left.isActive ? 'active' : null">UI</span>
          </div>
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
         @mouseover="changePanelState(right, true)">
        <a :href="contentReady ? content.panels.right.url : null">
          <div class="panel-title font--stylized"
                v-show="!loading"
                :class="!loading ? 'visible' : 'hidden'">
            <span :class="right.isActive ? 'active' : null">visdev</span>
          </div>
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
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    LandingModal,
    ImageCarousell,
    GridSvg
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
      'url'
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

        setTimeout(() => {
          this.$store.commit('changeReady', true)
        }, 800)
      }, 500)
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
      side.intervalID = setInterval(() => {
        side.index = (side.index < length - 1)
          ? side.index = side.index + 1
          : side.index = 0
        console.log(side.index)
      }, 1000)
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
      overflow: hidden;

      .panel-title {
        position: absolute;
        top: 0;
        bottom: 21px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3;
        overflow: hidden;
        transition: all 2.3s ease-out;
        color: white;
        transform-origin: 50% 50%;

        span {
          position: relative;
          padding-bottom: 3px;
         
          &:after {
            content: "";
            color: rgba(255,255,255,.5);
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 0;
            box-shadow: 0 1px;
            transition: .5s cubic-bezier(0.455, 0.03, 0.515, 0.955);
          }

          &.active {
            &:after {
              width: 100%;
            }
          }
        }

        &.visible {
          opacity: 1;
          // animation: panelFadein .9s cubic-bezier(0.62, 0, 0, 1) .7s forwards;
        }
      }
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
