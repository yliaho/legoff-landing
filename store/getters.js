const getters = {
  images: (state) => (side) => {
    return (side === 'left') ? state.imagesLeft : state.imagesRight
  },
  imagesLength: (state) => (side) => {
    if (state.content) {
      return (side === 'left') ? state.imagesLeft.length : state.imagesRight.length
    }
  }
}

export default getters
