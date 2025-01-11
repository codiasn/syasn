<script lang="ts" setup>
import type { IProduct } from "~/jsclient/interfaces";

const props = defineProps({
  product: { type: Object as PropType<IProduct>, required: true },
  size: { type: String, default: "64px" },
});

const sya = useSya();
const localePath = useLocalePath();

const { data: stats } = await useAsyncData(
  Math.random().toString(),
  async () => {
    return sya.product.stats(props.product.id);
  }
);
</script>

<template>
  <div :style="{ width: size, height: size }">
    <img
      v-if="product.logo"
      itemprop="image"
      style="
        height: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
      "
      :src="product.logo.url"
      :alt="`${product.name} Logo`"
      :aria-label="`${product.metadata?.type || 'Product'} logo`"
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
