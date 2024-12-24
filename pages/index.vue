<script setup lang="ts">
const i18n = useI18n();
const submitting = ref<string | boolean>(false);

const values = ref<{ [key: string]: any }>({
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  passwordConfirmation: "",
});

const items = ref([
  [
    {
      key: "email",
      icon: "fi fi-rr-at",
      label: i18n.t("email"),
      type: "email",
      rules: [
        (v: string) => !!v || i18n.t("emailRequired"),
        (v: string) => (v && /.+@.+\..+/.test(v)) || i18n.t("invalidEmail"),
      ],
    },
    {
      key: "password",
      icon: "fi fi-rr-lock",
      label: i18n.t("password"),
      type: "password",
      rules: [(v: string) => !!v || i18n.t("passwordRequired")],
    },
  ],
]);

function submit(value: any) {}
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
          Bienvenue sur Sya
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

        <div class="text-center">
          Vous avez déjà un compte ?
          <nuxt-link :to="{ name: 'login' }">se connecter</nuxt-link>
        </div>
      </div>
    </div>

    <ui-loading-page v-if="submitting" />
  </v-app>
</template>

<style lang="scss">
.pg-register {
  .ui-form {
    .ui-form-container {
      margin-top: auto;
      margin-bottom: auto;
    }
  }
}
</style>
