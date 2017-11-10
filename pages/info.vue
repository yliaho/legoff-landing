<template>
  <!-- <v-bar wrapper="wrapper" vBar="scroller" vBarInternal="scrollerInternal"> -->
    <div wrapper="info-page" class="info-page">
      <div v-if="isContentReady" class="container">
        <CloseButton></CloseButton>
        <div class="intro">
          <div class="bio">
            {{content.info.introduction}}
          </div>
          <div class="social-icons">
            <ul>
              <li class="social facebook">
                <a :href="content.info.social[0]">
                  <social-icon icon="facebook" :size="Number(25)"></social-icon>
                </a>
              </li>
              <li class="social twitter">
                <a :href="content.info.social[1]">
                  <social-icon icon="twitter" :size="Number(25)"></social-icon>
                </a>
              </li>
              <li class="social instagram">
                <a :href="content.info.social[2]">
                  <social-icon icon="instagram" :size="Number(25)"></social-icon>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="projects">
          <div class="projects-container">
            <ul class="elements">
              <li class="el-ui">
                <div v-if="pageSwipeStatus === 'finished' || pageSwipeStatus === ''"
                  v-lazy:background-image="`${content.info.portals.ui.imagename}.jpg`" 
                  class="thumbnail">
                  <div class="curtain" />
                </div>
                <div class="text">
                  <h2 class="title font--stylized">{{content.info.portals.ui.title}}</h2>
                  <div class="description">
                    {{content.info.portals.ui.description}}
                  </div>
                </div>
              </li>
              <li class="el-visdev">
                <div v-if="pageSwipeStatus === 'finished' || pageSwipeStatus === ''"
                  v-lazy:background-image="`${content.info.portals.visdev.imagename}.jpg`" 
                  class="thumbnail">
                  <div class="curtain" />
                </div>
                <div class="text">
                  <h2 class="title font--stylized">{{content.info.portals.visdev.title}}</h2>
                  <div class="description">
                    {{content.info.portals.visdev.description}}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- other projects -->
        <div class="other-projects">
          <div class="other-projects-description">
            {{content.info.links.introduction}}
          </div>
          <div class="projects-container">
            <ul class="elements">
              <li v-for="element in content.info.links.elements" :key="element.imagename" class="el-ui">
                <div v-if="pageSwipeStatus === 'finished' || pageSwipeStatus === ''"
                  v-lazy:background-image="`${element.imagename}.jpg`" 
                  class="thumbnail">
                  <div class="curtain" />
                </div>
                <div class="text">
                  <h2 class="title font--stylized">{{element.title}}</h2>
                  <div class="description">
                    {{element.description}}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  <!-- </v-bar> -->
</template>

<script>
// import VBar from 'v-bar'
import { mapState, mapGetters, mapMutations } from 'vuex'
import CloseButton from '@/components/CloseButton'
import SocialIcon from '@/components/SocialIcon'

export default {
  components: {
    // VBar
    CloseButton,
    SocialIcon
  },
  computed: {
    ...mapState([
      'content'
    ]),
    ...mapGetters([
      'isContentReady',
      'windowWidth',
      'windowWidthInPx',
      'getTransitionPhase',
      'pageSwipeStatus'
    ])
  },
  methods: {
    ...mapMutations([
      'incrementTransitionPhase',
      'changeTransitionPhase'
    ]),
    goBack () {
      this.$router.go(-1)
    }
  },
  mounted () {
    if (this.getTransitionPhase >= 6) {
      this.changeTransitionPhase(7)
    }
  }
}
</script>

<style>
.wrapper {
  height: 100vh;
  width: 100vw;
}
.scrollerInternal {
  background-color: #A7A7A7!important;
  border-radius: 0!important;
  width: 1px!important;
}
.scroller {
  background-color: transparent!important;
  width: 15px!important;
}
</style>


<style lang="scss" scoped>
.info-page {
  background-image: url(~assets/gridblock.svg);
  background-repeat: repeat;
  background-position: 50% calc(0% + 40px);
  padding-top: calc(39px * 3);
  min-height: 100vh;
  padding-right: 0!important;
  position: relative;
  padding-bottom: 80px;
  overflow: hidden;
  @media (max-width: 711px) {
    padding: 0 10px;
  }
}

.container {
  width: calc(79px * 9);
  max-width: 100%;
  margin: 0 auto;
  height: auto;
  @media (max-width: 711px) {
    width: 100%;
  }
}

.bio, .other-projects-description {
    height: calc(80px * 1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-size: 29px;
    margin-left: calc(79px * 2);
    line-height: 38px;
    transform: translateY(-27px);
    max-width: 510px;
    @media (max-width: 711px) {
      margin-left: 0;
      height: auto;
    }
  }

.intro {
  height: calc(79px * 3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .social-icons {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 79px;
    margin-left: calc(79px * 2);
    @media (max-width: 711px) {
      margin: 0;
    }

    ul {
      height: auto;

      .social {
        display: inline-block;
        height: 25px;
        width: 25px;
        background-position: center;
        background-size: 100%;
        position: relative;
        transform: translateX(-1px) translateY(1px);

        &:not(:first-of-type) {
          margin-left: 54px
        }


        a {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

.projects, .other-projects {


  .elements {
    @media (max-width: 711px) {
      margin: 0;
      padding: 0;
    }
  }
  .projects-container>ul>li {
    margin: 80px 0;
    position: relative;
    height: calc(79px * 3 - 1px);
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-size: 24px;
    padding-top: calc(82px - 1em);
    cursor: pointer;
    @media (max-width: 711px) {
      padding-top: 0;
      height: auto;
    }
  }

  .thumbnail {
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    width: calc(79px * 3 - 1px);
    transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
    background-size: 100%;
    background-position: center;
    opacity: .75;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 711px) {
      margin-left: 0;
      width: calc(79px * 2 - 1px)!important;
      height: calc(79px * 2 - 1px)!important;
    }
  }

  .el-ui .thumbnail {
    background-position: 0 0;
  }
 
  .el-visdev .thumbnail {
    background-position: 0 0;
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

    .curtain {
      color: black!important;
    }
  }

  li:hover .thumbnail {
    opacity: .8;
    background-position: 0 100%!important;
    transition: none;
  }

  .text {
    margin-left: calc(79px * 2 - 1px);
    @media (max-width: 711px) {
      width: 100%;
      margin: 0px;
      padding-top: calc(79px * 2 - 1px);
    }
    .title {
      font-size: 24px;
      margin-bottom: 32px;

      &:after {
        content: "→";
        display: inline-block;
        padding-left: 1ex;
        transition: all .3s cubic-bezier(0.19, 1, 0.22, 1) .15s;
      }
    }

    .description {
      font-size: initial;
      margin-right: calc(79px * 2 - 1px);
      line-height: calc(79px / 3);
      vertical-align: bottom;
      display: inline-block;

      @media (max-width: 711px) {
        margin: 0;
      }
    }
  }

  li:hover .title {
    &:after {
      transform: translateX(.5ex);
      transition: all .6s cubic-bezier(0.19, 1, 0.22, 1);
    }
  }
}

@keyframes clippy1 {
  0% {
    clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%);
  }
  100% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 100%, 0% 100%);
  }
}

@keyframes clippy2 {
  0% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 100%, 0% 100%);
  }
  100% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%); 
  }
}
    .twitter {
      transform: translateX(-1px) translateY(3px)!important;
    }


</style>
