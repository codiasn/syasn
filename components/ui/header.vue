<script lang="ts" setup>
const isScrolled = ref(false);

onMounted(mounted);
function mounted() {
  window.addEventListener("scroll", onScroll);
  onScroll();
}

function onScroll() {
  isScrolled.value = window.scrollY > 0;
}

onDeactivated(destroy);
function destroy() {
  window.removeEventListener("scroll", onScroll);
}
</script>

<template>
  <v-app-bar
    class="ui-app-bar"
    style="border-bottom: 0 !important"
    :style="
      isScrolled
        ? {
            backdropFilter: 'blur(0.9rem)',
            backgroundColor: 'rgba(0,0,0,.5) !important',
          }
        : { backgroundColor: 'transparent !important' }
    "
  >
    <v-app-bar-title class="ml-0">
      <nuxt-link
        class="d-flex align-center text-white overflow-hidden"
        style="
          width: max-content;
          backdrop-filter: blur(0.9rem);
          background-color: rgba(0, 0, 0, 0.5);
          border-bottom-right-radius: 0em;
        "
        :to="{ name: 'index' }"
      >
        <div class="font-berlin mx-3">Codia</div>
        <div
          style="height: 64px; width: 64px"
          class="bg-primary d-flex align-end justify-end pb-1 px-2"
        >
          <ui-svg name="logo" width="32" height="32" />
        </div>
      </nuxt-link>
    </v-app-bar-title>

    <v-btn
      variant="flat"
      href="tel:+221763813742"
      class="mr-5 mr-sm-16 font-berlin"
      rounded
    >
      <template #prepend>
        <ui-svg name="other/whatsapp" size="22" class="icon" />
      </template>
      <div style="line-height: 1">
        <div class="font-weight-bold">76 381 37 42</div>
        <div style="font-size: 12px">Appelez-nous</div>
      </div>
    </v-btn>
  </v-app-bar>
</template>
