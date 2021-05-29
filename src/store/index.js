import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import prefers from './modules/prefers'
import config from './modules/config'

const persistedState = createPersistedState({
    paths: ['prefers', 'config']
})

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        prefers,
        config,
    },
    plugins: [persistedState],
})
