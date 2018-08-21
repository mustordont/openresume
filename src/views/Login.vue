<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title>
          {{providersTitle}}
        </v-card-title>
        <v-card-actions v-if="providersList.length">
          <v-btn v-on:click="login(provider)" v-for="provider in notLoggedProviders">{{provider.name}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter, namespace } from 'vuex-class';
import {ProvidersState} from "../store/providers.module";
import {ProviderModel} from "../store/models/provider.model";

const ProvidersModule = namespace('providers');

@Component({})
export default class Login extends Vue {
  @State('providers') providers!: ProvidersState;
  @ProvidersModule.Getter('list') providersList!: ProviderModel[];
  @Action('getProviders', {namespace: 'providers'}) private _getProviders;
  @Action('getProviderRedirect', {namespace: 'providers'}) private _getProviderRedirect;

  get notLoggedProviders(): ProviderModel[] {
    return this.providersList.filter((i: ProviderModel) => !i.logged);
  }

  get providersTitle(): string {
    return this.providersList.length ?
      (this.notLoggedProviders.length ? 'Please use these providers' : 'You already logged in every provider')
      : 'Unfortunately providers list is empty';
  }

  public mounted(): void {
    this._getProviders();
  }

  public login(provider: ProviderModel): void {
    this._getProviderRedirect(provider.name);
  }
}
</script>

<style scoped>
</style>