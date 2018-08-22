<template>
  <v-container fluid>
    <v-layout justify-space-around>
      <v-progress-circular
        :rotate="-90"
        :size="100"
        :width="15"
        :value="stats.memoryUsage"
        color="primary"
      >
        memory
      </v-progress-circular>
      <v-progress-circular
        :rotate="-90"
        :size="100"
        :width="15"
        :value="stats.rowsUsage"
        color="teal"
      >
        rows
      </v-progress-circular>
    </v-layout>
    <v-list dense subheader>
      <template v-for="(group, index) in stats.groups">
        <v-subheader class="primary--text">{{group.label}}</v-subheader>
        <v-list-tile
          :key="item.label+index"
          v-for="item in group.items"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{item.label}}: {{item.count}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider
          v-if="index !== stats.groups.length - 1"
          :key="index"
        ></v-divider>
      </template>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import {StatsModel} from "../store/models/stats.model";

@Component
export default class Stats extends Vue {
  @Getter('stats') public stats: StatsModel;
  @Action('getStats') private getStats: any;

  public mounted(): void {
    this.getStats();
  }
}
</script>

<style lang="scss" scoped>
  .v-progress-circular {
    margin: 10px;
  }
</style>