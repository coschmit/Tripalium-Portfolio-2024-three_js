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
