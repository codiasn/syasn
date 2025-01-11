<script lang="ts" setup>
import type {
  IProductSearchParams,
  IProductType,
} from "~/jsclient/interfaces/product";

const props = defineProps({
  typeCode: { type: String as PropType<IProductType> },
  startParams: {
    type: String as PropType<IProductSearchParams>,
    default: {},
  },
});

const pending = ref(false);
const i18n = useI18n();
const sya = useSya();

const params = ref<IProductSearchParams>({
  type: props.typeCode,
  ...props.startParams,
});

async function fetcher() {
  pending.value = true;
  window.scrollTo({ top: 0, behavior: "smooth" });
  try {
    return await sya.product.search({ ...params.value });
  } finally {
    pending.value = false;
  }
}

const { data: result, execute } = await useAsyncData(
  Math.random().toString(),
  () => fetcher()
);

watch(
  () => params.value,
  () => {
    setQuery();
    execute();
  },
  { deep: true }
);

setQuery();
function setQuery() {
  const query = { ...params.value };
  if (props.typeCode && props.typeCode === query.type) {
    delete query.type;
  }

  useRouter().replace({ query });
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="10">
        <template v-if="pending">
          <div class="mb-3 d-flex align-center ga-2">
            <div
              class="skeleton rounded-pill"
              style="width: 100px; height: 32px"
            ></div>
            <div
              class="skeleton ml-auto"
              style="width: 70px; height: 15px"
            ></div>
          </div>

          <ui-sya-score-card-skelton v-for="i in 3" class="mb-3" />
        </template>

        <template v-else>
          <div class="d-flex align-center mb-3 px-3">
            <v-dialog max-width="772" max-height="552px">
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  color="background"
                  variant="flat"
                  class="border border-md"
                  rounded="pill"
                  size="large"
                >
                  <template #prepend>
                    <i class="fi fi-rr-settings-sliders"></i>
                  </template>

                  {{ Utils.lodash.capitalize(i18n.t("words.filter")) }}
                </v-btn>
              </template>
              <template #default="{ isActive }">
                <v-card>
                  <ui-sya-product-filter
                    :type-code="typeCode"
                    @submit="
                      (p) => {
                        params = p;
                        isActive.value = false;
                      }
                    "
                  />
                </v-card>
              </template>
            </v-dialog>

            <v-spacer />

            <div class="text-body-2" v-if="result?.total">
              {{
                i18n.t("components.sya.product.page-search.resume.title", {
                  from: result.fromto[0],
                  to: result.fromto[1],
                  total: result.total,
                })
              }}
            </div>
            <div v-else>
              {{ i18n.t("components.sya.product.page-search.resume.empty") }}
            </div>
          </div>

          <div
            v-if="!result?.products?.length"
            class="text-center d-flex justify-center mt-16"
          >
            <i
              class="fi fi-ss-list-timeline"
              style="font-size: 102px; text-align: center; opacity: 0.2"
            ></i>
          </div>
          <template v-else>
            <template v-for="product in result.products" :key="product.id">
              <div class="mb-2">
                <ui-sya-product-card :product="product" />
              </div>
            </template>
          </template>

          <v-pagination
            v-if="result?.products?.length"
            :total-visible="5"
            :length="result.totalPages"
            v-model="params.page"
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
      </v-col>
    </v-row>
  </v-container>
</template>
