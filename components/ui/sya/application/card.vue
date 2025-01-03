<script lang="ts" setup>
import type { IApplicationStats, IApplication } from "~/jsclient/interfaces";
import syaApplicationScoreRate from "~/jsclient/components/application/score/rate/index.vue";

const localePath = useLocalePath();
const props = defineProps({
  application: { type: Object as PropType<IApplication>, required: true },
});

const sya = useSya();
const stats = ref<IApplicationStats>();
const fetching = ref(true);

onMounted(async () => {
  try {
    fetching.value = true;

    const { stats: data } = await sya.application.stats(props.application.id);
    stats.value = data;
  } finally {
    fetching.value = false;
  }
});
</script>

<template>
  <nuxt-link
    class="ui-sya-application-card"
    itemscope
    itemtype="https://schema.org/Product"
    :to="localePath({ name: 'slug', params: { slug: application.slug } })"
  >
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

          <h3 class="text-h6" style="line-height: 1.1" itemprop="name">
            {{ application.name }}
          </h3>
          <p
            v-if="application.description"
            itemprop="description"
            aria-label="Product description"
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
            {{ application.description }}
          </p>
        </div>

        <div class="d-flex align-center ga-2">
          <div class="d-flex align-center">
            <v-badge
              location="bottom end"
              class="ui-sya-application-card-user-score"
            >
              <img
                src="https://i.pinimg.com/736x/19/bc/eb/19bceb7744f58732fdc9c8b784ea14bf.jpg"
                width="32"
                height="32"
                style="border-radius: 100%"
              />

              <template #badge>
                <syaApplicationScoreRate
                  only-actice-score
                  size="18px"
                  :application="application"
                  :score="{ score: 3 }"
                />
              </template>
            </v-badge>
          </div>
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
              :application="application"
              :score="{ score: stats?.average }"
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
                :content="(stats?.average || 0).toFixed(1)"
              />
              <meta
                itemprop="ratingCount"
                :content="(stats?.average || 0).toFixed(1)"
              />

              <div
                class="d-flex align-center"
                style="gap: 2px"
                v-if="stats?.total"
              >
                <span itemprop="ratingCount">
                  {{ (stats?.average || 0).toFixed(1) }}
                </span>
                <span>-</span>
                <span itemprop="ratingValue"> {{ stats?.total || 0 }}</span>
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
