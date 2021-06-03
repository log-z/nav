import _ from 'lodash';
import axios from 'axios';
import { configLoader } from '@/utils/config';

export default {
    namespaced: true,
    state: {
        url: process.env.VUE_APP_DEFAULT_CONFIG_URL,
        config: configLoader(),
    },
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
        update: function({commit, state}) {
            if (_.isEmpty(state.url)) return;
            axios.get(state.url)
                .then(response => commit('config', configLoader(response.data)))
                .catch(error => console.error(error))
        }
    }
}
