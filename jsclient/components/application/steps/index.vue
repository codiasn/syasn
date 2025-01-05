<script lang="ts" setup>
import type {
  IApplication,
  IApplicationStepChoice,
  IScore,
} from "~/jsclient/interfaces";
import type { Sya } from "~/jsclient";

import syaApplicationStepComment from "./comment/index.vue";
import syaApplicationStepChoice from "./choice/index.vue";

const props = defineProps({
  sya: { type: Object as PropType<Sya>, required: true },
  score: { type: Object as PropType<Partial<IScore>>, required: true },
  application: { type: Object as PropType<IApplication>, required: true },
  cb: {
    type: Function as PropType<(v: { [x: string]: any }) => void>,
    required: true,
  },
  restart: { type: Function as PropType<() => void>, required: true },
  finish: { type: Function as PropType<() => void>, required: true },
});

const index = ref(0);
const step = ref<IApplicationStepChoice>();

onMounted(() => buildStep());
function buildStep(sens: 0 | 1 | -1 = 0) {
  step.value = undefined;
  index.value += sens;

  setTimeout(() => {
    step.value = props.application.steps![
      index.value
    ] as IApplicationStepChoice;

    function conditionalLog() {
      if (!step.value!.condition) return true;

      let conditionMet = false;
      const match = step.value!.condition!.match(/(score\()([><=]+)(\d+)(\))/);

      if (match) {
        const operator = match[2];
        const number = parseInt(match[3], 10);
        const value = props.score.score || 1;

        switch (operator) {
          case ">":
            conditionMet = value > number;
            break;
          case "<":
            conditionMet = value < number;
            break;
          case ">=":
            conditionMet = value >= number;
            break;
          case "<=":
            conditionMet = value <= number;
            break;
          case "==":
            conditionMet = value === number;
            break;
          case "!=":
            conditionMet = value !== number;
            break;
          default:
            throw "invalid_condition";
        }
      } else {
        throw "invalid_condition";
      }

      return conditionMet;
    }

    if (!conditionalLog()) return finish();
  }, 200);
}

function gotoPrev() {
  if (index.value !== 0) {
    step.value = undefined;
    buildStep(-1);
  } else props.restart();
}

function finish() {
  if (index.value === props.application.steps!.length - 1) {
    props.finish();
  } else {
    buildStep(1);
  }
}

function callCb(v: any) {
  const vals = { ...(props.score.steps || {}) };
  vals[index.value] = v;
  if (vals[index.value] === undefined) {
    delete vals[index.value];
  }

  props.cb(vals);
  finish();
}
</script>

<template>
  <template v-if="step">
    <syaApplicationStepChoice
      v-if="step.code === 'choice'"
      :step="step"
      :key="index + 'choice'"
      :sya="sya"
      :application="application"
      :score="score"
      :index="index"
      :goto-prev="gotoPrev"
      :cb="callCb"
    />
    <syaApplicationStepComment
      v-else-if="step.code === 'comment'"
      :step="(step as any)"
      :key="index + 'comment'"
      :sya="sya"
      :application="application"
      :score="score"
      :index="index"
      :goto-prev="gotoPrev"
      :cb="callCb"
    />

    <!-- <component
      :step="step"
      :key="index + step.code"
      :is="
        step.code === 'choice'
          ? syaApplicationStepChoice
          : syaApplicationStepComment
      "
      :sya="sya"
      :application="application"
      :score="score"
      :index="index"
      :goto-prev="gotoPrev"
      :cb="callCb"
    /> -->
  </template>
</template>
