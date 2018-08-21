<template>
  <v-layout>
    <v-flex>
      <v-card>
        qwe
        <v-card-title>
          provider id {{id}}
          <br>
          resume
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import { State, Action, Getter, namespace } from 'vuex-class';
  import {ProvidersState} from "../store/providers.module";

  const providersModule = namespace('providers');

  @Component({})
  export default class ResumeProvider extends Vue {
    @Prop() id!: string;

    @State('providers') providers!: ProvidersState;
    @providersModule.Getter('resume') resume!: any;
    @Action('getResume', {namespace: 'providers'}) private _getResume;

    public mounted(): void {
      debugger
      this._getResume(this.id);
    }
  }
</script>

<style scoped>
</style>