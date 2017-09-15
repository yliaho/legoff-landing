<template>
  <div class="landing-modal" :class="phaseClasses">
    <div class="heading-container">
      <h1 class="landing-heading font--stylized">Thomas Le Goff</h1>
      <h2 class="landing-subtitle">UI designer
        <span class="separator">/</span> visdev artist</h2>
    </div>
    <transition name="line" mode="out-in">
      <div v-if="windowWidth !== 'md'" class="vertical-line" key="vertical"></div>
      <div v-if="windowWidth === 'md'" class="horizontal-line" key="horizontal"></div>
    </transition>
    <div class="modal-links">
      <ul class="links-default">
        <li>
          <a href="#">contact</a>
        </li>
        <li>
          <a href="#">info &amp; other projects</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import anime from 'animejs'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState([
      'loading',
      'ready',
      'contentReady'
    ]),
    ...mapGetters([
      'windowWidth',
      'getTransitionPhase'
    ]),
    phaseClasses () {
      if (this.getTransitionPhase === 2) {
        return (this.windowWidth !== 'md') ? 'line-horizontal' : 'line-vertical'
      } else if (this.getTransitionPhase >= 3) {
        return (this.windowWidth !== 'md') ? 'expand-horizontal' : 'expand-vertical'
      } else {
        return 'hidden'
      }
    }
  },
  methods: {
    ...mapMutations([
      'incrementTransitionPhase'
    ])
  }
}
</script>

<style lang="scss" scoped>
.landing-modal {
  overflow: hidden;
  position: absolute;
  z-index: 100;
  background-color: #232323;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: space-between;
  top: calc(50%);
  bottom: calc(50%);
  left: calc(50%);
  right: calc(50%);
  overflow: hidden;
  white-space: nowrap;
  transition: top, bottom, right, left;
  transition-duration: .4s;
  transition-timing-function: ease-out;

  &.line-horizontal {
    transform: translateX(-1px);
    border-left: 1px solid #7B7B7B;
    top: calc(50% - 80px * 2 + 1px);
    bottom: calc(50% - 80px * 2 + 4px);
    left: calc(50%);
    right: calc(50%);   
  }

  &.line-vertical {
    transform: translateY(-1px);
    border-bottom: 1px solid #7B7B7B;
    top: calc(50%);
    bottom: calc(50%);
    left: calc(50% - 40px * 3 + 2px);
    right: calc(50% - 39px * 3 + 1px);
  }

  &.expand-horizontal {
    top: calc(50% - 80px * 2 + 1px);
    bottom: calc(50% - 80px * 2 + 4px);
    left: calc(50% - 80px * 2 + 2px);
    right: calc(50% - 79px * 2 + 1px);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, .08);
  }

  &.expand-vertical {
    top: calc(50% - 40px * 3 + 1px);
    bottom: calc(50% - 40px * 3 + 4px);
    left: calc(50% - 40px * 3 + 2px);
    right: calc(50% - 39px * 3 + 1px);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, .08);
  }  
}

@keyframes modalFadeinHorizontal {
  0% {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, .08);
    left: calc(50%);
    right: calc(50%);
  }
  100% {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, .08);
    left: calc(50% - 80px * 2 + 2px);
    right: calc(50% - 79px * 2 + 1px);
  }
}

@keyframes modalFadeinVertical {
  0% {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, .08);
    top: calc(50%);
    bottom: calc(50%);
  }
  100% {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, .08);
    top: calc(50% - 80px * 2 + 1px);
    bottom: calc(50% - 80px * 2 + 4px);
  }
}

@keyframes modalFadeinVerticalXS {
  0% {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, .08);
    top: calc(50%);
    bottom: calc(50%);
  }
  100% {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, .08);
    top: calc(50% - 40px * 3 + 1px);
    bottom: calc(50% - 40px * 3 + 4px);
  }
}

.landing-modal>* {
  text-align: center;
}

.landing-modal>*:first-of-type {
  padding-top: 25px;
}

.landing-modal>*:last-of-type {
  padding-bottom: 0px;
}

.landing-subtitle span {
  padding: 0 7px;
}

.modal-links {

  ul {
    overflow: hidden;
    white-space: nowrap;
    li {
      padding: 2px 0;
      line-height: 1.3;
    }
  }

  .links-default {
    margin-bottom: 25px;
  }
}

.vertical-line {
  height: 125px;
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  margin-bottom: 5px;
  will-change: transform;
}

.horizontal-line {
  width: calc(100% - 35%);
  height: 1px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  margin-bottom: 5px;
  will-change: transform;
}

.line-enter-active, .line-leave-active {
  transition: all .4s;
}
.line-enter, .line-leave-to /* .list-leave-active below version 2.1.8 */ {
  transform: scale(0);
}
</style>
