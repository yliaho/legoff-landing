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
    perspective: 0px;
    transform: translate3D(0, 0, 0);
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

  .page-leave-active, .page-enter-active {
    transition: transform .8s .2s, opacity 0s .8s;
  }


  .page-leave-to {
    transform: transform .8s .2s;
    transform: translate3D(-20%, 0, 0);
  }

  .page-enter {
    transform: transform .8s .2s;
    transform: translate3D(20%, 0, 0);
  }

  .page-enter-to {
    transform: transform .8s .2s
  }

</style>
