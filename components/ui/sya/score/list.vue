<script lang="ts" setup>
import syaApplicationScoreRate from "~/jsclient/components/application/score/rate/index.vue";
import syaApplicationStepsDisplay from "~/jsclient/components/application/steps/display.vue";

const props = defineProps({
  params: { type: Object as PropType<{ [key: string]: any }>, required: true },
});

const localePath = useLocalePath();
const sya = useSya();

const {
  data: scores,
  status,
  error,
  refresh,
  clear,
} = await useAsyncData(async () => {
  return sya.score.list({ ...props.params, _pagination: { page: 1 } });
});
</script>

<template>
  <template v-if="scores">
    <ui-sya-score-display
      :score="score"
      class="mb-3"
      v-for="score in scores"
      :key="score.id"
    />
  </template>
</template>
