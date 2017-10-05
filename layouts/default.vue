<template>
  <div>
    <BodyCurtain></BodyCurtain>
    <nuxt id="main-content" />
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import { mapMutations } from 'vuex'
import BodyCurtain from '~/components/BodyCurtain'

export default {
  name: 'legoff',

  components: {
    BodyCurtain
  },

  data () {
    return {
      windowHeight: null
    }
  },

  methods: {
    ...mapMutations([
      'getWindowWidth',
      'getWindowHeight'
    ])
  },

  mounted () {
    this.getWindowWidth(window.innerWidth)
    this.getWindowHeight(window.innerHeight)
    window.onresize = () => {
      this.getWindowWidth(window.innerWidth)
      this.getWindowHeight(window.innerHeight)
    }

    axios.get('/content.json').then(res => {
      this.$store.commit('setContent', res.data)
    })
  }
}
</script>



<style lang="scss">
  @import '~nanoreset';

  @font-face {
    font-family: 'Akkurat Regular';
    src: url('~assets/fonts/Akkurat-Normal.woff') 
         format('woff')
  }

  @font-face {
    font-family: 'Akkurat Light';
    src: url('~assets/fonts/Akkurat-Light.woff') 
          format('woff')
  }

  @font-face {
    font-family: 'Akkurat Mono';
    src: url('~assets/fonts/Akkurat-Mono.woff') 
         format('woff')
  }


  html {
    font-family: 'Akkurat Light';
    color: #fff;
    font-size: 14px;
    overflow-x: hidden;
    background-color: #232323;
    overflow-y: auto;
  }

  body {
    overflow-x: hidden;
    height: 100%;
  }

  #main-content {
    position: relative;
    z-index: 1;
  }

  .font--stylized {
    font-family: 'Akkurat Mono'
  }

  h1 {
    line-height: 2.3;
    font-size: 17px;
  }

  a {
    color: #fff!important;
    text-decoration: none!important;
  }

  .page-enter-active, .page-leave-active {
    transition: all .8s
  }
  .page-enter, .page-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(-10%);
    opacity: 1;
  }

</style>
