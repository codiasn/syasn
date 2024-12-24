<script lang="ts" setup>
import CAppToast from "~/components/app-toast.vue";

import "dayjs/locale/en";
import "dayjs/locale/fr";

import isBetween from "dayjs/plugin/isBetween";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isoWeek from "dayjs/plugin/isoWeek";

const dayjs = useDayjs();

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(isBetween);

const initing = ref(true);

onMounted(mounted);
async function mounted() {
  initing.value = true;

  try {
    await Store.session.init();
  } finally {
    initing.value = false;
  }
}
</script>

<template>
  <NuxtLayout>
    <ui-loading-page v-if="initing" />
    <nuxt-page v-else />
  </NuxtLayout>
</template>
