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
  }
}

export default mutations
