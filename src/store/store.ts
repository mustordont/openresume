import Vue from 'vue';
import Vuex, {ActionContext} from 'vuex';
import {providersModule} from './providers.module';
import {RootState} from './types/common';
import {apiRequest} from './api-request.decorator';
import {IGetProviderAuth, IStats} from '../service/interfaces';
import {StatsModel} from './models/stats.model';

Vue.use(Vuex);

class StoreApi {
  public refreshHandler: number = null;

  @apiRequest()
  public refreshToken({ commit, dispatch }: ActionContext<RootState, RootState>, token?: string): any {
    return Vue.apiService.makeRequest({url: 'auth/refresh', auth: true})
      .then((result: IGetProviderAuth) => {
        localStorage.setItem('token', result.token);
        commit('setToken', result.token);
        dispatch('refreshToken', result.token);
      });
  }

  @apiRequest()
  public getStats({ commit }: ActionContext<RootState, RootState>, payload: any): any {
    return Vue.apiService.makeRequest({url: 'stats'})
      .then((response: IStats) => {
        commit('setStats', new StatsModel(response));
      });
  }

  public parseJwt(token) {
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
    stats: new StatsModel(),
  },
  modules: {
    providers: providersModule,
  },

  getters: {
    busy: (state) => state.busy,
    error: (state) => state.error,
    token: (state) => state.token,
    stats: (state) => state.stats,
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
    },
    setStats(state, value) {
      state.stats = value;
    }
  },

  actions: {
    addWorker({commit, state}): Promise<number> {
      const current = new Date().valueOf();
      state.workers.push(current);
      commit('setBusy', !!state.workers.length);
      return Promise.resolve(current);
    },
    removeWorker({commit, state}, {current}): void {
      state.workers.splice(state.workers.findIndex((i) => i === current), 1);
      commit('setBusy', !!state.workers.length);
    },
    removeError({commit}): void {
      commit('setError', null);
    },
    refreshToken(args, token) {
      const parsedToken = storeApi.parseJwt(token);
      if (parsedToken.exp) {
        clearTimeout(storeApi.refreshHandler);
        this.refreshHandler = setTimeout(
          () => {
            storeApi.refreshToken(args);
          },
          new Date(parsedToken.exp * 1000).valueOf() - new Date().valueOf() - 60000
          );
      } else {
        return console.error('Can\'t refresh. No expiration field at token.');
      }
    },
    getStats: (...args) => storeApi.getStats(...args),
  },
});
