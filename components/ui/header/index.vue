<script lang="ts" setup>
const localePath = useLocalePath();
</script>

<template>
  <v-app-bar
    class="ui-header"
    style="
      border-color: rgba(var(--v-theme-on-background), 0.06) !important;
      height: 64px;
    "
    color="background"
  >
    <v-app-bar-title>
      <nuxt-link
        class="d-flex align-center text-black overflow-hidden pa-1"
        :to="localePath({ name: 'index' })"
        style="width: max-content; display: flex; align-items: center; gap: 5px"
      >
        <div
          class="bg-primaryf text-primary"
          style="
            width: 42px;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.12em;
          "
        >
          <ui-svg name="logo" size="38" />
        </div>

        <div style="font-weight: bold; font-size: 26px">Advensya</div>
      </nuxt-link>
    </v-app-bar-title>

    <slot />

    <div class="mr-5"></div>
  </v-app-bar>
</template>

<style lang="scss">
.ui-header {
  height: 64px;

  .v-toolbar__content {
    height: 100% !important;
  }
}
</style>
