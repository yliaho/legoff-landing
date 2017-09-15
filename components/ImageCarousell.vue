<template>
  <div class="carousell">
    <transition :name="`fade`">
      <div class="image"
          v-for="(image, index) in images(side, windowWidth)" 
          :key="index"
          v-if="index === indexer && getTransitionPhase >= 3 && (windowWidth !== 'sm' ? active : true)"
          @mousemove="doCarousell()"
          :style="`background-image: url('/legoff-landing/${image}.jpg')`">
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  props: [
    'side',
    'active',
    'activeIndex'
  ],
  computed: {
    ...mapGetters([
      'images',
      'imagesLength',
      'windowWidth',
      'getTransitionPhase'
    ]),
    ...mapState([
      'ready'
    ]),
    length () {
      return this.$store.getters.imagesLength(this.side)
    },
    indexer () {
      return this.activeIndex
    }
  }
}
</script>

<style lang="scss" scoped>
  .carousell {
    width: 100%;
    height: 100%;
    
    .image {
      position: absolute;
      z-index: 1;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-size: cover;
      background-position: center;
      perspective: 500px;
    }
  }

  /*
   * Transition animation LEFT
   */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

</style>
