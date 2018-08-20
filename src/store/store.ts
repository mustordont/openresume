import Vue from 'vue';
import Vuex from 'vuex';
import {providersModule} from './providers-module';
import {RootState} from './types/common';

Vue.use(Vuex);

export const store = new Vuex.Store<RootState>({
  state: {
    version: '1.0.0', // a simple property
  },
  modules: {
    providers: providersModule,
  },
});
