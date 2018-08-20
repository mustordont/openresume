<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title>
          Login
        </v-card-title>
        <v-card-text>
          {{providers.list}}
          <v-text-field v-model="input.login" label="Login"></v-text-field>
          <v-text-field v-model="input.password" label="Password" type="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn v-on:click="login()">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import {ProvidersState} from "../store/providers-module";

const namespace: string = 'providers';

@Component({})
export default class Login extends Vue {
  @State('providers') providers!: ProvidersState;
  @Action('getProviders', {namespace}) private _getProviders: any;

  public input = {
    login: '',
    password: '',
  };

  public mounted() {
    this._getProviders();
  }

  public login(): void {
    console.log('login');
  }
}
</script>

<style scoped>
</style>