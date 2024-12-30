<script lang="ts" setup>
import type { Sya } from "~/jsclient";
import type { IApplication, IScore } from "~/jsclient/interfaces";

import syaApplicationScoreRate from "./rate/index.vue";

const props = defineProps({
  sya: { type: Object as PropType<Sya>, required: true },
  application: { type: Object as PropType<IApplication>, required: true },
  score: { type: Object as PropType<Partial<IScore>>, required: true },
  cb: { type: Object as PropType<(v: number) => void>, required: true },
});
</script>

<template>
  <syaApplicationScoreRate :application="application" :score="score" :cb="cb" />
</template>
