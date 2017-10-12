module.exports = {
  /**
   * plugins
   */
  plugins: [
    '~plugins/lazyload'
  ],

  /*
   * router config
   */
  router: {
    base: '/legoff-landing/'
  },

  /*
   * BaseURL
   */
  siteURL: 'https://yliaho.github.io/legoff-landing',

  env: {
    baseURL: (process.env.NODE_ENV === 'production'
      ? 'https://yliaho.github.io/legoff-landing'
      : 'http://localhost:3000/')
  },

  transition: {
    name: 'page',
    css: false,

    beforeLeave (el) {
      this.$store.commit('changePageSwipeStatus', 'beforeLeave')
    },
    leave (el, done) {
      this.$store.commit('changePageSwipeStatus', 'leave')
      setTimeout(() => {
        done()
      }, 800)
    },
    enter (el, done) {
      this.$store.commit('changePageSwipeStatus', 'enter')
      done()
    },
    afterEnter (el) {
      this.$store.commit('changePageSwipeStatus', 'afterEnter')
    }
  },

  css: [
    'assets/main.css'
  ],

  /*
   * Headers of the page
   */
  head: {
    title: 'Thomas Le Goff',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
   * Customize the progress-bar color
   */
  // loading: '~/components/BodyCurtain.vue',

  /*
   * Build configuration
   */
  build: {
    /*
     * Run ESLINT on save
     */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
