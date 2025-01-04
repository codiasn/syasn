<script lang="ts" setup>
const props = defineProps({
  params: { type: Object as PropType<{ [key: string]: any }>, required: true },
});

const { data, status, error, refresh, clear } = await useAsyncData(async () => {
  const slug = useRoute().params.slug as string[];
  if (!slug?.length) return;
  return sya.score.list(props.params);
});

const localePath = useLocalePath();
const sya = useSya();
</script>

<template>
  {{ data }}
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas molestiae
  itaque quae modi ratione earum, praesentium voluptatibus sit est inventore
  dignissimos consequatur repellendus quisquam reprehenderit minus iste
  recusandae dolore assumenda.
</template>
