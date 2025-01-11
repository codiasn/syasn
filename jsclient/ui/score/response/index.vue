<script lang="ts" setup>
import type { IProduct, IProductStepComment } from "../../../interfaces";
import type { Sya } from "../../..";

import syaScoreResponseComment from "./comment/index.vue";

const props = defineProps({
  sya: { type: Object as PropType<Sya>, required: true },
  product: { type: Object as PropType<IProduct>, required: true },
  responses: { type: Object as PropType<{ [key: string]: any }>, default: {} },
  score: { type: Number, required: true },

  onResponseChange: {
    type: Function as PropType<(v: { [x: string]: any }) => void>,
    required: true,
  },

  next: { type: Function as PropType<() => void>, required: true },
  prev: {
    type: Function as PropType<(restart?: boolean) => void>,
    required: true,
  },
});

const index = ref(0);
const code = ref<string>();
const step = ref<IProductStepComment>();
const _options = ref({} as any);

const steps = computed(() => {
  const steps = [...(props.product.steps || [])];
  return steps.filter((step) => ["comment"].includes(step.code));
});

onMounted(() => {
  // enlever les étape non prise en compte
  buildStep();
});
function buildStep(sens: 0 | 1 | -1 = 0) {
  step.value = undefined;
  index.value += sens;

  setTimeout(() => {
    step.value = steps.value[index.value] as any as IProductStepComment;

    function conditionalLog() {
      if (!step.value!.condition) return true;

      let conditionMet = false;
      const match = step.value!.condition!.match(/(score\()([><=]+)(\d+)(\))/);

      if (match) {
        const operator = match[2];
        const number = parseInt(match[3], 10);
        const value = props.score || 1;

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

    _options.value = {
      key: `${step.value.code}-${index.value}`,
      sya: props.sya,
      product: props.product,
      index: index.value,
      score: props.score,

      next: callCb,
      prev: gotoPrev,
    };
  }, 200);
}

function gotoPrev() {
  if (index.value !== 0) {
    step.value = undefined;
    buildStep(-1);
  } else props.prev();
}

function finish() {
  if (index.value === steps.value.length - 1) {
    props.next();
  } else {
    buildStep(1);
  }
}

function callCb(v: any) {
  const vals = { ...props.responses };
  vals[index.value] = v;
  if (vals[index.value] === undefined) delete vals[index.value];

  props.onResponseChange(vals);
  finish();
}
</script>

<template>
  <template v-if="step">
    <syaScoreResponseComment
      v-if="step?.code === 'comment'"
      v-bind="_options"
    />
  </template>
</template>
