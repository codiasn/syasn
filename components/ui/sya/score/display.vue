<script lang="ts" setup>
import syaApplicationScoreRate from "~/jsclient/components/application/score/rate/index.vue";
import syaApplicationStepsDisplay from "~/jsclient/components/application/steps/display.vue";
import type { IScore } from "~/jsclient/interfaces";

const props = defineProps({
  score: { type: Object as PropType<IScore>, required: true },
});

const localePath = useLocalePath();
const sya = useSya();
</script>

<template>
  <div class="pa-5 border rounded-lg">
    <div class="d-flex align-center">
      <img
        src="https://i.pinimg.com/736x/19/bc/eb/19bceb7744f58732fdc9c8b784ea14bf.jpg"
        width="42"
        height="42"
        style="border-radius: 100%"
      />

      <div class="ml-auto" style="font-size: 12px">
        {{ $dayjs(score.createdAt).format("DD MMM YYYY HH:mm") }}
      </div>
    </div>

    <div class="d-flex align-star ga-2 mt-3">
      <sya-application-score-rate
        :application="score.application"
        :score="score"
        size="24px"
      />
      <div class="d-flex align-center">
        {{ score.score }}
      </div>
    </div>

    <div class="mt-3">
      <template v-for="response in score.responses">
        <syaApplicationStepsDisplay
          :score="score"
          :sya="sya"
          :response="response"
        />
      </template>
    </div>
  </div>
</template>
