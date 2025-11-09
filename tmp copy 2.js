// const scrollContainer = document.querySelector(".container");
// const content = document.querySelector(".gallery");
// const images = Array.from(document.querySelectorAll(".archive-image"));

// let currentScrollX = 0;
// let currentScrollY = 0;
// let targetScrollX = 0;
// let targetScrollY = 0;

// const smoothFactor = 0.1;

// let isDragging = false;
// let startX = 0;
// let startY = 0;
// let initialScrollX = 0; // Sauvegarde du scroll initial
// let initialScrollY = 0; // Sauvegarde du scroll initial

// console.log("window.innerWidth", window.innerWidth);
// images.forEach((image, index) => {
//   const rect = image.getBoundingClientRect();
//   console.log("rect", index, rect.left, rect.right);
// });
// // Fonction pour appliquer un défilement fluide
// function smoothScroll() {
//   currentScrollX += (targetScrollX - currentScrollX) * smoothFactor;
//   currentScrollY += (targetScrollY - currentScrollY) * smoothFactor;

//   content.style.transform = `translate(${-currentScrollX}px, ${-currentScrollY}px)`;

//   images.forEach((image, index) => {
//     const rect = image.getBoundingClientRect();

//     if (rect.right < 0) {
//       if (index === 4) {
//         console.log("1");
//         content.appendChild(image); // Place à la fin de la galerie
//       }
//     } else if (rect.left > window.innerWidth) {
//       if (index === 4) {
//         console.log("2");
//         content.prepend(image); // Place au début de la galerie
//       }
//     }
//   });

//   requestAnimationFrame(smoothScroll);
// }

// // Initialisation du smooth scroll
// smoothScroll();

// // Capture du scroll de la souris
// scrollContainer.addEventListener("wheel", (event) => {
//   targetScrollX += event.deltaX;
//   targetScrollY += event.deltaY;

//   // targetScrollX = Math.max(
//   //   0,
//   //   Math.min(targetScrollX, content.offsetWidth - scrollContainer.offsetWidth)
//   // );
//   // targetScrollY = Math.max(
//   //   0,
//   //   Math.min(targetScrollY, content.offsetHeight - scrollContainer.offsetHeight)
//   // );
// });

// // Gestion du drag (glisser pour scroller)
// scrollContainer.addEventListener("mousedown", (event) => {
//   isDragging = true;

//   // Capture la position de départ du drag avec la position actuelle du scroll
//   startX = event.pageX;
//   startY = event.pageY;
//   initialScrollX = targetScrollX; // Sauvegarde la position actuelle de défilement
//   initialScrollY = targetScrollY; // Sauvegarde la position actuelle de défilement

//   scrollContainer.style.cursor = "grabbing"; // Changement du curseur lors du drag
// });

// scrollContainer.addEventListener("mousemove", (event) => {
//   if (!isDragging) return;

//   // Inversion des mouvements lors du drag
//   const deltaX = startX - event.pageX; // Inversion horizontale
//   const deltaY = startY - event.pageY; // Inversion verticale

//   // Mise à jour du défilement cible en fonction de la position initiale
//   targetScrollX = initialScrollX + deltaX;
//   targetScrollY = initialScrollY + deltaY;

//   // Limites du scroll pour éviter les débordements
//   // targetScrollX = Math.max(
//   //   0,
//   //   Math.min(targetScrollX, content.offsetWidth - scrollContainer.offsetWidth)
//   // );
//   // targetScrollY = Math.max(
//   //   0,
//   //   Math.min(targetScrollY, content.offsetHeight - scrollContainer.offsetHeight)
//   // );
// });

// scrollContainer.addEventListener("mouseup", () => {
//   isDragging = false;
//   scrollContainer.style.cursor = "grab"; // Retour au curseur normal après drag
// });

// scrollContainer.addEventListener("mouseleave", () => {
//   isDragging = false; // Arrêter le drag si la souris quitte la zone
//   scrollContainer.style.cursor = "grab";
// });

/* const scrollContainer = document.querySelector(".container");
const content = document.querySelector(".gallery");
const images = Array.from(document.querySelectorAll(".archive-image"));

let currentScrollX = 0;
let currentScrollY = 0;
let targetScrollX = 0;
let targetScrollY = 0;

let isDragging = false;
let startX = 0;
let startY = 0;
let initialScrollX = 0; // Sauvegarde du scroll initial
let initialScrollY = 0; // Sauvegarde du scroll initial

const smoothFactor = 0.1;
// Facteur de déplacement (2 fois la largeur ou hauteur du viewport)
const scrollOffsetFactor = 2;
const repositionedImages = new Map();
let lastScrollDirection = ""; // 'horizontal', 'vertical', or ''

// Fonction pour obtenir la valeur actuelle de translateX
function getTranslateX(element) {
  const transform = window.getComputedStyle(element).transform;
  if (transform === "none") return 0;
  const matrix = transform.match(/matrix.*\((.+)\)$/)[1].split(", ");
  return parseFloat(matrix[4]);
}

function getTranslateY(element) {
  const transform = window.getComputedStyle(element).transform;
  if (transform === "none") return 0;
  const matrix = transform.match(/matrix.*\((.+)\)$/)[1].split(", ");
  return parseFloat(matrix[5]);
}

// Fonction pour vérifier si un élément est dans le viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  return (
    rect.left <= viewportWidth &&
    rect.right >= 0 &&
    rect.top <= viewportHeight &&
    rect.bottom >= 0
  );
}

// Fonction pour appliquer un défilement fluide
function smoothScroll() {
  currentScrollX += (targetScrollX - currentScrollX) * smoothFactor;
  currentScrollY += (targetScrollY - currentScrollY) * smoothFactor;

  content.style.transform = `translate(${-currentScrollX}px, ${-currentScrollY}px)`;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const scrollOffsetX = scrollOffsetFactor * viewportWidth;
  const scrollOffsetY = scrollOffsetFactor * viewportHeight;

  images.forEach((image) => {
    const rect = image.getBoundingClientRect();
    const currentTransformX = getTranslateX(image);
    const currentTransformY = getTranslateY(image);

    let repositioned = repositionedImages.get(image);

    if (!repositioned) {
      if (rect.right < 0) {
        // L'image sort à gauche, repositionne à la droite du viewport
        image.style.transform = `translate(${
          currentTransformX + scrollOffsetX
        }px, ${currentTransformY}px)`;
        repositionedImages.set(image, {
          x: currentTransformX + scrollOffsetX,
          y: currentTransformY,
          direction: "right",
        });
      } else if (rect.left > viewportWidth) {
        // L'image sort à droite, repositionne à la gauche du viewport
        image.style.transform = `translate(${
          currentTransformX - scrollOffsetX
        }px, ${currentTransformY}px)`;
        repositionedImages.set(image, {
          x: currentTransformX - scrollOffsetX,
          y: currentTransformY,
          direction: "left",
        });
      }

      if (rect.bottom < 0) {
        // L'image sort en haut, repositionne en bas du viewport
        image.style.transform = `translate(${currentTransformX}px, ${
          currentTransformY + scrollOffsetY
        }px)`;
        repositionedImages.set(image, {
          x: currentTransformX,
          y: currentTransformY + scrollOffsetY,
          direction: "down",
        });
      } else if (rect.top > viewportHeight) {
        // L'image sort en bas, repositionne en haut du viewport
        image.style.transform = `translate(${currentTransformX}px, ${
          currentTransformY - scrollOffsetY
        }px)`;
        repositionedImages.set(image, {
          x: currentTransformX,
          y: currentTransformY - scrollOffsetY,
          direction: "up",
        });
      }
    } else {
      // Si l'image a été repositionnée, vérifier si elle doit être repositionnée de nouveau
      if (
        lastScrollDirection === "horizontal" &&
        rect.left <= viewportWidth &&
        rect.right >= 0
      ) {
        // Réinitialiser si l'image est dans le viewport horizontalement
        repositionedImages.delete(image);
      } else if (
        lastScrollDirection === "vertical" &&
        rect.top <= viewportHeight &&
        rect.bottom >= 0
      ) {
        // Réinitialiser si l'image est dans le viewport verticalement
        repositionedImages.delete(image);
      }
    }
  });

  requestAnimationFrame(smoothScroll);
}

// Initialisation du smooth scroll
smoothScroll();

// Capture du scroll de la souris
scrollContainer.addEventListener("wheel", (event) => {
  targetScrollX += event.deltaX;
  targetScrollY += event.deltaY;
});

// Gestion du drag (glisser pour scroller)
scrollContainer.addEventListener("mousedown", (event) => {
  isDragging = true;

  // Capture la position de départ du drag avec la position actuelle du scroll
  startX = event.pageX;
  startY = event.pageY;
  initialScrollX = targetScrollX; // Sauvegarde la position actuelle de défilement
  initialScrollY = targetScrollY; // Sauvegarde la position actuelle de défilement

  scrollContainer.style.cursor = "grabbing"; // Changement du curseur lors du drag
});

scrollContainer.addEventListener("mousemove", (event) => {
  if (!isDragging) return;

  // Inversion des mouvements lors du drag
  const deltaX = startX - event.pageX; // Inversion horizontale
  const deltaY = startY - event.pageY; // Inversion verticale

  // Mise à jour du défilement cible en fonction de la position initiale
  targetScrollX = initialScrollX + deltaX;
  targetScrollY = initialScrollY + deltaY;
});

scrollContainer.addEventListener("mouseup", () => {
  isDragging = false;
  scrollContainer.style.cursor = "grab"; // Retour au curseur normal après drag
});

scrollContainer.addEventListener("mouseleave", () => {
  isDragging = false; // Arrêter le drag si la souris quitte la zone
  scrollContainer.style.cursor = "grab";
});
*/

const scrollContainer = document.querySelector(".container");
const content = document.querySelector(".gallery");
const images = Array.from(document.querySelectorAll(".archive-image"));

let isDragging = false;
let currentScrollX = 0;
let currentScrollY = 0;
let targetScrollX = 0;
let targetScrollY = 0;

const smoothFactor = 0.1;
const scrollOffsetFactor = 2; // Facteur pour multiplier la largeur/hauteur du viewport

// Suivre les images repositionnées et leur direction
const repositionedImages = new Map(); // { x: number, y: number, direction: string }

let lastScrollDirection = ""; // 'horizontal', 'vertical', or ''

function smoothScroll() {
  currentScrollX += (targetScrollX - currentScrollX) * smoothFactor;
  currentScrollY += (targetScrollY - currentScrollY) * smoothFactor;

  gallery.style.transform = `translate(${-currentScrollX}px, ${-currentScrollY}px)`;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const scrollOffsetX = scrollOffsetFactor * viewportWidth;
  const scrollOffsetY = scrollOffsetFactor * viewportHeight;

  images.forEach((image, index) => {
    const rect = image.getBoundingClientRect();
    const currentTransformX = getTranslateX(image);
    const currentTransformY = getTranslateY(image);

    let repositioned = repositionedImages.get(image);

    if (!repositioned) {
      if (rect.right < 0) {
        if (index === 0) {
          console.log("super");
        }
        // L'image sort à gauche, repositionne à la droite du viewport
        image.style.transform = `translate(${
          currentTransformX + scrollOffsetX
        }px, ${currentTransformY}px)`;
        repositionedImages.set(image, {
          x: currentTransformX + scrollOffsetX,
          y: currentTransformY,
          direction: "right",
        });
      } else if (rect.left > viewportWidth) {
        // L'image sort à droite, repositionne à la gauche du viewport
        image.style.transform = `translate(${
          currentTransformX - scrollOffsetX
        }px, ${currentTransformY}px)`;
        repositionedImages.set(image, {
          x: currentTransformX - scrollOffsetX,
          y: currentTransformY,
          direction: "left",
        });
      }

      if (rect.bottom < 0) {
        // L'image sort en haut, repositionne en bas du viewport
        image.style.transform = `translate(${currentTransformX}px, ${
          currentTransformY + scrollOffsetY
        }px)`;
        repositionedImages.set(image, {
          x: currentTransformX,
          y: currentTransformY + scrollOffsetY,
          direction: "down",
        });
      } else if (rect.top > viewportHeight) {
        // L'image sort en bas, repositionne en haut du viewport
        image.style.transform = `translate(${currentTransformX}px, ${
          currentTransformY - scrollOffsetY
        }px)`;
        repositionedImages.set(image, {
          x: currentTransformX,
          y: currentTransformY - scrollOffsetY,
          direction: "up",
        });
      }
    } else {
      // Si l'image a été repositionnée, vérifier si elle doit être repositionnée de nouveau
      if (
        lastScrollDirection === "horizontal" &&
        rect.left <= viewportWidth &&
        rect.right >= 0
      ) {
        if (index === 0) {
          console.log("horizontal");
        }
        // Réinitialiser si l'image est dans le viewport horizontalement
        repositionedImages.delete(image);
      } else if (
        lastScrollDirection === "vertical" &&
        rect.top <= viewportHeight &&
        rect.bottom >= 0
      ) {
        if (index === 0) {
          console.log("vertical");
        }
        // Réinitialiser si l'image est dans le viewport verticalement
        repositionedImages.delete(image);
      }
    }
  });

  requestAnimationFrame(smoothScroll);
}

// Fonction pour obtenir la valeur actuelle de translateX
function getTranslateX(element) {
  const transform = window.getComputedStyle(element).transform;
  if (transform === "none") return 0;
  const matrix = transform.match(/matrix.*\((.+)\)$/)[1].split(", ");
  return parseFloat(matrix[4]);
}

// Fonction pour obtenir la valeur actuelle de translateY
function getTranslateY(element) {
  const transform = window.getComputedStyle(element).transform;
  if (transform === "none") return 0;
  const matrix = transform.match(/matrix.*\((.+)\)$/)[1].split(", ");
  return parseFloat(matrix[5]);
}

// Fonction pour vérifier si un élément est dans le viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  return (
    rect.left <= viewportWidth &&
    rect.right >= 0 &&
    rect.top <= viewportHeight &&
    rect.bottom >= 0
  );
}

// Initialisation du smooth scroll
smoothScroll();

// Capture du scroll de la souris
container.addEventListener("wheel", (event) => {
  targetScrollX += event.deltaX;
  targetScrollY += event.deltaY;

  // Limite du défilement
  // targetScrollX = Math.max(
  //   0,
  //   Math.min(targetScrollX, content.scrollWidth - scrollContainer.offsetWidth)
  // );
  // targetScrollY = Math.max(
  //   0,
  //   Math.min(targetScrollY, content.scrollHeight - scrollContainer.offsetHeight)
  // );

  // Déterminer la direction du scroll
  lastScrollDirection =
    Math.abs(event.deltaX) > Math.abs(event.deltaY) ? "horizontal" : "vertical";
});

// Gestion du drag (glisser pour scroller)
container.addEventListener("mousedown", (event) => {
  isDragging = true;

  // Capture la position de départ du drag avec la position actuelle du scroll
  startX = event.pageX;
  startY = event.pageY;
  initialScrollX = targetScrollX; // Sauvegarde la position actuelle de défilement
  initialScrollY = targetScrollY; // Sauvegarde la position actuelle de défilement

  container.style.cursor = "grabbing"; // Changement du curseur lors du drag
});

container.addEventListener("mousemove", (event) => {
  if (!isDragging) return;

  // Inversion des mouvements lors du drag
  const deltaX = startX - event.pageX; // Inversion horizontale
  const deltaY = startY - event.pageY; // Inversion verticale

  // Mise à jour du défilement cible en fonction de la position initiale
  targetScrollX = initialScrollX + deltaX;
  targetScrollY = initialScrollY + deltaY;

  // Limites du scroll pour éviter les débordements
  // targetScrollX = Math.max(
  //   0,
  //   Math.min(targetScrollX, content.scrollWidth - scrollContainer.offsetWidth)
  // );
  // targetScrollY = Math.max(
  //   0,
  //   Math.min(targetScrollY, content.scrollHeight - scrollContainer.offsetHeight)
  // );

  // Déterminer la direction du drag
  lastScrollDirection =
    Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
});

container.addEventListener("mouseup", () => {
  isDragging = false;
  container.style.cursor = "grab"; // Retour au curseur normal après drag
});

container.addEventListener("mouseleave", () => {
  isDragging = false; // Arrêter le drag si la souris quitte la zone
  container.style.cursor = "grab";
});
