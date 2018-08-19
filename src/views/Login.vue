<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title>
          Login
        </v-card-title>
        <v-card-text>
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

@Component({

})
export default class Login extends Vue {
  input = {
    login: "",
    password: ""
  };

  login(): void {
    console.log('login');
  }
}
</script>

<style scoped>
#login {
  width: 500px;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>