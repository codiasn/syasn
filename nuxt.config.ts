export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: false,

  runtimeConfig: {
    public: {
      appName: process.env.NUXT_APP_NAME,
      apiUrl: process.env.NUXT_API_URL,

      directus: { url: "" },
    },
  },

  build: {
    transpile: ["vuetify"],
  },

  modules: [
    "vuetify-nuxt-module",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/i18n",
    // "@nuxtjs/seo",
    "dayjs-nuxt",
    "nuxt-svgo",
  ],

  app: {
    head: {
      titleTemplate: "%s %separator %siteName - %siteDescription",
      templateParams: {
        siteName: "Advensya",
        siteDescription: "Automatiser et simplifier vos formulaires",
        separator: "·",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      meta: [{ property: "og:image", content: "/images/og-image-2.png" }],

      script: [],
    },
  },

  plugins: [],

  components: [{ path: "~/components/ui", global: true, prefix: "ui" }],

  css: [
    "animate.css/animate.min.css",
    "@flaticon/flaticon-uicons/css/all/all.css",
    "~/assets/styles/main.scss",
  ],

  svgo: { autoImportPath: false, customComponent: "UiSvgo" },

  i18n: {
    strategy: "prefix",
    dynamicRouteParams: false,
    compilation: { strictMessage: false },
    vueI18n: "./locale/i18n.config.ts",
    defaultLocale: "fr",
    locales: [
      {
        code: "fr",
        name: "Français",
        files: ["./locale/fr.lang.json"],
      },
      // {
      //   code: "en",
      //   name: "English",
      //   files: ["./locale/en.lang.json", "./locale/en.models.json"],
      // },
    ],
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

  compatibilityDate: "2024-11-10",
});
