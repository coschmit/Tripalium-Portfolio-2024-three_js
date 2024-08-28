const shuffleElements = (container, times = 1) => {
  const originalElements = Array.from(container.children);

  // duplicate children
  for (let t = 1; t < times; t++) {
    originalElements.forEach((element) => {
      const clone = element.cloneNode(true);
      container.appendChild(clone);
    });
  }

  // shuffle
  const totalElements = Array.from(container.children);
  for (let i = totalElements.length - 3; i >= 0; i--) {
    container.appendChild(totalElements[(Math.random() * i) | 0]);
  }
};

window.addEventListener("load", function () {
  let imageGrid = document.querySelector(".archive-items-grid");
  shuffleElements(imageGrid);
  imageGrid.classList.remove("hidden");
});

document.addEventListener("DOMContentLoaded", function () {
  const projectCounter = document.querySelector(".projects-counter");

  const archiveImageGrid = document.querySelector(".archive-items-grid");
  projectCounter.innerHTML = `${archiveImageGrid.childElementCount} ITEMS`;
});
