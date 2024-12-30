<script lang="ts" setup>
import type { Sya } from "~/jsclient";
import type {
  IApplication,
  IApplicationStepChoice,
  IScore,
} from "~/jsclient/interfaces";
import cActions from "../actions.vue";

const props = defineProps({
  step: { type: Object as PropType<IApplicationStepChoice>, required: true },
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

const value = ref<string[]>([]);

onMounted(() => {
  setTimeout(() => {
    if (props.score.steps && props.score.steps) {
      value.value = [...(props.score.steps[props.index] || [])];
    }
  }, 100);
});

function toNext() {
  if (props.step.required && !value.value.length) return;
  if (props.step.multiple) props.cb(value.value);
  else props.cb(value.value[0]);
}
</script>

<template>
  <div v-if="step">
    <div class="py-5 px-2 d-flex flex-wrap ga-1">
      <v-chip
        v-for="option in step.options"
        @click="
          () => {
            if (value.includes(option)) {
              value = value.filter((v) => v !== option);
            } else {
              value.push(option);
            }
          }
        "
      >
        <template #prepend>
          <i
            v-if="!value.includes(option)"
            class="fi fi-rr-check-circle opacity-50"
          ></i>
          <i v-else class="fi fi-sr-check-circle text-black"></i>
        </template>
        <div class="ml-1">{{ option }}</div>
      </v-chip>
    </div>

    <c-actions
      :sya="sya"
      :application="application"
      :index="index"
      :disable-next="step.required && !value.length"
      :next="toNext"
      :prev="gotoPrev"
    />
  </div>
</template>
