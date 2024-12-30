<script lang="ts" setup>
import type {
  IApplicationStats,
  IApplication,
  IScore,
} from "~/jsclient/interfaces";

import syaApplicationScoreRate from "~/jsclient/components/application/score/rate/index.vue";
import syaApplicationScore from "~/jsclient/components/application/score/index.vue";
import syaApplicationStep from "~/jsclient/components/application/steps/index.vue";
import syaApplicationSubmitting from "~/jsclient/components/application/submitting/index.vue";

const props = defineProps({
  application: { type: Object as PropType<IApplication>, required: true },
});

const sya = useSya();
const stats = ref<IApplicationStats>();
const fetching = ref(true);

const score = ref<Partial<IScore>>({});
const openModal = ref(false);
const side = ref<"steps" | "submitting">();

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
  <div
    style="
      border-radius: 1.5em;
      border-radius: 0.5em;
      border: 1px solid rgba(var(--v-theme-on-background), 0.04);
      box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
      height: calc(100% - 0px);
      width: 100%;
    "
  >
    <div
      style="
        height: calc(100% - 10px);
        margin: 5px;
        /* border: 1px solid rgba(var(--v-theme-on-background), 0.03); */
        /* box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset; */
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
        <div class="mt-">
          <div class="mb-2">
            <img
              v-if="application.logo"
              :src="application.logo.url"
              style="height: 64px"
            />
            <div
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

          <h2 class="text-h6" style="line-height: 1.1">
            {{ application.name }}
          </h2>

          <p
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
            v-if="application.description"
          >
            {{ application.description }}
          </p>
        </div>

        <div class="d-flex align-center ga-2">
          <div class="d-flex align-center">
            <v-badge
              location="bottom end"
              class="ui-sya-application-user-score"
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

      <!-- <div
        class="px-2 text-body-2"
        style="
          background: linear-gradient(
            90deg,
            rgba(var(--v-theme-primary), 1) 0%,
            rgba(0, 212, 255, 0) 70%
          );
        "
      >
        Donnez une note
      </div> -->
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
            >
              <div
                class="d-flex align-center"
                style="gap: 2px"
                v-if="stats?.total"
              >
                <span>{{ (stats?.average || 0).toFixed(1) }}</span>
                <span>/</span>
                <span> {{ stats?.total || 0 }}</span>
                <span>avis</span>
              </div>
              <div v-else>aucun avis</div>
            </div>
          </div>
          <!-- <syaApplicationScore
            :sya="sya"
            :application="application"
            :score="score"
            :cb="
              (v) => {
                score.score = v;
                openModal = true;
                side = 'steps';
              }
            "
          /> -->
        </div>
      </div>
    </div>

    <v-bottom-sheet v-model="openModal" width="562">
      <v-card>
        <syaApplicationStep
          v-if="side === 'steps'"
          :sya="sya"
          :application="application"
          :score="score"
          :index="0"
          :restart="() => (openModal = false)"
          :finish="
            () => {
              side = 'submitting';
            }
          "
          :cb="(v) => (score.steps = v)"
        />

        <syaApplicationSubmitting
          v-if="side === 'submitting'"
          :sya="sya"
          :application="application"
          :score="score"
          :index="0"
          :restart="() => (openModal = false)"
          :finish="
            () => {
              score = {};
            }
          "
          :cb="(v) => (score.score = v)"
        />
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<style lang="scss">
.ui-sya-application-user-score {
  .v-badge__badge {
    background-color: transparent;
    padding: 0;
  }
}
</style>
