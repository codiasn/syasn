<script lang="ts" setup>
import type { IScore } from "~/jsclient/interfaces";
import type { Sya } from "~/jsclient";

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
  {{ response.value }}
</template>
