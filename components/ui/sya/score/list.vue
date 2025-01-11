<script lang="ts" setup>
import type { IScoreSearchParams } from "~/jsclient/interfaces/score";

const props = defineProps({
  params: { type: Object as PropType<IScoreSearchParams>, default: {} },
});

const sya = useSya();
const localePath = useLocalePath();
const uParams = ref<IScoreSearchParams>({ ...props.params });
const pending = ref(false);

const { data: result, execute } = await useAsyncData(
  Math.random().toString(),
  async () => {
    try {
      pending.value = true;
      window.scrollTo({ top: 0, behavior: "smooth" });

      const r = sya.score.search({ ...uParams.value });
      return r;
    } finally {
      pending.value = false;
    }
  }
);

watch(
  () => uParams.value,
  () => execute(),
  { deep: true }
);
</script>

<template>
  <div v-if="pending" class="mb-3 d-flex align-center ga-2">
    <div class="skeleton rounded-pill" style="width: 100px; height: 32px"></div>
    <div class="skeleton ml-auto" style="width: 70px; height: 15px"></div>
  </div>

  <div v-else class="mb-3 d-flex align-center ga-2">
    <template v-if="result?.scores.length">
      <div class="text-body-2">
        {{ $t("components.sya.score.list.sort.title") }}
      </div>
      <v-menu location="bottom start" offset="5">
        <template v-slot:activator="{ props }">
          <v-btn
            color="dark"
            variant="text"
            class="border"
            dark
            rounded
            v-bind="props"
          >
            {{
              $t(
                `components.sya.score.list.sort.items.${
                  uParams.sort || "created_at"
                }`
              )
            }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in [
              {
                value: 'created_at',
                title: $t(
                  `components.sya.score.list.sort.items.${'created_at'}`
                ),
              },
              {
                value: 'from_score_max',
                title: $t(
                  `components.sya.score.list.sort.items.${'from_score_max'}`
                ),
              },
              {
                value: 'from_score_min',
                title: $t(
                  `components.sya.score.list.sort.items.${'from_score_min'}`
                ),
              },
            ]"
            :key="index"
            @click="uParams = { ...uParams, sort: item.value, page: 1 }"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <template v-if="result">
      <div class="ml-auto text-body-2">
        <span v-if="result.scores.length">
          {{
            $t("components.sya.score.list.resume.title", {
              from: result.fromto[0],
              to: result.fromto[1],
              total: result.total,
            })
          }}
        </span>
        <span v-else>
          {{ $t("components.sya.score.list.resume.empty") }}
        </span>
      </div>
    </template>
  </div>

  <template v-if="pending">
    <ui-sya-score-card-skelton v-for="i in 3" class="mb-3" />
  </template>

  <template v-else-if="result">
    <div
      v-if="!result?.scores?.length"
      class="text-center d-flex justify-center mt-16"
    >
      <i
        class="fi fi-ss-list-timeline"
        style="font-size: 102px; text-align: center; opacity: 0.2"
      ></i>
    </div>

    <NuxtLink
      v-for="score in result.scores"
      :key="score.id"
      :to="localePath({ name: 'score-id', params: { id: score.id } })"
      class="ui-sya-score-list-one rounded-lg"
    >
      <ui-sya-score-card class="mb-3" :score="score" />
    </NuxtLink>

    <v-pagination
      v-if="!pending && result?.scores?.length"
      :total-visible="5"
      :length="result.totalPages"
      v-model="uParams.page"
      rounded="circle"
      size="x-small"
      class="mt-3"
    >
      <template #item="{ props, page, key }">
        <v-btn
          v-bind="props"
          size="x-small"
          color="background"
          icon
          rounded
          :disabled="false"
          :border="typeof key === 'number'"
          :readonly="typeof key !== 'number'"
        >
          <span v-if="typeof key === 'number'">
            {{ page }}
          </span>
          <i v-else class="fi fi-bs-menu-dots"></i>
        </v-btn>
      </template>
    </v-pagination>
  </template>
</template>

<style lang="scss">
.ui-sya-score-list-one {
  display: block;
  color: rgba(var(--v-theme-on-background));

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
}
</style>
