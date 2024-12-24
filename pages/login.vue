<script setup lang="ts">
const { t } = useI18n({ useScope: "local" });
const submitting = ref<string | boolean>(false);

const items = ref([
  [
    {
      key: "email",
      icon: "fi fi-rr-at",
      label: t("email"),
      type: "email",
      rules: [
        (v: string) => !!v || t("emailRequired"),
        (v: string) => (v && /.+@.+\..+/.test(v)) || t("invalidEmail"),
      ],
    },
    {
      key: "password",
      icon: "fi fi-rr-lock",
      label: t("password"),
      type: "password",
      rules: [(v: string) => !!v || t("passwordRequired")],
    },
  ],
]);

async function submit(value: any) {
  try {
    submitting.value = true;
    await useSya().session.login({ ...value });
    useRouter().replace({ name: "console" });
  } finally {
    submitting.value = false;
  }
}

onMounted(() => {
  if (useSya().user.current) {
    useRouter().replace({ name: "console" });
  }
});
</script>

<template>
  <v-app>
    <div
      style="width: calc(100% - 40px); max-width: 442px"
      class="pg-register mx-auto h-100 d-flex flex-column"
    >
      <div class="mt-10 d-flex justify-center align-center flex-column">
        <ui-svg name="logo" size="52" />
        <div class="font-weight-bold mt-3 text-h5 text-center">
          {{ t("title") }}
        </div>
      </div>
      <ui-form
        class="h-100"
        :inputs="items"
        :submit-text="t('login')"
        @submit="submit"
      >
        <template #back="{ goBack }">
          <v-btn
            style="position: fixed; top: 20px; left: 20px"
            icon
            color="black"
            variant="tonal"
            size="26"
            @click="goBack"
          >
            <i class="fi fi-rr-arrow-small-left"></i>
          </v-btn>
        </template>
      </ui-form>
      <div class="my-5 d-flex flex-column gap-3">
        <div class="pa-5 d-flex justify-center ga-3 flex-wrap">
          <v-btn icon variant="text" color="light" size="28">
            <ui-svg name="provider/google" size="22" />
          </v-btn>
          <v-btn icon variant="text" color="light" size="28">
            <ui-svg name="provider/facebook" size="22" />
          </v-btn>
          <v-btn icon variant="text" color="light" size="28">
            <ui-svg name="provider/github" size="22" />
          </v-btn>
        </div>

        <div class="mx-auto">
          <v-btn
            variant="tonal"
            color="light"
            size="small"
            class="mb-3"
            rounded
            :to="{ name: 'request-reset-password' }"
          >
            {{ t("forgetPassword") }}
          </v-btn>
        </div>

        <div class="text-center">
          {{ t("notYetRegistred") }}
          <nuxt-link :to="{ name: 'register' }">{{ t("register") }}</nuxt-link>
        </div>
      </div>
    </div>

    <ui-loading-page v-if="submitting" />
  </v-app>
</template>

<i18n src="./login.lang.json"></i18n>
