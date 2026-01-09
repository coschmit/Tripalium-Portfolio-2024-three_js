import { translations } from "../localization/index.js";

export const isSafari = /^((?!chrome|android).)*safari/i.test(
  navigator.userAgent
);
export const isIPhone =
  /iPhone/.test(navigator.userAgent) && !("MSStream" in window);
export const isIOS = isSafari || /iP(hone|od|ad)/.test(navigator.userAgent);
export const isMobileDevice = /Android|iPhone|iPod/i.test(navigator.userAgent);
export const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
export const isTablet = () =>
  window.matchMedia("(min-width: 768px) and (max-width: 991px)").matches;
export const isDesktop = () => window.matchMedia("(min-width: 992px)").matches;

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
  const currentTranslations = translations[lang] || {};

  // Old system (manual refs)
  elementsToTranslate.forEach(({ element, key }) => {
    if (!element) return;
    const translation = currentTranslations[key];
    if (typeof translation === "string" && translation.trim() !== "") {
      element.textContent = translation;
    }
  });

  // New system (data-i18n)
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const translation = currentTranslations[key];
    if (typeof translation === "string" && translation.trim() !== "") {
      el.textContent = translation;
    }
  });
};

export const remToPx = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

export const getCopyEmailPopupDefaultWidth = () => {
  // text + padding
  return (
    document.querySelector(
      ".contact-section .copy-email-popup.default-length > div"
    ).offsetWidth +
    remToPx(0.75) * 2 // change the reference if there is a longer text in the clicked anim
  );
};

export const emailPopupReveal = () => {
  const defaultDivWidth = getCopyEmailPopupDefaultWidth() + 1 * 2; // + borders

  const emailRevealParams = {
    width: `${defaultDivWidth}px`,
    duration: 0.4,
  };
  // gsap.to(".copy-email-popups-wrapper", { width: defaultDivWidth });
  gsap.to(".copy-email-popup-reveal", emailRevealParams);
};

export const definePopupAnimationTL = (tl) => {
  const largestDivWidth =
    document.querySelector(".contact-section .copy-email-popup.clicked > div ")
      .offsetWidth +
    remToPx(0.75) * 2;

  tl.to(".copy-email-popups-wrapper", { width: largestDivWidth })
    .to(
      ".copy-email-popup-reveal",
      {
        width: `${largestDivWidth}px`,
        duration: 0.4,
      },
      "<"
    )
    .to(".copy-email-popup.clicked", {
      top: "0%",
      duration: 0.5,
    })
    .to(".copy-email-popup.clicked", { top: "0%", duration: 1 })
    .to(
      ".copy-email-popup.clicked",
      {
        top: "-100%",
        duration: 0.5,
      },
      "<1.5"
    )
    .to(".copy-email-popup.clicked-2", { top: "0%", duration: 0.5 }, "<");
};
