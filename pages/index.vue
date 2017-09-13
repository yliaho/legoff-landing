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
import axios from '~/plugins/axios'

import { mapMutations } from 'vuex'

export default {
  components: {
    Panels,
    Loading
  },
  data () {
    return {
      windowHeight: 0
    }
  },
  methods: {
    ...mapMutations([
      'getWindowWidth'
    ])
  },
  mounted () {
    axios.get('/content.json').then(res => {
      this.$store.commit('setContent', res.data)
    })
    
    this.getWindowWidth(window.innerWidth)
    this.windowHeight = window.innerHeight
    window.onresize = () => {
      this.getWindowWidth(window.innerWidth)
      this.windowHeight = window.innerHeight
    }
  }
}
</script>

<style>
  html {
    background-color: #232323;
    overflow-y: auto;
  }

  .container {
    /* height: calc(100vh + 1px - 1px); */
  }
</style>
