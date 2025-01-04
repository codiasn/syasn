<script lang="ts" setup>
import type { IApplicationStats, IApplication } from "~/jsclient/interfaces";
import syaApplicationScoreRate from "~/jsclient/components/application/score/rate/index.vue";

const props = defineProps({
  application: { type: Object as PropType<IApplication>, required: true },
  stats: { type: Object as PropType<IApplicationStats>, required: true },
});

const localePath = useLocalePath();
const sya = useSya();
</script>

<template>
  <div
    class="ui-sya-application-page"
    itemscope
    itemtype="https://schema.org/Product"
  >
    <v-container>
      <v-row>
        <v-col cols="12" sm="8" md="6">
          <div class="mb-2">
            <img
              v-if="application.logo"
              :src="application.logo.url"
              :alt="`${application.name} Logo`"
              aria-label="Product logo"
              style="height: 64px"
            />
            <div
              v-else
              aria-hidden="true"
              style="
                width: 64px;
                height: 64px;
                background-color: rgba(var(--v-theme-on-background), 0.03);
                border-radius: 0.3em;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <ui-svg name="company" size="32" class="opacity-30" />
            </div>
          </div>

          <h1 class="text-h6 mt-1" style="line-height: 1.1" itemprop="name">
            {{ application.name }}
          </h1>

          <div style="width: max-content" class="mt-2">
            <syaApplicationScoreRate
              :application="application"
              :score="{ score: stats.average }"
            />
            <div
              style="
                height: 17px;
                margin-top: 2px;
                margin-left: 3px;
                font-size: 12px;
              "
              itemscope
              itemprop="aggregateRating"
              itemtype="https://schema.org/AggregateRating"
            >
              <meta
                itemprop="ratingValue"
                :content="(stats.average || 0).toFixed(1)"
              />
              <meta
                itemprop="ratingCount"
                :content="(stats.average || 0).toFixed(1)"
              />

              <div
                class="d-flex align-center"
                style="gap: 2px"
                v-if="stats.total"
              >
                <span itemprop="ratingCount">
                  {{ (stats.average || 0).toFixed(1) }}
                </span>
                <span>-</span>
                <span itemprop="ratingValue"> {{ stats.total || 0 }}</span>
                <span>avis</span>
              </div>
              <div v-else>aucun avis</div>
            </div>
          </div>
        </v-col>

        <v-col cols="12" v-if="application.description">
          <p itemprop="description" aria-label="Product description">
            {{ application.description }}
          </p>
        </v-col>

        <v-col col="12">
          <ui-sya-score-list :params="{ application: application.id }" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
