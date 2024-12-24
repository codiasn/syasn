<script setup lang="ts">
const { t } = useI18n({ useScope: "local" });
const i18n = useI18n();
const submitting = ref<string | boolean>(false);
const success = ref(false);

const items = ref([
  [
    {
      key: "code",
      icon: "fi fi-sr-password",
      label: i18n.t("validationCode"),
      type: "password",
      rules: [(v: string) => !!v || i18n.t("codeRequired")],
    },
  ],
]);

async function submit(value: any) {
  try {
    submitting.value = true;
    await useSya().session.confirmIdentity(`${value.code}`);
    useRouter().replace({ name: "login" });
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
        <p class="text-center mt-3">
          {{ t("message") }}
        </p>
      </div>
      <div v-if="success" class="my-auto text-center">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          illo aut assumenda a, sed tempore saepe tenetur, totam beatae
          molestiae nostrum, laboriosam numquam sint est neque harum? Rem,
          dolorem blanditiis.
        </p>

        <v-btn rounded class="mt-3"> se connecter </v-btn>
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

<i18n src="./confirm-identity.lang.json"></i18n>
