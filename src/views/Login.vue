<template>
  <v-layout v-if="!busy" align-center justify-center>

      <v-card>
        <v-card-title>
          {{providersTitle}}
        </v-card-title>
        <v-card-actions v-if="providersList.length" class="text-xs-center">
          <v-btn v-on:click="login(provider)" v-for="provider in notLoggedProviders" :key="provider.name" large color="primary">{{provider.name}}</v-btn>
        </v-card-actions>
      </v-card>

  </v-layout>
  <v-layout align-center justify-center v-else>
    <v-progress-circular
      indeterminate
      color="primary"
      :size="100"
      :width="5"
    ></v-progress-circular>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, namespace } from 'vuex-class';
import {ProviderModel} from '../store/models/provider.model';

const ProvidersModule = namespace('providers');

@Component({})
export default class Login extends Vue {
  busy: boolean = false;
  @ProvidersModule.Getter('list') public providersList!: ProviderModel[];
  @Action('getProviders', {namespace: 'providers'}) private getProviders;
  @Action('getProviderRedirect', {namespace: 'providers'}) private getProviderRedirect;

  get notLoggedProviders(): ProviderModel[] {
    return this.providersList.filter((i: ProviderModel) => !i.logged);
  }

  get providersTitle(): string {
    return this.providersList.length ?
      (this.notLoggedProviders.length ? 'Please select provider' : 'You already logged in every provider')
      : 'Unfortunately providers list is empty';
  }

  public mounted(): void {
    this.getProviders();
  }

  public login(provider: ProviderModel): void {
    this.busy = true;
    this.getProviderRedirect(provider.name)
      .then((result) => this.busy = result);
  }
}
</script>