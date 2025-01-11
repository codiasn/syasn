<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <v-app>
    <div
      style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1005;
        display: flex;
        align-items: center;
        justify-content: center;
      "
      class="bg-background"
    >
      <v-progress-circular color="dark" indeterminate />

      <!-- <div
        style="
          position: absolute;
          bottom: 50px;
          left: 50%;
          transform: translateX(-50%);
        "
      >
        <ui-svg name="logo" size="42" />
      </div> -->
    </div>
  </v-app>
</template>
