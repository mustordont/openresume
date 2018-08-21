<template>
  <v-app id="inspire">
    <v-progress-linear class="loader" v-show="busy" :indeterminate="true" height="2"></v-progress-linear>
    <v-toolbar app>
      <v-toolbar-title>openResume</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer app>
      <router-link to="/login">Login</router-link>
      <router-link to="/about">About</router-link>
      <!--<router-link to="/login" v-on:click.native="logout()" replace>Logout</router-link>-->
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
    <v-footer></v-footer>

    <v-snackbar v-model="showError" :timeout="0">
      {{error}}
      <v-btn color="pink" flat v-on:click="closeError()">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
  import { State, Action, Getter } from 'vuex-class';
  import {Component, Vue} from 'vue-property-decorator';
  import {RootState} from "./store/types/common";

@Component({})
export default class App extends Vue {
  @Getter('busy') busy!: boolean;
  @Getter('error') error!: boolean;
  @Action('removeError') private _removeError: any;

  get showError(): boolean {
    return !!this.error;
  }

  closeError(): void {
    this._removeError();
  }
}
</script>

<style lang="scss" scoped>
.loader {
  height: 5px;
  position: absolute;
  top: 0;
  z-index: 10;
  margin: 0;
}
</style>
