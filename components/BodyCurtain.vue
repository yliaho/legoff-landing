<template>
  <div class="curtain__root">
    <div class="curtain_content">
      <div class="curtain__mainbody">
        <svg class="page-transition-curtain curtain__left" height="100%" viewBox="0 0 640 720" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g fill="none">
              <path class="curtain__polygon bottom" d="M640 0h1l-1 720h-640z"/>
              <path class="curtain__polygon" d="M641 0v720h-640z"/>
          </g>
        </svg>
        <svg class="page-transition-curtain curtain__right" height="100%" viewBox="0 0 640 720" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g fill="none">
              <path class="curtain__polygon bottom" fill="#f00" d="M1 720l640-720h-640l-1 720z"/>
              <path class="curtain__polygon" fill="#9A9A9A" d="M0 720l640-720h-640z"/>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Anime from 'animejs'

export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      pageSwipeStatus: 'pageSwipeStatus'
    }),
    swipeAnimTimeline () {
      return Anime.timeline
    }
  },
  watch: {
    pageSwipeStatus: function (val) {
      if (val === 'leave') {
        this.startSwipe()
      }
    }
  },
  methods: {
    initSwipe () {
      return Anime.timeline()
        .add({
          targets: this.$el.querySelector('.curtain_content'),
          translateX: ['190%', '0%'],
          easing: 'easeOutQuint',
          duration: 1200
        })
        .add({
          targets: this.$el.querySelector('.curtain_content'),
          translateX: '-190%',
          easing: 'easeOutQuint',
          duration: 1200
        })
    },
    startSwipe () {
      this.initSwipe()
    },
    endSwipe () {
      console.log('finish')
      Anime({
        targets: this.$el.querySelector('.curtain_content'),
        translateX: '-150%',
        easing: [0.7, 0, 0.3, 1],
        duration: 600
      })
    },

    start () {
      this.startSwipe()
    },
    finish () {
      this.endSwipe()
    }
  }
}
</script>

<style lang="scss">
.curtain__root {
  z-index: 1000;
  overflow: hidden;
  width: 200px;
  z-index: 900;
  pointer-events: none;
}

.curtain_content {
  $curtain-bgcolor: #232323;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  max-width: 300vw;
  pointer-events: none;
  z-index: 300;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  transform: translateX(150%);
  // animation: page-out .5s ease-in forwards, page-in .5s ease-out 1.5s forwards;
  will-change: transform;

  @keyframes page-out {
    from {
      transform: translateX(150%);
    }
    to {
      transform: translateX(0%);
    }
  }

  @keyframes page-in {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-150%);
    }
  }

  .curtain__mainbody {
    position: relative;
    background-color: $curtain-bgcolor;
    height: 100%;
    width: 100vw;
    min-width: 100vw;

    .curtain__left {
      display: block;
      left: 0;
      transform: translateX(-100%);
    }

    .curtain__right {
      display: block;
      right: 0;
      transform: translateX(100%);
    }

    .page-transition-curtain {
      position: absolute;
      height: 100vh;
      .curtain__polygon,
      .curtain__center {
        fill: $curtain-bgcolor;

        &.bottom {
          fill: #313131;
        }
      }
    }
  }
}
</style>
