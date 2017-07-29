import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loading: true,
      ready: false,
      content: null,
      imagesLeft: null,
      imagesRight: null
    },
    getters,
    mutations
  })
}

export default createStore
