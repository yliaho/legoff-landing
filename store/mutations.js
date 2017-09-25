const mutations = {
  changeLoading (state, boolean) {
    state.loading = boolean
  },
  changeReady (state, boolean) {
    state.ready = boolean
  },
  setContent (state, content) {
    state.content = content
    state.imagesLeft = content.panels.left.images
    state.imagesRight = content.panels.right.images
    state.contentReady = true
  },
  getWindowWidth (state, w) {
    state.windowWidth = w
  },
  getWindowHeight (state, h) {
    state.windowHeight = h
  },
  incrementTransitionPhase (state) {
    state.transitionPhase = state.transitionPhase + 1
  },
  changeTransitionPhase (state, int) {
    state.transitionPhase = int
  }
}

export default mutations
