export const globalTranslationsRefs = [
  {
    element: document.querySelector(
      ".navigation > .pages-nav-wrapper > .link-btn-wrapper:nth-child(1) > a"
    ),
    key: "globalNavigationWork",
  },
  {
    element: document.querySelector(
      ".company-description-introduction > .grid-main > p"
    ),
    key: "globalCompanyIntroductionDescription",
  },
  {
    element: document.querySelector(
      ".company-description-introduction .company-description-cta-section > .link-btn-wrapper > a"
    ),
    key: "globalCompanyIntroductionDescriptionCTA",
  },
  {
    element: document.querySelector(
      "#w-node-efa4d3f9-1192-f539-d90a-821e60bd015c-60bd015a"
    ),
    key: "globalCompanyIntroductionDescription",
  },

  // * footer * //
  {
    element: document.querySelector(
      ".contact-section .contact-section-row > h4"
    ),
    key: "globalContactStart",
  },
  {
    element: document.querySelector(
      ".contact-section .contact-section-row:nth-child(2) > h4"
    ),
    key: "globalContactProject",
  },
  {
    element: document.querySelector(
      ".footer .links-section .links-wrapper:nth-child(3) > .link:nth-child(1)"
    ),
    key: "globalFooterWork",
  },
  // * 404 * //
  {
    element: document.querySelector(".page-not-found"),
    key: "globalPageNotFound",
  },
];

export const globalTranslations = {
  fr: {
    globalContactStart: "Démarrer",
    globalContactProject: "un projet",
    globalNavigationWork: "projets",
    globalFooterWork: "projets",
    globalCompanyIntroductionDescription:
      "Tripalium est un studio de design multidisciplinaire basé en France et au Pérou — Capable de concevoir des solutions créatives et ambitieuses guidées par une méthodologie affinée pour des projets de toutes tailles [***]",
    globalCompanyIntroductionDescriptionCTA: "découvrir notre approche",
    globalPageNotFound: `La page que vous avez demandée n’existe pas.
L’addresse saisie est peut-être incorrecte ou la page peut avoir été déplacée.`,
  },
  en: {
    globalContactStart: "Start",
    globalContactProject: "a project",
    globalNavigationWork: "work",
    globalFooterWork: "work",
    globalCompanyIntroductionDescription:
      "Tripalium is a multidisciplinary design studio based in France & Peru — Crafting creative & ambitious solutions lead with strong processes for all size compagnies [***]",
    globalCompanyIntroductionDescriptionCTA: "understand our process",
    globalPageNotFound: `The page you requested does not exist.
The address you entered may be incorrect, or the page may have been moved`,
  },
};
