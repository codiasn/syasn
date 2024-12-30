<script lang="ts" setup>
import type { IApplication } from "~/jsclient/interfaces";

const sya = useSya();
const applications = ref<IApplication[]>([]);

onMounted(async () => {
  applications.value = await sya.application.list();
});
</script>

<template>
  <v-app>
    <v-container fluid>
      <v-row v-if="applications.length">
        <v-col
          cols="12"
          sm="6"
          md="3"
          v-for="application in applications"
          :key="application.id"
        >
          <ui-sya-application-card :application="application" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
