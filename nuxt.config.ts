import pages from "./i18n/locales/pages";

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  // typescript: { typeCheck: true },

  build: { transpile: ["vuetify"] },

  modules: [
    "vuetify-nuxt-module",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/i18n",
    "dayjs-nuxt",
    "nuxt-svgo",
    "nuxt-schema-org",
  ],

  app: {
    head: {
      titleTemplate: "%s %separator %siteName %separator %siteDescription",
      templateParams: {
        siteName: "Advensya",
        siteDescription: "",
        separator: "·",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      meta: [{ property: "og:image", content: "/og-image.png" }],
    },
  },

  components: [
    { path: "~/components/ui", global: true, prefix: "ui" },
    { path: "~/jsclient/ui", global: true, prefix: "sya" },
  ],

  css: [
    "animate.css/animate.min.css",
    "@flaticon/flaticon-uicons/css/all/all.css",
    "~/assets/styles/main.scss",

    "swiper/css",
    "swiper/css/pagination",
    "swiper/css/navigation",
  ],

  svgo: { autoImportPath: false, customComponent: "UiSvgo" },

  i18n: {
    strategy: "prefix",
    compilation: { strictMessage: false },
    vueI18n: "./locales/i18n.config.ts",
    baseUrl: `https://${process.env.URL}`,
    defaultLocale: "fr",
    locales: [
      {
        code: "fr",
        language: "fr",
        name: "Français",
        file: "fr.json",
      },

      {
        code: "en",
        language: "en",
        name: "English",
        file: "en.json",
      },
    ],

    // useSetI18nParams: true,
    // dynamicRouteParams: true,
    customRoutes: "config",
    pages,
  },

  piniaPersistedstate: { storage: "localStorage" },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or "modern"
        },
      },
    },
  },

  nitro: {
    preset: "node-server",
  },

  compatibilityDate: "2025-01-07",
});
