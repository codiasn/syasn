<script lang="ts" setup>
import type { IProductStatsObject } from "~/jsclient/interfaces";
import type { IProductAllData } from "~/jsclient/interfaces/product";

const props = defineProps({
  product: {
    type: Object as PropType<IProductAllData>,
    required: true,
  },
});

const localePath = useLocalePath();
const sya = useSya();
</script>

<template>
  <div
    class="ui-sya-product-page mt-5 position-relative"
    itemscope
    :itemtype="
      Utils.schemaOrg.getSchemaFromCode(product.metadata?.type) ||
      'http://schema.org/Product'
    "
  >
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="4">
          <div style="height: max-content; position: sticky; top: 50px">
            <div class="d-flex align-start ga-3">
              <ui-sya-product-logo :product="product" class="mb-2" />

              <div>
                <div
                  class="font-weight-bold mt-1"
                  style="line-height: 1.1"
                  itemprop="name"
                >
                  {{ product.name }}
                </div>
                <div class="mt-1">
                  <SyaScoreRate
                    :product="product"
                    :score="product.stats.average"
                    size="24px"
                  />
                  <ui-sya-product-aggregate-rating
                    :product="product"
                    show-resume
                  />
                </div>
              </div>
            </div>

            <v-btn
              v-if="product"
              color="black"
              variant="flat"
              class="my-3"
              size="small"
              :to="
                localePath({
                  name: 'score-add-product',
                  params: { product: product.slug },
                })
              "
            >
              <template #prepend>
                <i class="fi fi-sc-pencil" style="font-size: 14px"></i>
              </template>
              Ecrire un avis
            </v-btn>
            <ui-sya-product-description :product="product" />
          </div>
        </v-col>
        <v-col cols="12" sm="10" md="8">
          <ui-sya-score-list :params="{ product: product.id }" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
