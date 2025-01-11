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
    const slug = useRoute().params.slug as string;
    if (slug?.length) {
      data = await sya.product.searchOne(`slug:${slug}`);
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

useSeoMeta({
  title: product.value?.name,
  description: product.value?.description,

  ogTitle: product.value?.name,
  ogDescription: product.value?.description,

  ogImage: product.value?.logo?.url,
  ogImageAlt: `${product.value?.name} - logo`,

  ogType: "website",

  ogLocaleAlternate: [
    ...i18n.localeCodes.value.filter((code) => code !== i18n.locale.value),
  ],
});
</script>

<template>
  <v-app>
    <!-- <ui-header> </ui-header> -->

    <v-main>
      <template v-if="pending">
        <v-container>
          <v-row>
            <v-col cols="12" sm="10" md="4">
              <ui-sya-product-card-skelton
                class="border-0"
                style="padding: 0 !important"
              />
            </v-col>

            <v-col cols="12" sm="10" md="8">
              <div class="mb-3 d-flex align-center ga-2">
                <div
                  class="skeleton rounded-pill"
                  style="width: 100px; height: 32px"
                ></div>
                <div
                  class="skeleton ml-auto"
                  style="width: 70px; height: 15px"
                ></div>
              </div>

              <ui-sya-score-card-skelton v-for="i in 3" class="mb-3" />
            </v-col>
          </v-row>
        </v-container>
      </template>
      <ui-sya-product-page v-else-if="product" :product="product" />
    </v-main>
  </v-app>
</template>
