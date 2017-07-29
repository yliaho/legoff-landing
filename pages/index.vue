<template>
  <section class="container">
    <Panels></Panels>
  </section>
</template>

<script>
import Panels from '~/components/Panels'
import axios from '~/plugins/axios'

export default {
  components: {
    Panels
  },
  mounted () {
    axios.get('/content.json').then(res => {
      this.$store.commit('setContent', res.data)
    })
  }
}
</script>

<style>
  html {
    background-color: black;
    overflow-y: auto;
  }
</style>
