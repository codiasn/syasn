<script setup lang="ts">
const i18n = useI18n();
const localePath = useLocalePath();
const submitting = ref<string | boolean>(false);
const success = ref(false);

const items = ref([
  [
    {
      key: "code",
      icon: "fi fi-sr-password",
      label: i18n.t("pages.reset-password.validationCode"),
      type: "password",
      rules: [
        (v: string) =>
          !!v || i18n.t("pages.reset-password.validationCodeRequired"),
      ],
    },
    {
      key: "password",
      icon: "fi fi-rr-lock",
      label: i18n.t("pages.reset-password.newPassword"),
      type: "password",
      rules: [
        (v: string) => !!v || i18n.t("pages.reset-password.passwordRequired"),
      ],
    },
    {
      key: "passwordConfirmation",
      icon: "fi fi-rr-lock",
      label: i18n.t("pages.reset-password.passwordConfirmation"),
      type: "password",
      // rules: [
      //   (v: string) => v === values.value.password || i18n.t("pages.reset-password.passwordNotMatch"),
      // ],
    },
  ],
]);

async function submit(value: any) {
  try {
    submitting.value = true;
    await useSya().session.resetPassword({ ...value });
    success.value = true;
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
          {{ i18n.t("pages.reset-password.title") }}
        </div>
        <p class="text-center mt-3">
          {{ i18n.t("pages.reset-password.message") }}
        </p>
      </div>
      <div v-if="success" class="my-auto text-center">
        <p>
          {{ i18n.t("pages.reset-password.messageSuccess") }}
        </p>

        <v-btn rounded class="mt-3" :to="localePath({ name: 'login' })">
          {{ i18n.t("pages.reset-password.login") }}
        </v-btn>
      </div>
      <ui-form v-else class="h-100" :inputs="items" @submit="submit">
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
      <div class="my-5 d-flex flex-column gap-3"></div>
    </div>

    <ui-loading-page v-if="submitting" />
  </v-app>
</template>
