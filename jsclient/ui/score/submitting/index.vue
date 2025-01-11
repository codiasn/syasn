<script lang="ts" setup>
import type { IProduct, IScore } from "~/jsclient/interfaces";
import type { Sya } from "~/jsclient";
import syaProductScore from "../index.vue";

const props = defineProps({
  sya: { type: Object as PropType<Sya>, required: true },
  // options: {
  //   type: Object as PropType<SyaProductComponentOptions>,
  //   required: true,
  // },
  score: { type: Object as PropType<Partial<IScore>>, required: true },
  product: { type: Object as PropType<IProduct>, required: true },
  restart: { type: Function as PropType<() => void>, required: true },
  finish: {
    type: Function as PropType<(score: IScore) => void>,
    required: true,
  },
  cb: {
    type: Function as PropType<(v: number) => void>,
    required: true,
  },
});

const submitting = ref(false);
const re = ref<string>();

async function submit() {
  try {
    submitting.value = true;
    const score = await props.sya.score.add(props.product.id, props.score);
    props.finish(score);
    re.value = "success";
  } catch (e) {
    re.value = "error";
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <!-- <div class="sya-product-submitting">
    <div
      v-if="!submitting && !re"
      class="pa-5 d-flex justify-center align-center flex-column ga-3"
    >
      <syaProductScore
        :sya="sya"
        :product="product"
        :score="score"
        :cb="(v) => cb(v)"
        style="pointer-events: none"
      />

      <v-btn class="restart-btn" rounded @click="submit()">
        {{ sya._locales[sya.lang].submit }}
      </v-btn>
    </div>
    <div v-if="submitting" class="sya-product-submitting--loader pa-5">
      <v-progress-linear
        indeterminate
        :height="6"
        rounded
        stream
      ></v-progress-linear>
    </div>

    <div
      v-else-if="re === 'success'"
      class="sya-product-submitting--success pa-5"
    >
      <div class="message">
        {{ sya._locales[sya.lang]["product.message.success"] }}
      </div>
    </div>

    <div
      v-else-if="re === 'error'"
      class="sya-product-submitting--error pa-5"
    >
      <div class="message">
        {{ sya._locales[sya.lang]["product.message.error"] }}
      </div>

      <div class="sya-btn-grp mt-3">
        <v-btn class="restart-btn" rounded @click="restart()">
          <template #prepend>
            <i class="fi fi-rs-rotate-right"></i>
          </template>
          {{ sya._locales[sya.lang]["tryAgain"] }}
        </v-btn>
      </div>
    </div>
  </div> -->
</template>
