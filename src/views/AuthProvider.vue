<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title>
          provider id {{id}}
          <br>
          provider code {{code}}
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import { Action } from 'vuex-class';

  @Component({})
  export default class AuthProvider extends Vue {
    @Prop() public id!: string;
    public code: string = '';
    @Action('getAuthToken', {namespace: 'providers'}) private getAuthToken;

    public mounted(): void {
      this.code = this.$route.query.code;
      if (this.id) {
        this.getAuthToken({provider: this.id, code: this.code});
      }
    }
  }
</script>

<style scoped>
</style>