<script lang="ts" setup>
import type { Sya } from "~/jsclient";
import type { IApplication } from "~/jsclient/interfaces";

const emit = defineEmits<{ (event: "next" | "prev"): void }>();

const props = defineProps({
  sya: { type: Object as PropType<Sya>, required: true },
  application: { type: Object as PropType<IApplication>, required: true },
  index: { type: Number, required: true },
  disableNext: { Boolean, default: false },
  next: { type: Function as PropType<() => void>, required: true },
  prev: { type: Function as PropType<() => void>, required: true },
});
</script>

<template>
  <div class="d-flex align-center ga-1 px-3 pb-3">
    <v-btn v-if="index > 0" rounded @click="prev()">prevent</v-btn>
    <v-btn rounded :disabled="disableNext" @click="next()">
      {{
        application.steps!.length - 1 !== index
          ? sya._locales[sya.lang].next
          : sya._locales[sya.lang].submit
      }}
    </v-btn>
  </div>
</template>
