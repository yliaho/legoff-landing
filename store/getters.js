const getters = {
  images: (state) => (side) => {
    return (side === 'left') ? state.imagesLeft : state.imagesRight
  }
}

export default getters
