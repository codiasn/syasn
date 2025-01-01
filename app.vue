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

    <template v-if="$sya.syaDoesntReply">
      <v-alert
        variant="text"
        class="sya-doesnt-reply"
        rounded="lg"
        color="dark"
        aria-label="La communication avec le serveur de sya n'a pas pu être établie. Merci de vérifier votre connexion et d'essayer à nouveau."
      >
        <template #text>
          <div class="d-flex align-center ga-3">
            <i class="fi fi-br-wifi-slash text-red"></i>

            <div class="text-body-2">
              La communication avec le serveur de sya n'a pas pu être établie.
              Merci de vérifier votre connexion et d'essayer à nouveau.
            </div>
          </div>
        </template>
      </v-alert>
    </template>
  </NuxtLayout>
</template>

<style lang="scss">
.sya-doesnt-reply {
  position: fixed !important;
  top: 20px;
  left: 20px;
  max-width: 90%;
  width: 442px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  @media (max-width: 552px) {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
