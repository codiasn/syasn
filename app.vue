<script lang="ts" setup>
import "dayjs/locale/en";
import "dayjs/locale/fr";

import isBetween from "dayjs/plugin/isBetween";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isoWeek from "dayjs/plugin/isoWeek";

const sya = useSya();
const dayjs = useDayjs();

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(isBetween);
</script>

<template>
  <NuxtLoadingIndicator color="#000" />

  <NuxtLayout>
    <NuxtPage />

    <template v-if="sya.syaDoesntReply">
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
  z-index: 1000;
  background-color: rgba(var(--v-theme-background));

  @media (max-width: 552px) {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
