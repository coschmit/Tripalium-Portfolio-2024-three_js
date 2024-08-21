const shuffleElements = (container) => {
  let elements = container.children;
  for (let i = elements.length; i >= 0; i--) {
    container.appendChild(elements[(Math.random() * i) | 0]);
  }
};

window.addEventListener("load", function () {
  let imageGrid = document.querySelector(".archive-image-grid");
  shuffleElements(imageGrid);
  imageGrid.classList.remove("hidden");
});

document.addEventListener("DOMContentLoaded", function () {
  const projectCounter = document.querySelector(".projects-counter");

  const archiveImageGrid = document.querySelector(".archive-image-grid");

  projectCounter.innerHTML = `${archiveImageGrid.childElementCount} ITEMS`;
});
