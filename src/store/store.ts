import Vue from 'vue';
import Vuex from 'vuex';
import {providersModule} from './providers.module';
import {RootState} from './types/common';
import {apiRequest} from "./api-request.decorator";
import {IGetProviderAuth} from "../service/interfaces";
import {router} from "../router";

Vue.use(Vuex);

class StoreApi {
  @apiRequest()
  refreshToken({ commit, state, dispatch }, token): any {
    const parsedToken = this._parseJwt(token);
    if (parsedToken.exp) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
        Vue.apiService.refreshToken(token)
          .then((result: IGetProviderAuth) => {
            localStorage.setItem('token', result.token);
            commit('setToken', result.token);
            dispatch('refreshToken');
            resolve();
          })
          .catch((error) => reject(error));
        }, new Date(parsedToken.exp*1000).valueOf() - new Date().valueOf() - 60000);
      });
    } else {
      return Promise.reject({message: 'Can\'t refresh. No expiration field at token.'});
    }
  };

  private _parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}

const storeApi = new StoreApi();

export const store = new Vuex.Store<RootState>({
  state: {
    version: '1.0.0', // a simple property
    busy: false,
    workers: [],
    error: null,
    token: '',
  },
  modules: {
    providers: providersModule,
  },

  getters: {
    busy: state => state.busy,
    error: state => state.error,
    token: state => state.token,
  },

  mutations: {
    setBusy(state, value) {
      state.busy = value;
    },
    setError(state, value) {
      state.error = value;
    },
    setToken(state, value) {
      state.token = value;
    }
  },

  actions: {
    addWorker({commit, state}): Promise<number> {
      const temp = state.workers.length + 1;
      commit('setBusy', !!temp);
      return Promise.resolve(temp);
    },
    removeWorker({commit, state}, {current}): void {
      state.workers.splice(state.workers.findIndex(i => i === current), 1);
      commit('setBusy', !!state.workers.length);
    },
    removeError({commit}): void {
      commit('setError', null);
    },
    refreshToken: (...arg) => storeApi.refreshToken(arg[0], arg[1]),
  }
});
