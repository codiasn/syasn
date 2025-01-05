<script lang="ts" setup>
import type { IApplicationStatsObject } from "~/jsclient/interfaces";

const props = defineProps({
  id: { type: String, required: true },
  showResume: { type: Boolean, default: false },
  stats: {
    type: Object as PropType<IApplicationStatsObject | null | undefined>,
  },
});

const sya = useSya();
const { t } = useI18n({ useScope: "local" });

const { data } = await useAsyncData(async () => {
  if (props.stats) return props.stats;
  return sya.application.stats(props.id);
});
</script>

<template>
  <template v-if="data">
    <span
      itemscope
      itemprop="aggregateRating"
      itemtype="http://schema.org/AggregateRating"
      style="display: none"
    >
      <meta :content="data.stats.best.toString()" itemprop="bestRating" />
      <meta :content="data.stats.worst.toString()" itemprop="worstRating" />
      <meta :content="data.stats.average.toFixed(1)" itemprop="ratingValue" />
      <meta :content="data.stats.total.toString()" itemprop="reviewCount" />
      <meta :content="data.application.name" itemprop="itemReviewed" />
    </span>

    <slot :stats="data" />

    <div v-if="showResume" style="font-size: 12px">
      <div class="d-flex align-center" style="gap: 2px" v-if="data.stats.total">
        <span itemprop="ratingCount">
          {{ (data.stats.average || 0).toFixed(1) }}
        </span>
        <span>-</span>
        <span itemprop="ratingValue"> {{ data.stats.total || 0 }}</span>
        <span>{{ t("reviews") }}</span>
      </div>
      <div v-else>{{ t("noReviews") }}</div>
    </div>
  </template>
</template>

<i18n src="./aggregate-rating.json"></i18n>
