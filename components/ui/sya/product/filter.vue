<script lang="ts" setup>
import type {
  IProductSearchParams,
  IProductType,
} from "~/jsclient/interfaces/product";

const props = defineProps({
  typeCode: { type: String as PropType<IProductType> },
});

const emit = defineEmits<{
  (e: "submit", v: IProductSearchParams): void;
}>();

const i18n = useI18n();

const sortKeys = ref([
  {
    title: i18n.t("product.sort.values.best_rated"),
    value: "best_rated",
    icon: "medal",
  },
  {
    title: i18n.t("product.sort.values.highest_rated"),
    value: "highest_rated",
    icon: "line-up",
  },
  {
    title: i18n.t("product.sort.values.latest_review"),
    value: "latest_review",
    icon: "timer",
  },
]);
const params = ref<IProductSearchParams>({});
const types = ref<string[]>([]);

const group = computed(() => {
  if (!props.typeCode) return;

  const group = Utils.schemaOrg.groups[props.typeCode];
  if (group) types.value = [group.code];

  return group;
});

function submit() {
  params.value.type = types.value.at(-1) as any;

  emit("submit", params.value);
  params.value = {};
}
</script>

<template>
  <div class="">
    <div class="pa-9 d-flex flex-column ga-10">
      <div>
        <div class="mb-1 px-2 font-weight-bold text-h6">
          {{ i18n.t("product.sort.title") }}
        </div>
        <div class="d-flex flex-wrap ga-2">
          <v-btn
            v-for="key in sortKeys"
            color="background"
            variant="flat"
            class="border"
            rounded="lg"
            size="large"
            @click="()=> params.sort = (key.value as any)"
          >
            <template #prepend>
              <ui-svg :name="key.icon" size="22" />
            </template>

            {{ key.title }}

            <template #append>
              <i
                v-if="params.sort === key.value"
                class="fi fi-ss-check-circle"
              ></i>
            </template>
          </v-btn>
        </div>
      </div>

      <div class="border-t" style="--v-border-opacity: 0.07"></div>

      <div>
        <div class="mb-1 px-2 font-weight-bold text-h6">
          {{ Utils.lodash.capitalize(i18n.t("words.score")) }}
        </div>
        <div class="d-flex flex-column ga-1">
          <div v-for="i in 5">
            <v-btn
              color="dark"
              variant="text"
              rounded
              @click="
                params.scoreMoreThan =
                  params.scoreMoreThan === i ? undefined : i
              "
            >
              <template #prepend>
                <i
                  v-if="params.scoreMoreThan === i"
                  class="fi fi-ss-check-circle"
                ></i>
                <i v-else class="fi fi-rs-check-circle"></i>
              </template>
              <syaScoreRate :score="i" size="20px" />
            </v-btn>
          </div>
        </div>
      </div>

      <div class="border-t" style="--v-border-opacity: 0.07"></div>

      <div>
        <div class="mb-1 px-2 font-weight-bold text-h6">
          {{ Utils.lodash.capitalize(i18n.t("words.categories")) }}
        </div>

        <div class="d-flex flex-wrap ga-2">
          <template v-if="group">
            <v-btn
              v-for="(sub, code) in group.subs"
              color="background"
              variant="flat"
              class="border"
              :class="{
                'border-md border-dark border-opacity-100': types[0] === code,
              }"
              rounded="pill"
              size="large"
              @click="
                () => {
                  types[0] = code as string;
                }
              "
            >
              {{ i18n.t(`shemaOrg.${code}`) }}

              <template #append> </template>
            </v-btn>
          </template>

          <template v-else>
            <v-btn
              v-for="group in Utils.schemaOrg.groups"
              :key="group.code"
              color="background"
              variant="flat"
              class="border"
              :class="{
                'border-md border-dark border-opacity-100':
                  types[0] === group.code,
              }"
              rounded="pill"
              size="large"
              @click="
                () => {
                  types[0] = group.code;
                }
              "
            >
              <template #prepend>
                <ui-svg :name="`schemaorg/${group.code}`" size="28" />
              </template>

              {{ i18n.t(`shemaOrg.${group.code}`) }}

              <template #append> </template>
            </v-btn>
          </template>
        </div>
      </div>
    </div>

    <div
      class="d-flex align-center ga-2 pa-5 border-t bg-background"
      style="position: sticky; bottom: 0"
    >
      <v-btn color="dark" class="ml-auto" @click="submit"> submit </v-btn>
    </div>
  </div>
</template>
