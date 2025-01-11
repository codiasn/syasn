<script setup lang="ts">
const localePath = useLocalePath();
const i18n = useI18n();
const submitting = ref<string | boolean>(false);

const items = ref([
  [
    {
      key: "email",
      icon: "fi fi-rr-at",
      label: i18n.t("pages.login.email"),
      type: "email",
      rules: [
        (v: string) => !!v || i18n.t("pages.login.emailRequired"),
        (v: string) =>
          (v && /.+@.+\..+/.test(v)) || i18n.t("pages.login.invalidEmail"),
      ],
    },
    {
      key: "password",
      icon: "fi fi-rr-lock",
      label: i18n.t("password"),
      type: "password",
      rules: [(v: string) => !!v || i18n.t("pages.login.passwordRequired")],
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
          {{ i18n.t("pages.login.title") }}
        </div>
      </div>
      <ui-form
        class="h-100"
        :inputs="items"
        :submit-text="i18n.t('pages.login.login')"
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
            :to="localePath({ name: 'request-reset-password' })"
          >
            {{ i18n.t("pages.login.forgetPassword") }}
          </v-btn>
        </div>

        <div class="text-center">
          {{ i18n.t("pages.login.notYetRegistred") }}
          <nuxt-link :to="localePath({ name: 'register' })">
            {{ i18n.t("pages.login.register") }}
          </nuxt-link>
        </div>
      </div>
    </div>

    <ui-loading-page v-if="submitting" />
  </v-app>
</template>
