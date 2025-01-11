<script lang="ts" setup>
import type { IProduct } from "~/jsclient/interfaces";

const props = defineProps({
  product: { type: Object as PropType<IProduct>, required: true },
  maxLine: { type: Number, default: 3 },
});
</script>

<template>
  <p
    v-if="product.description"
    ref="text"
    itemprop="description"
    :aria-label="`description`"
    style="
      /* display: -webkit-box;
      -webkit-line-clamp: 5;
      line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.2; */
    "
  >
    {{ product.description }}
  </p>
</template>
