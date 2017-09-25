<template>
  <section class="container" :style="`height: ${windowHeight}px`">
    <Panels></Panels>
    <Loading></Loading>
  </section>
</template>

<script>
/* eslint-disable */
import Panels from '~/components/Panels'
import Loading from '~/components/LoadingSvg'

import { mapMutations } from 'vuex'

export default {
  components: {
    Panels,
    Loading
  },
  data () {
    return {
      windowHeight: null
    }
  },
  transition: 'page',
  methods: {
    ...mapMutations([
      'getWindowWidth'
    ])
  },
  mounted () {
    this.getWindowWidth(window.innerWidth)
    this.windowHeight = window.innerHeight
    window.onresize = () => {
      this.getWindowWidth(window.innerWidth)
      this.windowHeight = window.innerHeight
    }
  }
}
</script>

<style scoped>
  .container {
    /* height: calc(100vh + 1px - 1px); */
    overflow: visible;
  }
</style>
