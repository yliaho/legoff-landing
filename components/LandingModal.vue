<template>
  <div class="landing-modal"
       :class="ready ? 'visible' : 'hidden'">
    <div class="heading-container">
      <h1 class="landing-heading font--stylized">Thomas Le Goff</h1>
      <h2 class="landing-subtitle">UI Designer <span class="separator">/</span> visdev</h2>
      <h2 class="landing-subtitle">artist</h2>
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
import { mapState } from 'vuex'

export default {
  computed: mapState([
    'loading',
    'ready'
  ]),
  mounted () {
    // if (this.loading) {

    // }
  }
}
</script>

<style lang="scss" scoped>
  .landing-modal {
    overflow: hidden;
    position: absolute;
    top: calc(50% - 80px * 2 + 1px);
    bottom: calc(50% - 80px * 2 + 4px);
    left: calc(50%);
    right: calc(50%);
    z-index: 100;
    background-color: #232323;
    box-shadow: 0 0 0 1px rgba(255,255,255, .15);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-content: space-between;

    &.hidden {
      transition: all .3s ease-out;
    }
    &.visible {
      animation: modalFadein .6s cubic-bezier(0.455, 0.03, 0.515, 0.955) .15s forwards;
    }

    > * {
      white-space: nowrap;
    }
  }

  @keyframes modalFadein {
    from {
      left: calc(50%);
      right: calc(50%);
    }
    to {
      left: calc(50% - 80px * 2 + 2px);
      right: calc(50% - 79px * 2 + 1px);   
    }
  } 

  .landing-modal > * {
    text-align: center;
  }

  .landing-modal > *:first-of-type {
    padding-top: 25px;
  }

  .landing-modal > *:last-of-type {
    padding-bottom: 0px;
  }

  .landing-subtitle span {
    padding: 0 10px;
  }

  .modal-links {

    ul {
      overflow: hidden;
      white-space: nowrap;
      li {
        padding: 2px 0;
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
