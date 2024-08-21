export const globalElementsToTranslate = [
  {
    element: document.querySelector(
      ".navigation > .pages-nav-wrapper > .link-btn-wrapper:nth-child(1) > a"
    ),
    key: "globalNavigationWork",
  },
  // * Valors container start ** //
  {
    element: document.querySelector(
      ".valors-container > .valor-row > .valors-tags-container > .tag:nth-child(1)"
    ),
    key: "globalValorsTag1",
  },
  {
    element: document.querySelector(
      ".valors-container > .valor-row > .valors-tags-container > .tag:nth-child(2)"
    ),
    key: "globalValorsTag2",
  },
  {
    element: document.querySelector(
      ".valors-container > .valor-row > .valors-tags-container > .tag:nth-child(3)"
    ),
    key: "globalValorsTag3",
  },
  {
    element: document.querySelector(
      ".valors-container > .valor-row:nth-child(2) > .valors-tags-container > .tag:nth-child(1)"
    ),
    key: "globalValorsTag4",
  },
  {
    element: document.querySelector(
      ".valors-container > .valor-row:nth-child(2) > .valors-tags-container > .tag:nth-child(2)"
    ),
    key: "globalValorsTag5",
  },
  {
    element: document.querySelector(
      ".valors-container > .valor-row:nth-child(2) > .valors-tags-container > .tag:nth-child(3)"
    ),
    key: "globalValorsTag6",
  },
  {
    element: document.querySelector(
      ".valors-container > .valor-row:nth-child(3) > .valors-tags-container > .tag:nth-child(1)"
    ),
    key: "globalValorsTag7",
  },
  {
    element: document.querySelector(
      ".valors-container > .valor-row:nth-child(3) > .valors-tags-container > .tag:nth-child(2)"
    ),
    key: "globalValorsTag8",
  },
  {
    element: document.querySelector(
      ".valors-container > .valor-row:nth-child(3) > .valors-tags-container > .tag:nth-child(3)"
    ),
    key: "globalValorsTag9",
  },
  // * Valors container end ** //

  // * footer * //
  {
    element: document.querySelector(
      ".footer .links-section .links-wrapper:nth-child(3) > .link:nth-child(1)"
    ),
    key: "globalFooterWork",
  },
];

export const homeElementsToTranslate = [
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
    element: document.querySelector(".contact-section .contact-section-row h1"),
    key: "homeContactStart",
  },
  {
    element: document.querySelector(
      ".contact-section .contact-section-row:nth-child(2) h1"
    ),
    key: "homeContactProject",
  },
];

export const studioElementsToTranslate = [
  {
    element: document.querySelector(
      "#w-node-efa4d3f9-1192-f539-d90a-821e60bd015c-60bd015a"
    ),
    key: "globalCompanyIntroductionDescription",
  },
];

// ** TRANSLATION ** //

export const translations = {
  fr: {
    globalValorsTag1: "stratégie",
    globalValorsTag2: "Direction Artistique",
    globalValorsTag3: "méthodologie",
    globalValorsTag4: "Identité",
    globalValorsTag5: "interface",
    globalValorsTag6: "Design system",
    globalValorsTag7: "développement full stack",
    globalValorsTag8: "creative coding",
    globalValorsTag9: "cms",
    globalNavigationWork: "projets",
    globalFooterWork: "projets",
    globalCompanyIntroductionDescription:
      "Tripalium est un studio de design multidisciplinaire basé en France et au Pérou — Capable de concevoir des solutions créatives et ambitieuses guidées par une méthodologie affinée pour des projets de toutes tailles [***]",
    globalCompanyIntroductionDescriptionCTA: "découvrir notre approche",
    homeContactStart: "Démarrer",
    homeContactProject: "un projet",
  },
  en: {
    globalValorsTag1: "strategy",
    globalValorsTag2: "art direction",
    globalValorsTag3: "methodology",
    globalValorsTag4: "branding",
    globalValorsTag5: "interface",
    globalValorsTag6: "Design system",
    globalValorsTag7: "full stack Engineering",
    globalValorsTag8: "creative coding",
    globalValorsTag9: "cms",
    globalNavigationWork: "work",
    globalFooterWork: "work",
    globalCompanyIntroductionDescription:
      "Tripalium is a multidisciplinary design studio based in France & Peru — Crafting creative & ambitious solutions lead with strong processes for all size compagnies [***]",
    globalCompanyIntroductionDescriptionCTA: "understand our process",
    homeContactStart: "Start",
    homeContactProject: "a project",
  },
};
