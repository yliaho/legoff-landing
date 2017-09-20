<template>
  <vue-scroll class="scroller" v-once>
    <div class="info-container">
      <div class="info"
          :class="windowWidth" 
          :style="`width: calc(79px + 79px * 9`">
        <div class="close">
          <svg v-if="windowWidth !== 'md'" xmlns="http://www.w3.org/2000/svg" width="80" height="81" viewBox="0 0 80 81">
              <g fill="none" stroke="#fff" stroke-width="2">
                  <path d="M2.016 81.123l78.557-79.395"/>
                  <path d="M2.051 2l78.557 79.395"/>
              </g>
          </svg>
          <div v-else>
            ←
          </div>
        </div>
        <div class="intro">
          <div class="bio">
            My name is Thomas Le Goff. I mainly work as a UI designer and visual development artist for media, fashion and games.
          </div>
          <div class="social-icons">
            <Icon type="facebook"></icon>
            <Icon type="twitter"></icon>
            <Icon type="instagram"></icon>
          </div>
        </div>
        <div class="links">
          <ul class="link-blocks">
            <li>
              <div class="image" :style="`background-image: url('/legoff-landing/info.jpg')`"></div>
              <div class="text">
                <h2 class="title">UI Portofolio</h2>
                <div class="description">An overview of the web and advertising projects I’ve worked on for agencies or in freelance, with a focus on corporate identity, branding, and typography.</div>
              </div>
            </li>
            <li>
              <div class="image" :style="`background-image: url('/legoff-landing/info.jpg')`"></div>
              <div class="text">
                <h2 class="title">Visdev Portofolio</h2>
                <div class="description">An overview of the web and advertising projects I’ve worked on for agencies or in freelance, with a focus on corporate identity, branding, and typography.</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </vue-scroll>
</template>

<script>
import Icon from './Icon'
import vueScroll from 'vue-perfect-scrollbar/index.vue'

import {mapGetters, mapState} from 'vuex'

export default {
  components: {
    Icon,
    vueScroll
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      windowWidth: 'windowWidth'
    }),
    ...mapState({
      content: 'content',
      windowWidthInPx: 'windowWidth'
    })
  }
}
</script>

<style lang="scss" scoped>
// @import '~perfect-scrollbar/src/css/main.scss';

.scroller {
  position: absolute;
  top: 0;
  height: auto;
  left: 0;
  right: 0;
  z-index: 100000;
  overflow: hidden;
}

.info-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 100;
  height: auto;
  background-color: #232323;
  background-image: url('../assets/gridblock.svg');
  background-repeat: repeat;
  background-position: center;

  .info {
    position: relative;
    width: calc(79px + 79px * 9);
    height: auto;

    &.md {
      width: 79.5vw!important;
    }

    .close {
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 80px;
      position: fixed;
      height: calc(80px * 2);
      left: calc(50% - 79px * 6);
    }
    &.md .close {
      left: initial;
      justify-content: flex-start;
    }

    .intro {
      height: calc(80px * 4);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: absolute;
      bottom: calc(50vh);

      .bio {
        font-size: 29px;
        margin-left: calc(80px * 2);
        height: calc(80px * 2);
        display: flex;
        align-items: center;
      }
  
      .social-icons {
        display: flex;
        align-items: flex-end;
        margin-left: calc(80px * 2);
        height: 80px;
  
        & > *:first-of-type {
          margin: 0 0;
        }
        & > * {
          margin-left: 80px;
          width: 0;
          height: auto;
        }
      }
    }
  }
  
  .links {
    margin-top: calc(50vh);

    .link-blocks {
      padding-top: calc(80px);

      li { 
        position: relative;

        .image {
          width: 242px;
          height: 242px;
          background-size: 100%;
        }
    
        .text {
          position: absolute;
          z-index: 40;
          display: flex;
          justify-content: center;
          flex-direction: column;
          height: 242px;
          top: 0;
          margin-left: calc(80px * 2)
        }
      }
    }
  }
}


</style>
