<script lang="ts" setup>
const i18n = useI18n();
const sya = useSya();
const localePath = useLocalePath();
const pending = ref(false);

const { data: score } = await useAsyncData(
  Math.random().toString(),
  async () => {
    pending.value = true;
    try {
      const id = useRoute().params.id as string;
      if (!id?.length) return;
      return sya.score.get(id);
    } finally {
      pending.value = false;
    }
  }
);

if (!score.value) {
  showError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

useSeoMeta({
  title: score.value?.product.name,
  description: score.value?.product.description,

  ogTitle: score.value?.product.name,
  ogDescription: score.value?.product.description,

  ogImage: score.value?.product.logo?.url,
  ogImageAlt: `${score.value?.product.name} - logo`,

  ogType: "website",

  ogLocaleAlternate: [
    ...i18n.localeCodes.value.filter((code) => code !== i18n.locale.value),
  ],
});
</script>

<template>
  <v-app>
    <v-main>
      <template v-if="pending">
        <v-container>
          <v-row>
            <v-col cols="12" sm="10">
              <div class="px-5">
                <ui-sya-product-card-skelton
                  class="border-0"
                  style="padding: 0 !important"
                  hide-description
                />
              </div>

              <ui-sya-score-card-skelton class="mt-5" />
            </v-col>
          </v-row>
        </v-container>
      </template>
      <ui-sya-score-page v-else-if="score" class="mb-3" :score="score" />
    </v-main>
  </v-app>
</template>
