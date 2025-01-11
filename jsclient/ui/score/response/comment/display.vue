<script lang="ts" setup>
import type { Sya } from "~/jsclient";

const props = defineProps({
  sya: { type: Object as PropType<Sya>, required: true },
  response: {
    type: Object as PropType<{ type: string; value: any }>,
    required: true,
  },
});
</script>

<template>
  {{ response.value }}
</template>
