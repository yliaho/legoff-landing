<template>
  <div class="carousell">
    <div class="image"
         v-for="(image, index) in images(side)" 
         :key="index"
         v-if="index === activeIndex && ready"
         :style="`background-image: url('~static/${image}.jpg')`">
    </div>  
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  props: [
    'side'
  ],
  data () {
    return {
      activeIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'images'
    ]),
    ...mapState([
      'ready'
    ])
  }
}
</script>

<style lang="scss">
  .carousell {
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .image {
      width: 100%;
      height: 100%;
      background-size: fit;
      background-position: center;
    }
  }
</style>
