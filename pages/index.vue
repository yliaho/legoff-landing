<template>
  <section class="container">
    <Panels></Panels>
  </section>
</template>

<script>
import Panels from '~/components/Panels'

export default {
  components: {
    Panels
  }
}
</script>

<style>
  html {
    background-color: black;
    overflow-y: auto;
  }
</style>
