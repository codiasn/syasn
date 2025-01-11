<script setup lang="ts">
const localePath = useLocalePath();
const i18n = useI18n();
const submitting = ref<string | boolean>(false);

const items = ref([
  [
    {
      key: "email",
      icon: "fi fi-rr-at",
      label: i18n.t("pages.register.email"),
      type: "email",
      rules: [
        (v: string) => !!v || i18n.t("pages.register.emailRequired"),
        (v: string) =>
          (v && /.+@.+\..+/.test(v)) || i18n.t("pages.register.invalidEmail"),
      ],
    },
  ],
  [
    {
      key: "firstName",
      icon: "fi fi-rr-user",
      label: i18n.t("firstName"),
      type: "text",
      rules: [(v: string) => !!v || i18n.t("pages.register.firstNameRequired")],
    },
    {
      key: "lastName",
      icon: "fi fi-rr-user",
      label: i18n.t("pages.register.lastName"),
      type: "text",
      rules: [(v: string) => !!v || i18n.t("pages.register.lastNameRequired")],
    },
  ],
  [
    {
      key: "password",
      icon: "fi fi-rr-lock",
      label: i18n.t("pages.register.password"),
      type: "password",
      rules: [(v: string) => !!v || i18n.t("pages.register.passwordRequired")],
    },
    {
      key: "passwordConfirmation",
      icon: "fi fi-rr-lock",
      label: i18n.t("pages.register.passwordConfirmation"),
      type: "password",
      rules: [
        // (v: string) => v === values.value.password || t("passwordNotMatch"),
      ],
    },
  ],
]);

async function submit(value: any) {
  try {
    submitting.value = true;
    await useSya().session.register({ ...value });
    useRouter().replace(localePath({ name: "confirm-identity" }));
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
          {{ i18n.t("pages.register.title") }}
        </div>
      </div>
      <ui-form
        class="h-100"
        :inputs="items"
        :submit-text="i18n.t('pages.register.register')"
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
      <div class="mb-5">
        <div class="mt-5 pa-5 d-flex justify-center ga-3 flex-wrap">
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

        <div
          class="text-center my-3 text-body-2"
          v-html="i18n.t('pages.register.acceptingConfidentialityPolicies')"
        ></div>

        <div class="text-center">
          {{ i18n.t("pages.register.alreadyRegistered") }}

          <nuxt-link :to="localePath({ name: 'login' })">
            {{ i18n.t("pages.register.login") }}
          </nuxt-link>
        </div>
      </div>
    </div>

    <ui-loading-page v-if="submitting" />
  </v-app>
</template>
