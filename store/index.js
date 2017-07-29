import Vuex from 'vuex'

import mutations from './mutations'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loading: true
    },
    mutations
  })
}

export default createStore
