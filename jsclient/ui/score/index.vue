div
<script lang="ts" setup>
import type { Sya } from "~/jsclient";
import type { IProduct, IScore } from "~/jsclient/interfaces";

import syaScoreRate from "./rate/edit.vue";
import syaScoreResponse from "./response/index.vue";

const props = defineProps({
  sya: { type: Object as PropType<Sya>, required: true },
  product: { type: Object as PropType<IProduct>, required: true },
  score: { type: Object as PropType<Partial<IScore>> },
  cb: { type: Object as PropType<(v: number) => void> },

  options: { type: Object, default: {} },
});

const uScore = ref<Partial<IScore>>({ ...(props.score || {}) });
const side = ref("rate");
const submitting = ref(false);

async function submit() {
  try {
    submitting.value = true;
    await props.sya.score.add(props.product.id, uScore.value);
    // side.value = "finish";
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="sya-score-editer position-relative">
    <syaScoreRate
      v-if="side === 'rate'"
      :options="options.rate"
      :score="uScore.score"
      :sya="sya"
      :cb="
        (v) => {
          uScore.score = v;
          side = 'steps';
        }
      "
    />

    <syaScoreResponse
      v-else-if="side === 'steps'"
      :sya="sya"
      :product="product"
      :score="uScore.score || 1"
      :onResponseChange="(v) => (uScore.responses = v)"
      :next="submit"
      :prev="
        (restart) => {
          side = 'rate';
          if (restart) uScore = {};
        }
      "
    />

    <div
      v-else-if="side === 'finish'"
      class="sya-score-editer--submitting w-100 h-100 position-absolute bg-background top-0 right-0 d-flex align-center justify-center"
    >
      <div class="sya-score-editer--container text-center">
        {{ product.message || sya.locale.product.message.success }}
      </div>
    </div>

    <div
      v-if="submitting"
      class="sya-score-editer--submitting w-100 h-100 position-absolute bg-background top-0 right-0 d-flex align-center justify-center"
    >
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
  </div>
</template>

<style lang="scss">
.sya-score-editer--main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .sya-score-editer--container {
    height: 90%;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
