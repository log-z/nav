import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import prefers from './modules/prefers'

const persistedState = createPersistedState({
    paths: ['prefers']
})

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        prefers,
    },
    plugins: [persistedState],
})
