import axios from 'axios';
import { configLoader } from '@/utils/config';

export default {
  namespaced: true,
state: () => ({
    url: process.env.VUE_APP_DEFAULT_CONFIG_URL,
    config: {},
  }),
  getters: {
    baseUrl: state => state.url.match(/^.*\//),
  },
  mutations: {
    url: function(state, url) {
      state.url = url;
    },
    config: function(state, conf) {
      state.config = conf;
    },
  },
  actions: {
    update: function({commit}) {
      let url = process.env.VUE_APP_DEFAULT_CONFIG_URL
      axios.get(url)
        .then(response => configLoader(response.data))
        .then(config => {
          commit('config', config)
          commit('url', url)
        })
        .catch(error => console.error(error))
    }
  }
}
