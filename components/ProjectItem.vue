<template>
  <div class="project-item"
    @click="goToLink">
    <div class="container">
      <div class="thumbnail"
        v-if="pageSwipeStatus === 'finished' || pageSwipeStatus === ''"
        v-lazy:background-image="`${this.thumbnail}`"
        :style="Object.assign(thumbnailImageSize, thumbnailPosition)">
      </div>
      <div class="text-container"
        :style="textContainerStyle">
        <h2 class="title">{{title}} <span class="arrow">→</span></h2>
        <div class="description">
          {{description}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: 'Project Title'
    },
    description: {
      type: String,
      default: 'Project description'
    },
    thumbnail: {
      type: String,
      default: 'thumbnail.jpg'
    },
    url: {
      type: String,
      default: '#url'
    },
    breakpointLabels: {
      type: Object,
      default: () => {
        return {
          md: 720,
          sm: 576
        }
      }
    }
  },

  computed: {
    ...mapGetters([
      'windowWidthInPx',
      'pageSwipeStatus'
    ]),

    breakpoint () {
      return this.windowWidthInPx <= this.breakpointLabels.sm
    },

    thumbnailImageSize () {
      let size = !this.breakpoint
        ? `calc(79px * 3)`
        : `calc(79px * 2)`

      return {
        width: size,
        height: size
      }
    },

    thumbnailPosition () {
      return !this.breakpoint
        ? {
          position: 'absolute'
        }
        : {
          position: 'initial'
        }
    },

    textContainerStyle () {
      return !this.breakpoint
        ? {
          marginLeft: `calc(80px * 2)`,
          paddingTop: `40px`
        }
        : {
          marginLeft: `0`
        }
    }
  },

  methods: {
    goToLink () {
      location.href = this.url
    }
  }
}
</script>

<style lang="scss" scoped>

.project-item {
  .container {
    position: relative;
    min-height: calc(79px * 3);
    z-index: 1;
    display: flex;
    flex-direction: column;
  }

  &:not(:last-of-type) {
    margin-bottom: 79px;
  }

  &:hover {
    cursor: pointer;
  }
}
.thumbnail {
  background-size: 100%;
  background-position: 0 0;
  z-index: -1;
  opacity: .8;
  transition: opacity .15s ease-out;
}

.project-item:hover .thumbnail {
  background-position: 0 100%;
  opacity: 1;
}

.text-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  .title {
    font-size: 24px;
    font-family: 'Akkurat Mono';
    line-height: 2.5em;

    .arrow {display: inline-block; transition: all 0s}
  }

  .description {
    font-size: 15px;
    line-height: 21px;
    font-family: 'Akkurat Light';
    margin-right: calc(80px * 2);

    @media (max-width: 720px) {
      margin-right: 0;
    }
  }
}

.project-item:hover .title .arrow {
  transform: translateX(8px);
  transition: all .15s ease-out;
}

  .thumbnail[lazy=loading] {
    clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%);
    opacity: 0;
  }
  .thumbnail[lazy=error] {
    /*your style here*/
    opacity: 1;
  }
  .thumbnail[lazy=loaded] {
    clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%);
    opacity: .75;
    transition: opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1);
    animation: clippy1 0.15s linear, clippy2 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s forwards;
  }

@keyframes clippy1 {
  0% {
    clip-path: polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%);
  }
  100% {
    clip-path: polygon(100% 100%, 0% 100%, 0% 100%, 100% 0%, 100% 0%);
  }
}

@keyframes clippy2 {
  0% {
    clip-path: polygon(100% 100%, 0% 100%, 0% 100%, 100% 0%, 100% 0%);
  }
  100% {
    clip-path: polygon(100% 100%, 0% 100%, 0% 0%, 0% 0%, 100% 0%); 
  }
}

</style>
