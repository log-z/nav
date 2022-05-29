import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import prefers from './modules/prefers'
import config from './modules/config'

const persistedState = createPersistedState({
  paths: ['prefers', 'config']
})

export default createStore({
  modules: {
    prefers,
    config,
  },
  plugins: [persistedState],
})
