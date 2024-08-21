import { translations } from "./localization.js";

// ** LOCALIZATION ** //
export const switchNavigationLanguageSelected = (lang) => {
  const switchFR = document.getElementById("switch-fr");
  const switchEN = document.getElementById("switch-en");
  if (switchFR && switchEN) {
    if (lang === "fr") {
      switchFR.classList.remove("inactive");
      switchEN.classList.add("inactive");
    } else if (lang === "en") {
      switchEN.classList.remove("inactive");
      switchFR.classList.add("inactive");
    }
  }

  localStorage.setItem("selectedLang", lang);
};

// elementsToTranslate: {element: HTML, key:string}[]
// lang: string (ex: 'fr' || 'en')
export const updateLanguageTexts = (elementsToTranslate, lang) => {
  elementsToTranslate.forEach(function (item) {
    if (item.element) {
      const translation = translations[lang][item.key];
      if (translation) {
        item.element.textContent = translation;
      }
    }
  });
};
