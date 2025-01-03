<script lang="ts" setup>
const sya = useSya();
const { data, status, error, refresh, clear } = await useAsyncData(async () => {
  const slug = useRoute().params.slug as string[];
  if (!slug?.length) return;
  return sya.application.stats(`slug:${slug}`);
});

if (data.value) {
  console.log("***");
  //   console.log(
  //     defineProduct({
  //       title: data.value.application.name,
  //       description: data.value.application.description,
  //     })
  //   );
  //   useSchemaOrg([
  //     {
  //       title: data.value.application.name,
  //       description: data.value.application.description,
  //       _resolver: "product",
  //     },
  //   ]);
}
</script>

<template>
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam, asperiores
  fugit! Ut nostrum eum, nam facilis totam architecto iure esse ullam assumenda
  ratione dolores natus sit quo debitis dignissimos eius!
</template>
