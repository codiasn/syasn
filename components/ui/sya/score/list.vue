<script lang="ts" setup>
const props = defineProps({
  params: { type: Object as PropType<{ [key: string]: any }>, required: true },
});

const sya = useSya();
const localePath = useLocalePath();

const { data: scores } = await useAsyncData(async () => {
  return sya.score.list({ ...props.params, _pagination: { page: 1 } });
});
</script>

<template>
  <template v-if="scores">
    <NuxtLink
      v-for="score in scores"
      :key="score.id"
      :to="localePath({ name: 'score-id', params: { id: score.id } })"
      class="ui-sya-score-list-one"
    >
      <ui-sya-score-card class="mb-3" :score="score" />
    </NuxtLink>
  </template>
</template>

<style lang="scss">
.ui-sya-score-list-one {
  display: block;
  color: rgba(var(--v-theme-on-background));

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
}
</style>
