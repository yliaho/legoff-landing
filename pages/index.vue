<template>
  <section class="container">
    <Panels></Panels>
    <Loading></Loading>
  </section>
</template>

<script>
import Panels from '~/components/Panels'
import Loading from '~/components/LoadingSvg'
import axios from '~/plugins/axios'

export default {
  components: {
    Panels,
    Loading
  },
  mounted () {
    axios.get('/content.json').then(res => {
      this.$store.commit('setContent', res.data)
    })
    console.log(process.env.NODE_ENV)
  }
}
</script>

<style>
  html {
    background-color: black;
    overflow-y: auto;
  }
</style>
