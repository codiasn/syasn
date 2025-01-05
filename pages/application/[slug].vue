<script lang="ts" setup>
defineI18nRoute({
  paths: {
    fr: "/produit/[slug]",
    en: "/product/[slug]",
  },
});

const i18n = useI18n();
const sya = useSya();
const localePath = useLocalePath();

const { data: stats } = await useAsyncData(async () => {
  const slug = useRoute().params.slug as string;
  if (!slug?.length) return;
  return sya.application.stats(`slug:${slug}`);
});

if (!stats.value) {
  showError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

useSeoMeta({
  title: stats.value?.application.name,
  description: stats.value?.application.description,

  ogTitle: stats.value?.application.name,
  ogDescription: stats.value?.application.description,

  ogImage: stats.value?.application.logo?.url,
  ogImageAlt: `${stats.value?.application.name} - logo`,

  ogType: "website",

  ogLocaleAlternate: [
    ...i18n.localeCodes.value.filter((code) => code !== i18n.locale.value),
  ],
});
</script>

<template>
  <ui-sya-application-page v-if="stats" :stats="stats" />
</template>
