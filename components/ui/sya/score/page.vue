<script lang="ts" setup>
import type { IScore } from "~/jsclient/interfaces";

const props = defineProps({
  score: { type: Object as PropType<IScore>, required: true },
});
const localePath = useLocalePath();
</script>

<template>
  <div
    class="ui-sya-score-page"
    itemscope
    :itemtype="`https://schema.org/${
      score.product.metadata?.type || 'Product'
    }`"
  >
    <v-container class="mt-5">
      <v-row justify="center">
        <v-col cols="12" sm="10">
          <div class="mb-7 px-5 d-flex ga-2">
            <ui-sya-product-logo :product="score.product" size="36px" />

            <div>
              <router-link
                class="mb-1 ui-sya-score-page--title"
                style="font-size: 18px; line-height: 1.1; font-weight: normal"
                itemprop="name"
                :to="
                  localePath({
                    name: 'product-slug',
                    params: { slug: score.product.slug },
                  })
                "
              >
                {{ score.product.name }}
              </router-link>
              <ui-sya-product-aggregate-rating
                :id="score.product.id"
                show-resume
              >
                <template #default="{ product }">
                  <syaScoreRate :score="product.stats.average" size="18px" />
                </template>
              </ui-sya-product-aggregate-rating>
            </div>
          </div>

          <ui-sya-score-card :score="score" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss">
.ui-sya-score-page {
  .ui-sya-score-page--title {
    color: rgba(var(--v-theme-on-background));

    &:hover {
      color: rgba(var(--v-theme-primary));
    }
  }
}
</style>
