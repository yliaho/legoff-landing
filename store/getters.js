const getters = {
  images: (state) => (side) => {
    return (side === 'left') ? state.imagesLeft : state.imagesRight
  },
  imagesLength: (state) => (side) => {
    if (state.content) {
      return (side === 'left') ? state.imagesLeft.length : state.imagesRight.length
    }
  },
  windowWidth: (state) => {
    if (state.windowWidth >= 1200) {
      return 'xl'
    } else if (state.windowWidth >= 992) {
      return 'lg'
    } else if (state.windowWidth >= 768) {
      return 'md'
    } else if (state.windowWidth <= 576 || state.windowWidth >= 576) {
      return 'sm'
    } else {
      return null
    }
  },
  getTransitionPhase: (state) => {
    return state.transitionPhase
  },
  isContentReady: (state) => {
    return state.content !== null
  }
}

export default getters
