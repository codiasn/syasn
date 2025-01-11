<script lang="ts" setup>
import type { IProductAllData } from "~/jsclient/interfaces/product";

const props = defineProps({
  id: { type: String },
  showResume: { type: Boolean, default: false },
  product: {
    type: Object as PropType<IProductAllData | null | undefined>,
  },
});

const sya = useSya();
const { t } = useI18n();

const { data: product_ } = await useAsyncData(
  Math.random().toString(),
  async () => {
    if (props.product) return props.product;
    if (!props.id) return props.product;
    return await sya.product.searchOne(props.id);
  }
);
</script>

<template>
  <template v-if="product_">
    <span
      itemscope
      itemprop="aggregateRating"
      itemtype="http://schema.org/AggregateRating"
      style="display: none"
    >
      <meta :content="product_.stats.best.toString()" itemprop="bestRating" />
      <meta :content="product_.stats.worst.toString()" itemprop="worstRating" />
      <meta
        :content="product_.stats.average.toFixed(1)"
        itemprop="ratingValue"
      />
      <meta :content="product_.stats.total.toString()" itemprop="reviewCount" />
      <meta :content="product_.name" itemprop="itemReviewed" />
    </span>

    <slot :product="product_" />

    <div v-if="showResume" style="font-size: 12px">
      <div
        class="d-flex align-center"
        style="gap: 2px"
        v-if="product_.stats.total"
      >
        <span itemprop="ratingCount">
          {{ (product_.stats.average || 0).toFixed(1) }}
        </span>
        <span>-</span>
        <span itemprop="ratingValue"> {{ product_.stats.total || 0 }}</span>
        <span>
          {{ t("components.sya.product.aggregate-rating.reviews") }}
        </span>
      </div>
      <div v-else>
        {{ t("components.sya.product.aggregate-rating.noReviews") }}
      </div>
    </div>
  </template>
</template>
