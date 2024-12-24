import { defineStore } from "pinia";
import { Sya, type SyaConfig } from "~/jsclient";

const store = defineStore(
  "sya",
  () => {
    const keys = ref({ public: "", private: "" });
    const config = ref<SyaConfig>();

    async function init() {
      if (!keys.value.public) keys.value = Sya.generateRsaKeys();

      config.value = {
        rsa: keys.value,
        sessionId: sessionId.value,
      };
    }

    const sessionId = ref<string>();
    function setSessionId(id?: string) {
      sessionId.value = id;
    }

    function clean() {
      sessionId.value = undefined;
      keys.value = { public: "", private: "" };
    }

    return {
      keys,
      config,

      sessionId,
      setSessionId,

      clean,
      init,
    };
  },
  { persist: true }
);

export default store;
