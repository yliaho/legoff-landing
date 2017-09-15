const getters = {
  images: (state) => (side, breakpoint) => {
    return (side === 'left')
      ? (breakpoint !== 'md' ? state.imagesLeft.horizontal : state.imagesLeft.vertical)
      : (breakpoint !== 'md' ? state.imagesRight.horizontal : state.imagesRight.vertical)
  },
  imagesLength: (state) => (side, breakpoint) => {
    if (state.content) {
      return (side === 'left')
      ? (breakpoint !== 'md' ? state.imagesLeft.horizontal.length : 0)
      : (breakpoint !== 'md' ? state.imagesRight.horizontal.length : 0)
    }
  },
  windowWidth: (state) => {
    if (state.windowWidth >= 1200) {
      return 'xl'
    } else if (state.windowWidth >= 992) {
      return 'lg'
    } else if (state.windowWidth <= 768 || state.windowWidth >= 768) {
      return 'md'
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
