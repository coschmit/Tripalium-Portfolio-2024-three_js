import { projectListingTranslationsRefs } from "../../localization/pages/project-listing.js";
import { updateLanguageTexts } from "../utils.js";

const updateProjectListingCounter = (lang) => {
  const projectCounter = document.querySelector(".projects-counter");

  const archiveImageGrid = document.querySelector(".project-list");

  if (lang === "en") {
    projectCounter.innerHTML = `${archiveImageGrid.childElementCount} PROJECTS`;
  } else if (lang === "fr") {
    projectCounter.innerHTML = `${archiveImageGrid.childElementCount} PROJETS`;
  } else {
    console.error(`"${lang}" - language not supported`);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const lang = localStorage.getItem("selectedLang") || "fr";
  updateProjectListingCounter(lang);
});

// **   START LOCALIZATION  ** //

document.getElementById("switch-fr").addEventListener("click", function () {
  updateLanguageTexts(projectListingTranslationsRefs, "fr");
  updateProjectListingCounter("fr");
});

document.getElementById("switch-en").addEventListener("click", function () {
  updateLanguageTexts(projectListingTranslationsRefs, "en");
  updateProjectListingCounter("en");
});

const savedLang = localStorage.getItem("selectedLang") || "fr";
updateLanguageTexts(projectListingTranslationsRefs, savedLang);

// **   END LOCALIZATION  ** //
