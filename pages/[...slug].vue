<script lang="ts" setup>
const i18n = useI18n();
const sya = useSya();
const localePath = useLocalePath();

const { data, status, error, refresh, clear } = await useAsyncData(async () => {
  const slug = useRoute().params.slug as string[];
  if (!slug?.length) return;
  return sya.application.stats(`slug:${slug}`);
});

if (!data.value) {
  showError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

useSeoMeta({
  title: data.value?.application.name,
  description: data.value?.application.description,

  ogTitle: data.value?.application.name,
  ogDescription: data.value?.application.description,

  ogImage: data.value?.application.logo?.url,
  ogImageAlt: `${data.value?.application.name} - logo`,

  ogType: "website",

  ogLocaleAlternate: [
    ...i18n.localeCodes.value.filter((code) => code !== i18n.locale.value),
  ],
});
</script>

<template>
  <ui-sya-application-page
    v-if="data"
    :application="data.application"
    :stats="data.stats"
  />
</template>
