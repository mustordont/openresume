import Vue from 'vue';
import {Module} from 'vuex';
import {RootState} from './types/common';
import {ProviderModel} from "./models/provider.model";
import {apiRequest} from "./api-request.decorator";
import {IGetProviderRedirect, IGetProviderAuth} from "../service/interfaces";
import {router} from "../router";

export interface ProvidersState {
  list: ProviderModel[];
  resume: any[];
}

class ProvidersApi {
  @apiRequest()
  getProviders ({ commit }): any  {
    return Vue.apiService.getProviders()
      .then((result) => {
        commit('setList', result);
      });
  };

  @apiRequest()
  getProviderRedirect({ commit, dispatch, state }, provider ): any {
    return Vue.apiService.getProviderRedirect(provider)
      .then((result: IGetProviderRedirect) => {
        const current = state.list.find(i => i.name === provider);
        if (current) {
          current.logged = true;
          current.redirectUrl = result.redirect;
          commit('setList', state.list);
          window.location.href = result.redirect;
        }
      });
  };

  @apiRequest()
  getAuthToken({ commit, state, dispatch }, {provider, code}): any {
    return Vue.apiService.getAuthToken(provider, {code})
      .then((result: IGetProviderAuth) => {
        localStorage.setItem('token', result.token);
        router.push('../provider/' + provider);
        dispatch('refreshToken', result.token, {root: true});
      });
  };

  @apiRequest()
  getResume({ commit }, provider): any {
    return Vue.apiService.getResume(provider)
      .then((result) => {
        commit('setResume', result);
      });
  };
}

const providersApi = new ProvidersApi();

export const providersModule: Module<ProvidersState, RootState> = {
  namespaced: true,

  state: {
    list: [],
    resume: [],
  },

  getters: {
    list: state => state.list,
    resume: state => state.resume,
  },

  mutations: {
    setList(state, value: (string|ProviderModel)[]) {
      state.list = value.map(i => new ProviderModel(i));
    },
    setResume(state, value) {
      state.resume = value;
    }
  },

  actions: {
    /*
    getProviders ({ commit, dispatch }) {
      dispatch('addWorker', null, {root: true}).then((current) => {
        Vue.apiService.getProviders()
          .then((result) => {
            commit('setList', result);
          })
          .catch((error) => {
            commit('setError', error.message, {root: true});
          })
          .finally(() => dispatch('removeWorker', {current}, {root: true}));
      });
    },
    */
    getProviders: (args) => providersApi.getProviders(args),
    /*
    getProviderRedirect({ commit, dispatch, state }, provider ) {
      dispatch('addWorker', null, {root: true}).then((current) => {
        Vue.apiService.getProviderRedirect(provider)
          .then((result: {redirect: string}) => {
            const current = state.list.find(i => i.name === provider);
            if (current) {
              current.logged = true;
              current.redirectUrl = result.redirect;
              commit('setList', state.list);
              window.location.href = result.redirect;
            }
          })
          .catch((error) => {
            commit('setError', error.message, {root: true});
          })
          .finally(() => dispatch('removeWorker', {current}, {root: true}));
      });
    },
    */
    getProviderRedirect: (...args) => providersApi.getProviderRedirect(args[0], args[1]),
    getAuthToken: (...args) => providersApi.getAuthToken(args[0], args[1]),
    getResume: (...args) => providersApi.getResume(args[0], args[1]),
  }
};
