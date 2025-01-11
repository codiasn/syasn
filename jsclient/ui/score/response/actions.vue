<script lang="ts" setup>
import type { Sya } from "~/jsclient";
import type { IProduct } from "~/jsclient/interfaces";

const emit = defineEmits<{ (event: "next" | "prev"): void }>();

const props = defineProps({
  sya: { type: Object as PropType<Sya>, required: true },
  product: { type: Object as PropType<IProduct>, required: true },
  index: { type: Number, required: true },
  disableNext: { Boolean, default: false },
  next: { type: Function as PropType<() => void>, required: true },
  prev: { type: Function as PropType<() => void>, required: true },
});
</script>

<template>
  <div
    class="sya-score-edit-actions d-flex align-center justify-center mt-5 ga-1 px-3 pb-3"
  >
    <v-btn @click="prev()" color="#000">prevent</v-btn>
    <v-btn :disabled="disableNext" @click="next()" color="#000">
      {{
        product.steps!.length - 1 !== index
          ? sya.locale.next
          : sya.locale.submit
      }}
    </v-btn>
  </div>
</template>
