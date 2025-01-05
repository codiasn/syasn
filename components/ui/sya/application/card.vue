<script lang="ts" setup>
import type { IApplicationStatsObject } from "~/jsclient/interfaces";
import syaApplicationScoreRate from "~/jsclient/components/application/score/rate/index.vue";

const props = defineProps({
  stats: { type: Object as PropType<IApplicationStatsObject>, required: true },
});

const sya = useSya();
const localePath = useLocalePath();
</script>

<template>
  <nuxt-link
    class="ui-sya-application-card"
    itemscope
    :itemtype="`https://schema.org/${
      stats.application.metadata?.type || 'Product'
    }`"
    :to="
      localePath({
        name: 'application-slug',
        params: { slug: stats.application.slug },
      })
    "
  >
    <ui-sya-application-aggregate-rating
      :id="stats.application.id"
      :stats="stats"
    />

    <div
      style="
        height: calc(100% - 10px);
        margin: 5px;
        backdrop-filter: blur(0.9rem);
        border-radius: 0.3em;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      "
    >
      <div
        class="pa-5 w-100"
        style="
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-radius: 0.9em;
          height: 100%;
        "
      >
        <div>
          <div class="d-flex">
            <ui-sya-application-logo
              :application="stats.application"
              class="mb-2"
            />

            <v-badge
              location="bottom end"
              class="ui-sya-application-card-user-score ml-auto mt-2"
            >
              <img
                src="https://i.pinimg.com/originals/86/d6/d1/86d6d11ac34ed85df4af65ecd1463355.jpg"
                width="32"
                height="32"
                style="border-radius: 100%; object-fit: cover"
              />

              <template #badge>
                <syaApplicationScoreRate
                  only-actice-score
                  size="18px"
                  :application="stats.application"
                  :score="{ score: 3 }"
                />
              </template>
            </v-badge>
          </div>

          <h3 class="text-h6" style="line-height: 1.1" itemprop="name">
            {{ stats.application.name }}
          </h3>

          <p
            v-if="stats.application.description"
            itemprop="description"
            :aria-label="`${
              stats.application.metadata?.type || 'Product'
            } description`"
            class="mt-2"
            style="
              display: -webkit-box;
              -webkit-line-clamp: 5;
              line-clamp: 5;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 1.1;
              font-size: 14px;
            "
          >
            {{ stats.application.description }}
          </p>
        </div>
      </div>

      <div class="w-100">
        <div
          class="d-flex align-center justify-center mt-auto"
          style="
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
            height: 82px;
          "
        >
          <div style="width: max-content; margin: auto">
            <syaApplicationScoreRate
              v-if="stats"
              :application="stats.application"
              :score="{ score: stats.stats?.average }"
            />
            <div
              style="
                height: 17px;
                margin-top: 2px;
                margin-left: 3px;
                font-size: 12px;
              "
            >
              <div
                class="d-flex align-center"
                style="gap: 2px"
                v-if="stats?.stats.total"
              >
                <span itemprop="ratingCount">
                  {{ (stats?.stats.average || 0).toFixed(1) }}
                </span>
                <span>-</span>
                <span itemprop="ratingValue">
                  {{ stats?.stats.total || 0 }}
                </span>
                <span>avis</span>
              </div>
              <div v-else>aucun avis</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<style lang="scss">
.ui-sya-application-card {
  border-radius: 0.5em;
  border: 1px solid rgba(var(--v-theme-on-background), 0.04);
  box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  height: calc(100% - 0px);
  width: 100%;
  cursor: pointer;
  display: block;
  color: rgba(var(--v-theme-on-background));

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .ui-sya-application-card-user-score {
    .v-badge__badge {
      background-color: transparent;
      padding: 0;
    }
  }
}
</style>
