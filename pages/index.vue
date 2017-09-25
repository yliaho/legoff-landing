<template>
  <section class="container" :style="`height: ${windowHeightInPx}px`">
    <Panels></Panels>
    <Loading></Loading>
  </section>
</template>

<script>
/* eslint-disable */
import Panels from '~/components/Panels'
import Loading from '~/components/LoadingSvg'

import { mapMutations, mapGetters } from 'vuex'

export default {
  components: {
    Panels,
    Loading
  },
  computed: {
    ...mapGetters([
      'windowHeightInPx'
    ])
  },
  mounted () {
    
  }
}
</script>

<style scoped>
  .container {
    /* height: calc(100vh + 1px - 1px); */
    overflow: visible;
  }
</style>
