<script lang="ts" setup>
import type { Sya } from "~/jsclient";
import type {
  IApplication,
  IApplicationStepComment,
  IScore,
} from "~/jsclient/interfaces";

import cActions from "../actions.vue";

const props = defineProps({
  step: { type: Object as PropType<IApplicationStepComment>, required: true },
  sya: { type: Object as PropType<Sya>, required: true },
  score: { type: Object as PropType<Partial<IScore>>, required: true },
  application: { type: Object as PropType<IApplication>, required: true },
  index: { type: Object as PropType<number>, required: true },
  gotoPrev: { type: Function as PropType<() => void>, required: true },
  cb: {
    type: Function as PropType<(v: string | string[]) => void>,
    required: true,
  },
});

const value = ref("");

onMounted(() => {
  if (props.score.steps && props.score.steps) {
    value.value = props.score.steps[props.index] || "";
  }
});

function toNext() {
  if (props.step.required && !value.value) return;
  props.cb(value.value);
}
</script>

<template>
  <div v-if="step">
    <v-textarea
      variant="solo"
      class="pa-2"
      flat
      hide-details
      v-model="value"
      :label="step.label"
    ></v-textarea>
    <c-actions
      :sya="sya"
      :application="application"
      :index="index"
      :disable-next="step.required && !value"
      :next="toNext"
      :prev="gotoPrev"
    />
  </div>
</template>
