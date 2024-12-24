<script lang="ts" setup>
const { t } = useI18n({ useScope: "local" });
const { $i18n } = useNuxtApp();
const isOpen = ref(false);
const submitting = ref(false);

const current = computed(() => {
  const details = $i18n.locales.value.filter(
    (locale) => locale.code === $i18n.locale.value
  )[0];

  return {
    value: $i18n.locale,
    details,
  };
});

async function submit(lang: string) {
  // Store.app.setLang(lang);
  isOpen.value = false;
}
</script>

<template>
  <v-menu width="350" offset="10" v-model="isOpen">
    <template v-slot:activator="{ props, isActive }">
      <slot
        name="activator"
        :props="props"
        :isActive="isActive"
        :title="t('title')"
        :current="current"
      />
    </template>

    <v-card color="background" border>
      <v-container>
        <v-list bg-color="transparent">
          <v-list-item
            v-for="lang in $i18n.locales.value"
            :key="lang.code"
            variant="text"
            color="dark"
            rounded="lg"
            size="x-large"
            class="border mb-2"
            style="justify-content: flex-start"
            @click="submit(lang.code)"
            block
          >
            <template #append v-if="$i18n.locale.value === lang.code">
              <i class="fi fi-sr-check-circle text-primary"></i>
            </template>
            <div>
              {{ lang.name }}
            </div>
          </v-list-item>
        </v-list>
      </v-container>

      <div
        v-if="submitting"
        class="bg-background"
        style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <v-progress-circular color="primary" size="38" indeterminate />
      </div>
    </v-card>
  </v-menu>
</template>

<i18n src="./lang.json"></i18n>
