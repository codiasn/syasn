<script lang="ts" setup>
import cHorrible from "./horrible.vue";
import cBad from "./bad.vue";
import cOkay from "./okay.vue";
import cGood from "./good.vue";
import cExcellent from "./excellent.vue";
import type { IApplication, IScore } from "~/jsclient/interfaces";

const props = defineProps({
  application: { type: Object as PropType<IApplication>, required: true },
  score: { type: Object as PropType<Partial<IScore>>, required: true },
  cb: { type: Object as PropType<(v: number) => void>, required: true },
});

const score = ref<number>();

const comps = computed(() => {
  return [
    { comp: cHorrible, score: 1 },
    { comp: cBad, score: 2 },
    { comp: cOkay, score: 3 },
    { comp: cGood, score: 4 },
    { comp: cExcellent, score: 5 },
  ];
});

onMounted(() => {
  if (props.score.score) score.value = props.score.score;
});

function setScore(value: number) {
  score.value = value;
  props.cb(score.value);
}
</script>

<template>
  <div
    class="sya-application-score-face"
    :class="{ selected: score !== undefined }"
    :style="{ '--size': '54px' }"
  >
    <component
      v-for="(comp, c) in comps"
      :key="c"
      :is="comp.comp"
      :class="{ selected: score === comp.score }"
      class="one"
      @click="setScore(comp.score)"
    />
  </div>
</template>

<style lang="scss">
.sya-application-score-face {
  width: max-content;
  display: flex;
  align-items: center;

  .one {
    width: var(--size);
    height: var(--size);
    cursor: pointer;
  }

  &.selected {
    .one:not(.selected):not(:hover) {
      filter: grayscale(100%);
    }
  }

  &:hover {
    .one {
      &:not(:hover) {
        filter: grayscale(100%);
      }
    }
  }
}
</style>
