import { defineStore } from "pinia";
import { Sya } from "~/jsclient";
import type { IConfig } from "~/jsclient/interfaces";

const store = defineStore(
  "sya",
  () => {
    const keys = ref({ public: "", private: "" });
    const config = ref<IConfig>();

    async function init(_config: Partial<IConfig> = {}) {
      if (!keys.value.public) keys.value = Sya.generateRsaKeys();

      config.value = {
        rsa: keys.value,
        sessionId: sessionId.value,
        url: import.meta.env.VITE_SYA_URL,
        ..._config,
      };

      const { $i18n } = useNuxtApp();
      // config.value.locale = _config.locale || { ...$i18n.tm("sya.sya") };

      const sya = new Sya(Store.sya.config!);
      await sya.session.init();
      sessionId.value = sya.sessionId;

      return sya;
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
