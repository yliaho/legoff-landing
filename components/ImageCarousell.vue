<template>
  <div class="carousell">
    <transition :name="`${side}-fade`">
      <div class="image"
          v-for="(image, index) in images(side)" 
          :key="index"
          v-if="index === indexer && ready"
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
      'imagesLength'
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
      width: 100%;
      height: 100%;
      background-size: fit;
      background-position: center;
    }
  }

  /*
   * Transition animation LEFT
   */
  .left-fade-leave-active {
    transition: all 1.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    transform-origin: 100% 50%;
  }
  .left-fade-enter-active, {
    transition: all 1.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    transform-origin: 100% 50%;   
  }
  .left-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(-50vw) scale(1);
    opacity: .4;
  }
  .left-fade-enter {
    transform: translateX(50vw);
    opacity: 1;
  }

  /*
   * Transition animation RIGHT
   */
  .right-fade-leave-active {
    transition: all 1.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    transform-origin: 100% 50%;
  }
  .right-fade-enter-active, {
    transition: all 1.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    transform-origin: 100% 50%;   
  }
  .right-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(50vw) scale(1);
    opacity: .4;
  }
  .right-fade-enter {
    transform: translateX(-50vw);
    opacity: 1;
  }
</style>
