<template>
  <div>
    <nuxt/>
  </div>
</template>

<style>
  @import '~nanoreset';

  @font-face {
    font-family: 'Akkurat';
    src: url('~assets/fonts/Akkurat-Normal.woff') 
         format('woff')
  }

  @font-face {
    font-family: 'Akkurat Mono';
    src: url('~assets/fonts/Akkurat-Mono.woff') 
         format('woff')
  }

  html {
    font-family: 'Akkurat';
    color: #fff;
    font-size: 15px;
  }

  .font--stylized {
    font-family: 'Akkurat Mono'
  }

  h1 {
    line-height: 2.3;
    font-size: 17px;
  }

  a {
    color: #fff!important;
    text-decoration: none!important;
  }

</style>
