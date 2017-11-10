<template>
  <div class="project-list">
    <div class="projects">
      <project-item
        v-for="project in projects"
        :key="project.title"
        
        :title="project.title"
        :description="project.description"
        :thumbnail="`${project.imagename}.jpg`"
        :url="project.url"
        
        :breakpoint-labels="breakpointLabels">
      </project-item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProjectItem from './ProjectItem'

export default {
  components: {
    ProjectItem
  },

  props: {
    projects: {
      default: () => [{
        title: 'Project Title',
        description: 'Project Description',
        imagename: 'imagename.jpg',
        url: '#url'
      }]
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
      'windowWidthInPx'
    ])
  }
}
</script>

<style lang="scss" scoped>

</style>
