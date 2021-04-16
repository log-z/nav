export default {
    namespaced: true,
    state: {
        colorScheme: 'light',
        searchEngine: 'baidu',
    },
    mutations: {
        colorScheme: function(state, s) {
            state.colorScheme = s;
        },
        searchEngine: function(state, eng) {
            state.searchEngine = eng;
        },
    },
}
