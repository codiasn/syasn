<script lang="ts" setup>
import type { Sya } from "~/jsclient";
import type { IProduct, IProductStepComment } from "~/jsclient/interfaces";

import cActions from "../actions.vue";

const props = defineProps({
  sya: { type: Object as PropType<Sya>, required: true },
  product: { type: Object as PropType<IProduct>, required: true },
  index: { type: Object as PropType<number>, required: true },
  score: { type: Number, required: true },
  responses: { type: Object as PropType<{ [key: string]: any }>, default: {} },
  next: {
    type: Function as PropType<
      (v?: { type: "comment"; value: string }) => void
    >,
    required: true,
  },
  prev: { type: Function as PropType<() => void>, required: true },
});

const value = ref("");
const step = computed(() => {
  return props.product.steps![props.index] as IProductStepComment;
});

onMounted(() => {
  if (props.responses) {
    value.value = props.responses[props.index] || "";
  }
});

function toNext() {
  if (step.value.required && !value.value) return;
  props.next({ type: "comment", value: value.value });
}
</script>

<template>
  <div v-if="step" class="sya-score-editer--main">
    <div class="sya-score-editer--container">
      <div class="w-100">
        <v-textarea
          flat
          variant="outlined"
          class="sya-response-comment-textarea"
          hide-details
          v-model="value"
          :label="step.label"
        >
        </v-textarea>

        <c-actions
          :sya="sya"
          :product="product"
          :index="index"
          :disable-next="step.required && !value"
          :next="toNext"
          :prev="prev"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.sya-response-comment-textarea {
  .v-field {
    // background: rgb(var(--v-theme-surface))
    // background-color: rgba(var(--v-theme-on-background));

    .v-field__overlay {
      background-color: currentColor !important;
      opacity: 0.04;
      transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    &.v-field--focused .v-field__overlay {
      opacity: calc(
        (0.04 + var(--v-focus-opacity)) * var(--v-theme-overlay-multiplier)
      );
    }

    .v-field__outline {
      --v-field-border-opacity: 0.2;
    }

    .v-field__outline,
    &.v-field--focused .v-field__outline {
      --v-field-border-width: 3px;
    }
  }
}
</style>
