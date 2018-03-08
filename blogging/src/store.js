import Vue from 'vue';
import Vuex from 'vuex';

import { getArticle } from './services/article-service';

Vue.use(Vuex);

/* eslint-disable-next-line import/prefer-default-export */
export function createStore() {
  return new Vuex.Store({
    state: {
      items: {},
    },
    actions: {
      getArticle({ commit }, id) {
        return getArticle(id).then((item) => {
          commit('setItem', { id, item });
        });
      },
    },
    mutations: {
      setItem(state, { id, item }) {
        Vue.set(state.items, id, item);
      },
    },
  });
}
