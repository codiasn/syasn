import { defineStore } from "pinia";

const store = defineStore(
  "session",
  () => {
    const apiPublicKeykeys = ref<string>("");
    const id = ref<string>();

    async function init() {
      // const response = await Api.fetch({
      //   url: "/session/init",
      //   method: "post",
      //   body: { publicKey: keys.value.public },
      // });
      // apiPublicKeykeys.value = response.apiPublicKey;
      // id.value = response.sessionId;
    }

    function clean() {
      apiPublicKeykeys.value = "";
      id.value = undefined;
    }

    return {
      apiPublicKeykeys,
      id,
      clean,
      init,
    };
  },
  { persist: true }
);

export default store;
