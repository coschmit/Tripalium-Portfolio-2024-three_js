document.addEventListener("DOMContentLoaded", function () {
  const projectCounter = document.querySelector(".projects-counter");

  const archiveImageGrid = document.querySelector(".archive-image-grid");

  projectCounter.innerHTML = `${archiveImageGrid.childElementCount} ITEMS`;
});
