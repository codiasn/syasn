<script lang="ts" setup>
defineI18nRoute({
  paths: {
    fr: "/avis/[id]",
    en: "/review/[id]",
  },
});

const i18n = useI18n();
const sya = useSya();
const localePath = useLocalePath();

const { data: score } = await useAsyncData(async () => {
  const id = useRoute().params.id as string;
  if (!id?.length) return;
  return sya.score.get(id);
});

if (!score.value) {
  showError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

useSeoMeta({
  title: score.value?.application.name,
  description: score.value?.application.description,

  ogTitle: score.value?.application.name,
  ogDescription: score.value?.application.description,

  ogImage: score.value?.application.logo?.url,
  ogImageAlt: `${score.value?.application.name} - logo`,

  ogType: "website",

  ogLocaleAlternate: [
    ...i18n.localeCodes.value.filter((code) => code !== i18n.locale.value),
  ],
});
</script>

<template>
  <ui-sya-score-page v-if="score" class="mb-3" :score="score" />
</template>
