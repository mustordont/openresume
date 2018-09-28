<template>
  <v-app id="inspire">
    <v-toolbar dark class="teal">
      <v-toolbar-title>
        <span style="cursor: pointer" v-on:click="toMain()">pushResume</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-on:click="logout()" flat fab>
        <v-icon >power_settings_new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-progress-linear class="loader" v-show="busy" :indeterminate="true" height="5" color="primary"></v-progress-linear>
      <v-container fluid fill-height>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-content>

    <v-footer height="auto" dark class="teal">
      <Stats/>
    </v-footer>

    <v-snackbar v-model="showError" :timeout="0">
      {{error}}
      <v-btn color="pink" flat v-on:click="closeError()">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
  import { Action, Getter } from 'vuex-class';
  import {Component, Vue} from 'vue-property-decorator';
  import Stats from './components/Stats.vue';
  import {router} from './router';

  @Component({
    components: {Stats}
  })
  export default class App extends Vue {
    @Getter('busy') public busy!: boolean;
    @Getter('error') public error!: boolean;
    @Action('removeError') private removeError: any;
    @Action('refreshToken') private refreshToken: any;
    @Action('logout') private logout: any;

    public routes = [
      {
        title: 'Providers',
        icon: 'apps',
        name: 'login'
      }
    ];

    public get showError(): boolean {
      return !!this.error;
    }

    public closeError(): void {
      this.removeError();
    }

    public mounted(): void {
      const token = localStorage.getItem('token');
      if (token) {
        this.refreshToken(token);
      }
    }

    toMain(): void {
      router.push({name: 'login'});
    }
  }
</script>

<style lang="scss" scoped>
.loader {
  position: absolute;
  top: 0;
  z-index: 10;
  margin: 0;
}
</style>
