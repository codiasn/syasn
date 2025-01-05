<script lang="ts" setup>
import syaApplicationScoreRate from "~/jsclient/components/application/score/rate/index.vue";
import syaApplicationStepsDisplay from "~/jsclient/components/application/steps/display.vue";
import type { IScore } from "~/jsclient/interfaces";

const props = defineProps({
  score: { type: Object as PropType<IScore>, required: true },
});

const sya = useSya();
</script>

<template>
  <div
    itemscope
    itemprop="review"
    itemtype="http://schema.org/Review"
    class="pa-5 border rounded-lg ui-sya-score-card"
  >
    <meta itemprop="datePublished" :content="score.createdAt.toString()" />
    <span itemscope itemprop="reviewRating" itemtype="http://schema.org/Rating">
      <meta :content="score.application.max.toString()" itemprop="bestRating" />
      <meta content="1" itemprop="worstRating" />
      <meta :content="score.score.toString()" itemprop="ratingValue" />
    </span>

    <div class="d-flex align-center ga-3">
      <img
        v-if="score.user?.photo"
        :src="score.user.photo.url"
        :alt="`${score.user.firstName} ${score.user.lastName} photo`"
        width="42"
        height="42"
        style="border-radius: 100%"
      />
      <div
        v-else
        aria-hidden="true"
        style="
          width: 42px;
          height: 42px;
          background-color: rgba(var(--v-theme-on-background), 0.2);
          border-radius: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        "
      >
        <ui-svg name="avatar" size="42" />
      </div>

      <div style="line-height: 1">
        <span v-if="score.user" itemprop="author">
          {{ `${score.user.firstName} ${score.user.lastName}` }}
        </span>
        <span v-else>anonyme</span>
        <div style="font-size: 12px; margin-top: 4px">
          {{ $dayjs(score.createdAt).format("DD MMM YYYY HH:mm") }}
        </div>
      </div>

      <div class="ml-auto"></div>
    </div>

    <div class="d-flex align-star ga-2 mt-5">
      <sya-application-score-rate
        :application="score.application"
        :score="score"
        size="24px"
      />
      <div class="d-flex align-center">
        {{ score.score }}
      </div>
    </div>

    <div class="mt-3" itemprop="reviewBody">
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
