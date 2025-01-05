<script lang="ts" setup>
import type { IApplication } from "~/jsclient/interfaces";

const props = defineProps({
  application: { type: Object as PropType<IApplication>, required: true },
  size: { type: String, default: "64px" },
});

const sya = useSya();
const localePath = useLocalePath();

const { data: stats } = await useAsyncData(async () => {
  return sya.application.stats(props.application.id);
});
</script>

<template>
  <div :style="{ width: size, height: size }">
    <img
      v-if="application.logo"
      itemprop="image"
      style="
        height: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
      "
      :src="application.logo.url"
      :alt="`${application.name} Logo`"
      :aria-label="`${application.metadata?.type || 'Product'} logo`"
    />
    <div
      v-else
      aria-hidden="true"
      style="
        width: 100%;
        height: 100%;
        background-color: rgba(var(--v-theme-on-background), 0.1);
        border-radius: 0.3em;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <ui-svg name="company" style="width: 50%; height: 50%" />
    </div>
  </div>
</template>
