import type { CustomRoutePages } from "@nuxtjs/i18n";

const pages: CustomRoutePages = {
  "product/[slug]": {
    fr: "/produit/[slug]",
    en: "/product/[slug]",
  },
  "score/[id]": {
    fr: "/avis/[id]",
    en: "/reviews/[id]",
  },
  "type/[type]": {
    fr: "/categories/[type]",
    en: "/categories/[type]",
  },
  search: {
    fr: "/rechercher",
    en: "/search",
  },

  "confirm-identity": {
    fr: "/confirmation-identite",
    en: "/identity-confirmation",
  },
  login: {
    fr: "/connexion",
    en: "/login",
  },
  register: {
    fr: "/inscription",
    en: "/signup",
  },
  "request-reset-password": {
    fr: "/mot-de-passe-oublie",
    en: "/forget-password",
  },
  "reset-password": {
    fr: "/reinitialisation-mot-de-passe",
    en: "/reset-password",
  },
};

export default pages;
