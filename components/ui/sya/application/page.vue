<script lang="ts" setup>
import type { IApplicationStatsObject } from "~/jsclient/interfaces";
import syaApplicationScoreRate from "~/jsclient/components/application/score/rate/index.vue";

const props = defineProps({
  stats: { type: Object as PropType<IApplicationStatsObject>, required: true },
});

const localePath = useLocalePath();
const sya = useSya();
</script>

<template>
  <div
    class="ui-sya-application-page"
    itemscope
    :itemtype="`https://schema.org/${
      stats.application.metadata?.type || 'Product'
    }`"
  >
    <v-container>
      <v-row>
        <v-col cols="12" sm="8" md="6">
          <div class="d-flex align-start ga-3">
            <ui-sya-application-logo
              :application="stats.application"
              class="mb-2"
            />

            <div>
              <h1 class="text-h6" style="line-height: 1.1" itemprop="name">
                {{ stats.application.name }}
              </h1>
              <div class="mt-2">
                <syaApplicationScoreRate
                  :application="stats.application"
                  :score="{ score: stats.stats.average }"
                  size="32px"
                />
                <ui-sya-application-aggregate-rating
                  :id="stats.application.id"
                  :stats="stats"
                  show-resume
                />
              </div>
            </div>
          </div>
        </v-col>

        <v-col cols="12" v-if="stats.application.description">
          <p
            itemprop="description"
            :aria-label="`${
              stats.application.metadata?.type || 'Product'
            } description`"
          >
            {{ stats.application.description }}
          </p>
        </v-col>

        <v-col col="12">
          <ui-sya-score-list :params="{ application: stats.application.id }" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
