<script lang="ts" setup>
const i18n = useI18n();
const switchLocalePath = useSwitchLocalePath();
const submitting = ref(false);

const availableLocales = computed(() => {
  return i18n.locales.value.filter((i) => i.code !== i18n.locale.value);
});
</script>

<template>
  <v-menu width="350" offset="10">
    <template v-slot:activator="{ props }">
      <slot name="activator" :props="props" />
    </template>

    <v-card color="background" border>
      <v-list bg-color="transparent" class="pa-0">
        <v-list-item
          v-for="locale in availableLocales"
          :key="locale.code"
          variant="text"
          color="dark"
          size="x-large"
          style="justify-content: flex-start"
          :to="switchLocalePath(locale.code)"
          block
        >
          <template #append v-if="i18n.locale.value === locale.code">
            <i class="fi fi-sr-check-circle text-primary"></i>
          </template>
          <div>
            {{ locale.name }}
          </div>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
