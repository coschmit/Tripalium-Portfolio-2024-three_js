document.addEventListener("DOMContentLoaded", function () {
  const projectCounter = document.querySelector(".projects-counter");

  const archiveImageGrid = document.querySelector(".project-list");

  projectCounter.innerHTML = `${archiveImageGrid.childElementCount} PROJECTS`;
});
