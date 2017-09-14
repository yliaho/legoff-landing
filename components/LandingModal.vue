<template>
  <div class="landing-modal" :class="phaseClasses">
    <div class="heading-container">
      <h1 class="landing-heading font--stylized">Thomas Le Goff</h1>
      <h2 class="landing-subtitle">UI designer
        <span class="separator">/</span> visdev artist</h2>
    </div>
    <div class="vertical-line"></div>
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
        return (this.windowWidth !== 'sm') ? 'line-horizontal' : 'line-vertical'
      } else if (this.getTransitionPhase >= 3) {
        return (this.windowWidth !== 'sm') ? 'expand-horizontal' : 'expand-vertical'
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
  transition: top, bottom, right, left;
  transition-duration: .4s;
  transition-timing-function: ease-out;

  &.line-horizontal {
    transform: translateX(-1px);
    border-left: 1px solid rgba(255, 255, 255, .26);
    top: calc(50% - 80px * 2 + 1px);
    bottom: calc(50% - 80px * 2 + 4px);
    left: calc(50%);
    right: calc(50%);   
  }

  &.line-vertical {
    border-bottom: 1px solid rgba(255, 255, 255, .26);
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

  &.md,
  &.lg,
  &.xl {
    top: calc(50% - 80px * 2 + 1px);
    bottom: calc(50% - 80px * 2 + 4px);
    left: calc(50%);
    right: calc(50%);
  }

  &.sm {
    border-bottom: 1px solid rgba(255, 255, 255, .08);
    top: calc(50%);
    bottom: calc(50%);
    left: calc(50% - 40px * 3 + 2px);
    right: calc(50% - 39px * 3 + 1px);
  }

  &.visible {
    z-index: 200;
    border-left: 0;
    transform: none;
    animation: modalFadeinHorizontal .6s cubic-bezier(0.165, 0.84, 0.44, 1) 0s forwards;
  }

  &.visible.sm {
    animation: modalFadeinVerticalXS .6s cubic-bezier(0.165, 0.84, 0.44, 1) 0s forwards;
  }

  >* {
    white-space: nowrap;
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
}
</style>
