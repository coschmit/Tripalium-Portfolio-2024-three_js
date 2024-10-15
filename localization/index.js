import { globalTranslations, globalTranslationsRefs } from "./global.js";
import { homeTranslations } from "./pages/home.js";
import { nasaCaseTranslations } from "./pages/nasa-case.js";
import { projectListingTranslations } from "./pages/project-listing.js";
import { studioTranslations } from "./pages/studio.js";
import {
  valorsContainerTranslations,
  valorsContainerTranslationsRefs,
} from "./valors-container.js";

export const translationsRefs = [
  ...valorsContainerTranslationsRefs,
  ...globalTranslationsRefs,
];

// ** TRANSLATION ** //

export const translations = {
  fr: {
    // global
    ...globalTranslations.fr,
    // valorsContainers
    ...valorsContainerTranslations.fr,
    // home
    ...homeTranslations.fr,
    // studio
    ...studioTranslations.fr,
    // project listing
    ...projectListingTranslations.fr,
    // nasa case
    ...nasaCaseTranslations.fr,
  },
  en: {
    // global
    ...globalTranslations.en,
    // valorsContainers
    ...valorsContainerTranslations.en,
    // home
    ...homeTranslations.en,
    // studio
    ...studioTranslations.en,
    // project listing
    ...projectListingTranslations.en,
    // nasa case
    ...nasaCaseTranslations.en,
  },
};
