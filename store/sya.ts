import { defineStore } from "pinia";
import { Sya } from "~/jsclient";
import type { SyaConfig } from "~/jsclient/interfaces";

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
        clientId: import.meta.env.VITE_SYA_CLIENT_ID,
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
