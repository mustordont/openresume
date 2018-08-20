import Vue from 'vue';
import { Module } from 'vuex';
import {RootState} from './types/common';

export interface ProvidersState {
  list: string[];
}

export const providersModule: Module<ProvidersState, RootState> = {
  namespaced: true,

  state: {
    list: [],
  },

  getters: {
    list: state => state.list,
  },

  mutations: {
    setList(state, value) {
      state.list = value;
    },
  },

  actions: {
    getProviders ({ commit }) {
      // Perform the HTTP request.
      Vue.apiService.getProviders()
        .then((result) => {
          // Calls the mutation defined to update the state's JWT.
          commit('setList', result);
        });

    },
  }
};
