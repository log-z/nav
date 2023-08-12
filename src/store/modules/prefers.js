export default {
  namespaced: true,
  state: () => ({
    // 配色方案
    colorScheme: 'light',
    // 搜索引擎
    searchEngine: 'baidu',
    // 特性
    feature: {
      // 毛玻璃特性
      glassmorphism: true,
    },
  }),
  mutations: {
    colorScheme: function(state, s) {
      state.colorScheme = s;
    },
    searchEngine: function(state, eng) {
      state.searchEngine = eng;
    },
    featureGlassmorphism: function(state, active) {
      state.feature.glassmorphism = active;
    },
  },
}
