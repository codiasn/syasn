<script lang="ts" setup>
import type { IApplicationStatsObject } from "~/jsclient/interfaces";

const sya = useSya();

const { data: stats } = await useAsyncData(async () => {
  return sya.application.statsList({ _pagination: { page: 1 } });
});
</script>

<template>
  <v-app>
    <v-container fluid>
      <v-row v-if="stats">
        <v-col cols="12" sm="6" md="3" v-for="(stat, s) in stats" :key="s">
          <ui-sya-application-card :stats="stat" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
