<script lang="ts" setup>
import type { IProductAllData } from "~/jsclient/interfaces/product";

const localePath = useLocalePath();
const i18n = useI18n();
const sya = useSya();
const pending = ref(false);

async function fetcher() {
  pending.value = true;
  let data: IProductAllData | undefined = undefined;

  try {
    const product = useRoute().params.product as string;
    if (product?.length) {
      data = await sya.product.searchOne(`slug:${product}`);
    }
  } finally {
    pending.value = false;
  }

  if (!data) {
    showError({
      statusCode: 404,
      statusMessage: "product_not_found",
    });
  }

  return data;
}

const { data: product } = await useAsyncData(Math.random().toString(), fetcher);

//
</script>
<template>
  <template v-if="product">
    <v-container class="mt-5">
      <v-row justify="center">
        <v-col cols="12" sm="10">
          <div class="mb-7 px-5 d-flex ga-2">
            <ui-sya-product-logo :product="product" size="36px" />

            <div>
              <router-link
                class="mb-1 text-dark"
                style="font-size: 18px; line-height: 1.1; font-weight: normal"
                itemprop="name"
                :to="
                  localePath({
                    name: 'product-slug',
                    params: { slug: product.slug },
                  })
                "
              >
                {{ product.name }}
              </router-link>
              <ui-sya-product-aggregate-rating :id="product.id" show-resume>
                <template #default="{ product }">
                  <sya-score-rate :score="product.stats.average" size="18px" />
                </template>
              </ui-sya-product-aggregate-rating>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <SyaScore
      class="mt-16"
      :product="product"
      :sya="sya"
      :options="{ rate: { size: '64px' } }"
    />
  </template>
</template>

<style lang="scss">
.sya-score-editer--container {
  max-width: 442px !important;
}
</style>
