document.addEventListener("DOMContentLoaded", function () {
  const projectCounter = document.querySelector(".projects-counter");

  const archiveImageGrid = document.querySelector(".project-list");

  const lang = localStorage.getItem("selectedLang") || "fr";

  if (lang === "en") {
    projectCounter.innerHTML = `${archiveImageGrid.childElementCount} PROJECTS`;
  } else {
    projectCounter.innerHTML = `${archiveImageGrid.childElementCount} PROJETS`;
  }
});

// **   START LOCALIZATION  ** //

document.getElementById("switch-fr").addEventListener("click", function () {
  updateLanguageTexts(studioTranslationsRefs, "fr");
});

document.getElementById("switch-en").addEventListener("click", function () {
  updateLanguageTexts(studioTranslationsRefs, "en");
});

const savedLang = localStorage.getItem("selectedLang") || "fr";
updateLanguageTexts(studioTranslationsRefs, savedLang);

// **   END LOCALIZATION  ** //
