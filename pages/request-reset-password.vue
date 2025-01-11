<script setup lang="ts">
const i18n = useI18n();
const localePath = useLocalePath();
const submitting = ref<string | boolean>(false);

const items = ref([
  [
    {
      key: "email",
      icon: "fi fi-rr-at",
      label: i18n.t("pages.request-reset-password.email"),
      type: "email",
      rules: [
        (v: string) =>
          !!v || i18n.t("pages.request-reset-password.emailRequired"),
        (v: string) =>
          (v && /.+@.+\..+/.test(v)) ||
          i18n.t("pages.request-reset-password.invalidEmail"),
      ],
    },
  ],
]);

async function submit(value: any) {
  try {
    submitting.value = true;
    await useSya().session.requestResetPassword({ ...value });

    useRouter().replace(localePath({ name: "reset-password" }));
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
  <v-app
    style="
      /* background-image: url(https://i.pinimg.com/736x/a4/0d/cc/a40dccb5fc39eef477a5b97f75ce3ed5.jpg); */
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    "
  >
    <div
      style="width: calc(100% - 40px); max-width: 442px"
      class="pg-register mx-auto h-100 d-flex flex-column"
    >
      <div class="mt-10 d-flex justify-center align-center flex-column">
        <ui-svg name="logo" size="52" />
        <div class="font-weight-bold mt-3 text-h5 text-center">
          {{ i18n.t("pages.request-reset-password.title") }}
        </div>
      </div>

      <ui-form class="h-100" :inputs="items" @submit="submit">
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
