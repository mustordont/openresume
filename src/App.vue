<template>
  <v-app id="inspire">
    <v-progress-linear class="loader" v-show="busy" :indeterminate="true" height="2"></v-progress-linear>
    <v-toolbar app>
      <v-toolbar-title>openResume</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer app>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/login" v-on:click.native="logout()" replace>Logout</router-link>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
    <v-footer></v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({

})
export default class App extends Vue {
  busy = true;

  login(): void {
    console.log('login');
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
