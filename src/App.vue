<template>
  <v-app id="inspire">
    <v-progress-linear class="loader" v-show="busy" :indeterminate="true" height="2"></v-progress-linear>
    <v-navigation-drawer app>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              pushResume
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-tile
          v-for="item in routes"
          :key="item.title"
          :to="{name: item.name}"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>
      <Stats/>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-content>

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

  @Component({
    components: {Stats}
  })
  export default class App extends Vue {
    @Getter('busy') public busy!: boolean;
    @Getter('error') public error!: boolean;
    @Action('removeError') private removeError: any;
    @Action('refreshToken') private refreshToken: any;

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
