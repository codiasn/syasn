<script lang="ts" setup>
import type { Sya } from "../../..";
import syaScoreRate from "./index.vue";

const props = defineProps({
  sya: { type: Object as PropType<Sya>, required: true },
  score: { type: Number },
  cb: { type: Object as PropType<(v: number) => void> },
  options: { type: Object, default: {} },
  hideNextBtn: { type: Boolean, default: false },
});

const _score = ref(props.score);
</script>

<template>
  <div class="sya-score-editer--main">
    <div class="sya-score-editer--container">
      <syaScoreRate
        v-bind="options"
        :score="_score"
        :cb="
          (v) => {
            _score = v;
            if (hideNextBtn && cb) cb(_score);
          }
        "
        edit-mode
      />

      <div
        class="sya-score-edit-actions w-100 justify-center align-center d-flex"
      >
        <v-btn
          v-if="!hideNextBtn"
          :disabled="!_score"
          class="mt-10 mx-auto"
          color="#000"
          @click="
            () => {
              if (_score && cb) cb(_score);
            }
          "
        >
          {{ sya.locale.next }}
        </v-btn>
      </div>
    </div>
  </div>
</template>
