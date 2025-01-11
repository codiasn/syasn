<script lang="ts" setup>
const localePath = useLocalePath();
const i18n = useI18n();
const q = ref<string>();
const sya = useSya();
const pending = ref(false);

async function fetcher() {
  pending.value = true;
  try {
    return await sya.product.search({ q: q.value });
  } finally {
    pending.value = false;
  }
}

const {
  data: result,
  execute,
  clear,
} = await useAsyncData(Math.random().toString(), () => fetcher(), {
  immediate: false,
});

watch(
  () => q.value,
  () => {
    const _q = q.value;

    setTimeout(() => {
      if (!_q) clear();
      else if (_q === q.value) execute();
    }, 500);
  }
);
</script>

<template>
  <v-dialog max-width="772" max-height="552px">
    <template #activator="{ props }">
      <slot name="activator" :props="props" />
    </template>
    <template #default="{ isActive }">
      <v-card>
        <div
          class="pa-5 bg-background border-b"
          style="position: sticky; top: 0; z-index: 10"
        >
          <v-text-field
            hide-details
            rounded="pill"
            variant="solo-filled"
            :placeholder="i18n.t('components.pages.home.search.placeholder')"
            v-model="q"
            autofocus
            style="width: 552px; max-width: 90%"
            class="mx-auto"
          >
            <template #prepend-inner>
              <i class="fi fi-br-search mx-3"></i>
            </template>
          </v-text-field>
        </div>

        <template v-if="pending">
          <div class="d-flex">
            <v-progress-circular indeterminate class="mx-auto my-10" />
          </div>
        </template>

        <template v-else-if="result?.total">
          <v-container style="margin-bottom: 30px">
            <div v-if="!pending" class="d-flex align-center mb-3 px-3">
              <v-spacer />

              <div class="text-body-2" v-if="result?.total">
                {{ result.total }}
                {{ i18n.t("words.results") }}
              </div>
            </div>

            <template v-if="result?.products?.length">
              <template v-for="product in result.products" :key="product.id">
                <div class="mb-2" @click="isActive.value = false">
                  <ui-sya-product-card :product="product" />
                </div>
              </template>
            </template>
          </v-container>

          <v-btn
            v-if="result?.total"
            style="position: sticky; bottom: 20px; width: max-content"
            class="mx-auto font-weight-bold"
            size="x-large"
            rounded
            :to="localePath({ name: 'search', query: { q } })"
            @click="isActive.value = false"
          >
            Afficher tous les résultats ({{ result.total }})
          </v-btn>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
