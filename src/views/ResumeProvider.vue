<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title>
          provider id {{id}}
        </v-card-title>

        <v-list two-line>
          <template v-for="(item, index) in resumes">
            <v-list-tile
              :key="item.link"
            >
              <v-list-tile-avatar>
                <v-icon v-on:click="toggleResume(item.uniq)" :color="item.enabled ? 'teal' : ''">{{ item.enabled ? 'check_box' : 'check_box_outline_blank' }}</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.label"></v-list-tile-title>
                <v-list-tile-sub-title>
                  <a v-bind:href="item.link" target="_blank" rel="noopener">{{item.link}}</a>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider
              v-if="index !== resumes.length - 1"
              :key="index"
            ></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import { Action, namespace } from 'vuex-class';

  const providersModule = namespace('providers');

  @Component({})
  export default class ResumeProvider extends Vue {
    @Prop() public id!: string;

    @providersModule.Getter('resumes') public resumes!: any;
    @Action('getResumes', {namespace: 'providers'}) private getResumes;
    @Action('toggleResume', {namespace: 'providers'}) private toggleResume;

    public mounted(): void {
      this.getResumes(this.id);
    }

    public toggle(id: string): void {
      this.toggleResume(id);
    }
  }
</script>