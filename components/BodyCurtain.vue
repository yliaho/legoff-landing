<template>
  <div class="curtain__root">
    <div class="curtain_content" style="display: none">
      <div class="curtain__mainbody">
        <svg class="page-transition-curtain curtain__left" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path class="curtain__polygon" d="M1000 999.48l-.52.52h-.64L0 1.16V0h1000v999.48z" fill="#9A9A9A" fill-rule="evenodd"/>
        </svg>
        <svg class="page-transition-curtain curtain__right" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path class="curtain__polygon" d="M0 999.48l.52.52h.64L1000 1.16V0H0v999.48z" fill="#D8D8D8" fill-rule="evenodd"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Anime from 'animejs'

export default {
  data () {
    return {
      swiping: false
    }
  },
  computed: {
    ...mapGetters({
      pageSwipeStatus: 'pageSwipeStatus',
      windowWidthInPx: 'windowWidthInPx'
    }),
    swipeAnimTimeline () {
      return Anime.timeline
    }
  },
  watch: {
    pageSwipeStatus: function (val) {
      if (val === 'leave') {
        this.startSwipe()
      } else if (val === 'afterEnter') {
        this.endSwipe()
      }
    }
  },
  methods: {
    startSwipe () {
      Anime({
        targets: this.$el.querySelector('.curtain_content'),
        translateX: [
          `${this.windowWidthInPx + this.$el.querySelector('.curtain_content .curtain__left').getBoundingClientRect().width}px`,
          '0vw'
        ],
        easing: 'easeOutQuint',
        duration: 800,
        begin: () => {
          this.swiping = true
          this.$el.querySelector('.curtain_content').style.display = 'flex'
        },
        complete: () => {
          this.swiping = false
        }
      })
    },
    endSwipe () {
      Anime({
        targets: this.$el.querySelector('.curtain_content'),
        translateX: [
          '0px',
          `-${this.windowWidthInPx + this.$el.querySelector('.curtain_content .curtain__right').getBoundingClientRect().width}px`
        ],
        easing: 'easeInQuad',
        duration: 600,
        delay: 80,
        begin: () => {
          this.swiping = true
        },
        complete: () => {
          this.$el.querySelector('.curtain_content').style.display = 'none'
          this.changePageSwipeStatus('finished')
        }
      })
    },

    start () {
      this.startSwipe()
    },
    finish () {
      this.endSwipe()
    },

    ...mapMutations({
      changePageSwipeStatus: 'changePageSwipeStatus'
    })
  }
}
</script>

<style lang="scss">
.curtain__root {
  z-index: 1000;
  width: 200px;
  z-index: 900;
  pointer-events: none;
}

.curtain_content {
  $curtain-bgcolor: darken(#232323, 0.3%);

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  max-width: 300vw;
  pointer-events: none;
  z-index: 900;
  // display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  transform: translateX(150%);
  // animation: page-out .5s ease-in forwards, page-in .5s ease-out 1.5s forwards;
  will-change: transform;
  backface-visibility: hidden;

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
          fill: lighten($curtain-bgcolor, 10%);
        }
      }
    }
  }
}
</style>
