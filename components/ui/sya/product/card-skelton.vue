<script lang="ts" setup>
defineProps({ hideDescription: { type: Boolean, default: false } });
</script>

<template>
  <div
    class="pa-5"
    style="
      border-radius: 0.5em;
      border: 1px solid rgba(var(--v-theme-on-background), 0.04);
    "
  >
    <div class="d-flex ga-2">
      <div>
        <div class="skeleton rounded" style="width: 64px; height: 64px"></div>
      </div>
      <div style="width: 100%">
        <div
          class="skeleton"
          style="width: 200px; max-width: 50%; height: 10px"
        ></div>
        <div class="d-flex align-center mt-1" style="gap: 3px">
          <div
            v-for="i in 5"
            style="width: 28px; height: 28px"
            class="skeleton"
          ></div>
        </div>
        <!-- <div
        class="skeleton"
        style="width: 50px; height: 10px; margin-top: 3px"
      ></div> -->
      </div>
    </div>

    <div v-if="!hideDescription" class="mt-3">
      <div
        v-for="i in 5"
        style="height: 10px"
        :style="{ width: `${Math.floor(Math.random() * (80 - 40 + 1)) + 40}%` }"
        class="skeleton mt-1"
      ></div>
    </div>
  </div>
</template>
