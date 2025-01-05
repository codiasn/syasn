<script lang="ts" setup>
import type {
  IApplication,
  IApplicationStepChoice,
  IScore,
} from "~/jsclient/interfaces";
import type { Sya } from "~/jsclient";

import syaApplicationStepComment from "./comment/display.vue";

const props = defineProps({
  sya: { type: Object as PropType<Sya>, required: true },
  score: { type: Object as PropType<IScore>, required: true },
  response: {
    type: Object as PropType<{ type: string; value: any }>,
    required: true,
  },
});
</script>

<template>
  <syaApplicationStepComment
    v-if="response.type === 'comment'"
    :sya="sya"
    :score="score"
    :response="response"
  />
</template>
