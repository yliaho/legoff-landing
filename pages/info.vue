<template>
  <section class="info-page">
    <div 
      v-if="isContentReady" 
      class="info-container"
      :style="infoContainerStyle">
      <close-button></close-button>
      <div class="block biography">
        <info-bio class="bio-intro"
          :show-social="true"
          :size="3"
          :breakpoint-labels="breakpoints.label">
          {{content.info.introduction}}
        </info-bio>
        <div class="link-container portals">
          <project-list
            :projects="content.info.portals"
            :breakpoint-labels="breakpoints.label">
          </project-list>
        </div>
      </div>
      <div class="block other-projects">
        <info-bio
          :show-social="false"
          :size="2"
          :breakpoint-labels="breakpoints.label">
          {{content.info.links.introduction}}
        </info-bio>
        <div class="link-container links">
          <project-list
            :projects="content.info.links.elements"
            :breakpoint-labels="breakpoints.label">
          </project-list>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CloseButton from '@/components/CloseButton'
import InfoBio from '@/components/InfoBio'
import ProjectList from '@/components/ProjectList'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    CloseButton,
    InfoBio,
    ProjectList
  },

  data () {
    return {
      breakpoints: {
        label: {
          md: 720,
          sm: 576
        }
      }
    }
  },

  computed: {
    ...mapState([
      'content'
    ]),

    ...mapGetters([
      'isContentReady',
      'windowWidthInPx',
      'getTransitionPhase'
    ]),

    infoContainerStyle () {
      return this.windowWidthInPx >= 720
       ? {
         width: `calc(79px * 9)`
       }
       : {
         width: `100%`,
         padding: `0 40px`
       }
    }
  },

  methods: {
    ...mapMutations([
      'changeTransitionPhase'
    ])
  },

  mounted () {
    if (this.getTransitionPhase >= 6) {
      this.changeTransitionPhase(7)
    }
  }
}
</script>

<style lang="scss">

.info-page {
  background-image: url(~assets/gridblock.svg);
  background-repeat: repeat;
  background-position: 50% 2px;
  min-height: 100vh;
}

.info-container {
  padding-top: calc(80px * 2)!important;
  margin: 0 auto;
  height: auto;
}

.bio-intro {
  margin-bottom: 79px;
}

.block {
  padding-bottom: calc(79px * 2)
}

</style>
