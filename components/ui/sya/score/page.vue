<script lang="ts" setup>
import type { IScore } from "~/jsclient/interfaces";
import syaApplicationScoreRate from "~/jsclient/components/application/score/rate/index.vue";

const props = defineProps({
  score: { type: Object as PropType<IScore>, required: true },
});
</script>

<template>
  <div
    itemscope
    :itemtype="`https://schema.org/${
      score.application.metadata?.type || 'Product'
    }`"
  >
    <v-container>
      <div class="mb-7 d-flex ga-2">
        <ui-sya-application-logo :application="score.application" size="36px" />

        <div>
          <h1
            class="mb-1"
            style="font-size: 18px; line-height: 1.1; font-weight: normal"
            itemprop="name"
          >
            {{ score.application.name }}
          </h1>
          <ui-sya-application-aggregate-rating
            :id="score.application.id"
            show-resume
          >
            <template #default="{ stats }">
              <syaApplicationScoreRate
                :application="stats.application"
                :score="{ score: stats.stats.average }"
                size="18px"
              />
            </template>
          </ui-sya-application-aggregate-rating>
        </div>
      </div>

      <ui-sya-score-card :score="score" />
    </v-container>
  </div>
</template>
