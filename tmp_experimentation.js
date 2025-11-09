const scrollContainer = document.querySelector(".container");
const content = document.querySelector(".gallery");
const images = Array.from(document.querySelectorAll(".archive-image"));

let currentScrollX = 0;
let currentScrollY = 0;
let targetScrollX = 0;
let targetScrollY = 0;

const smoothFactor = 0.1;
const scrollOffsetFactor = 2; // Facteur pour multiplier la largeur/hauteur du viewport

let isDragging = false;
let startX = 0;
let startY = 0;
let initialScrollX = 0; // Sauvegarde du scroll initial
let initialScrollY = 0; // Sauvegarde du scroll initial

// Suivre les images repositionnées et leur direction
const repositionedImages = new Map(); // { x: number, y: number, direction: string }

let lastScrollDirectionX = ""; // 'left', 'right'
let lastScrollDirectionY = ""; // 'up', 'down'

function smoothScroll() {
  currentScrollX += (targetScrollX - currentScrollX) * smoothFactor;
  currentScrollY += (targetScrollY - currentScrollY) * smoothFactor;

  gallery.style.transform = `translate(${-currentScrollX}px, ${-currentScrollY}px)`;

  requestAnimationFrame(smoothScroll);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    const image = entry.target;
    const currentTransformX = getTranslateX(image);
    const currentTransformY = getTranslateY(image);

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollOffsetX = scrollOffsetFactor * viewportWidth;
    const scrollOffsetY = scrollOffsetFactor * viewportHeight;

    if (!entry.isIntersecting) {
      // L'image sort du viewport : repositionner
      if (entry.boundingClientRect.right < 0) {
        console.log(
          "replace",
          image,
          currentTransformX + scrollOffsetX,
          currentTransformY
        );

        // Sortie à gauche, repositionner à droite
        image.style.transform = `translate(${
          currentTransformX + scrollOffsetX
        }px, ${currentTransformY}px)`;
        repositionedImages.set(image, {
          x: currentTransformX + scrollOffsetX,
          y: currentTransformY,
        });
      } else if (entry.boundingClientRect.left > viewportWidth) {
        // Sortie à droite, repositionner à gauche
        image.style.transform = `translate(${
          currentTransformX - scrollOffsetX
        }px, ${currentTransformY}px)`;

        repositionedImages.set(image, {
          x: currentTransformX - scrollOffsetX,
          y: currentTransformY,
        });
      }

      if (entry.boundingClientRect.bottom < 0) {
        // Sortie en haut, repositionner en bas
        image.style.transform = `translate(${currentTransformX}px, ${
          currentTransformY + scrollOffsetY
        }px)`;
        repositionedImages.set(image, {
          x: currentTransformX,
          y: currentTransformY + scrollOffsetY,
        });
      } else if (entry.boundingClientRect.top > viewportHeight) {
        // Sortie en bas, repositionner en haut
        image.style.transform = `translate(${currentTransformX}px, ${
          currentTransformY - scrollOffsetY
        }px)`;
        repositionedImages.set(image, {
          x: currentTransformX,
          y: currentTransformY - scrollOffsetY,
        });
      }
    } else {
      // Image réapparaît dans le viewport, la retirer de la liste des repositionnées
      repositionedImages.delete(image);
    }
  });
});

// Observer chaque image
images.forEach((image) => {
  observer.observe(image);
});

// Fonction pour vérifier et ramener les images repositionnées en cas de changement de direction
function checkRepositionedImages() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const scrollOffsetX = scrollOffsetFactor * viewportWidth; // Calculer le décalage horizontal
  const scrollOffsetY = scrollOffsetFactor * viewportHeight; // Calculer le décalage vertical

  repositionedImages.forEach((position, image) => {
    const currentTransformX = getTranslateX(image);
    const currentTransformY = getTranslateY(image);

    // Si une image repositionnée à droite dépasse à nouveau le bord gauche
    if (currentTransformX > viewportWidth) {
      // Repositionner vers la gauche
      image.style.transform = `translate(${
        currentTransformX - scrollOffsetX
      }px, ${currentTransformY}px)`;
      repositionedImages.set(image, {
        x: currentTransformX - scrollOffsetX,
        y: currentTransformY,
      });
    } else if (currentTransformX < -viewportWidth) {
      // Repositionner vers la droite
      image.style.transform = `translate(${
        currentTransformX + scrollOffsetX
      }px, ${currentTransformY}px)`;
      repositionedImages.set(image, {
        x: currentTransformX + scrollOffsetX,
        y: currentTransformY,
      });
    }

    // Si une image repositionnée en bas dépasse à nouveau le bord supérieur
    if (currentTransformY > viewportHeight) {
      // Repositionner vers le haut
      image.style.transform = `translate(${currentTransformX}px, ${
        currentTransformY - scrollOffsetY
      }px)`;
      repositionedImages.set(image, {
        x: currentTransformX,
        y: currentTransformY - scrollOffsetY,
      });
    } else if (currentTransformY < -viewportHeight) {
      // Repositionner vers le bas
      image.style.transform = `translate(${currentTransformX}px, ${
        currentTransformY + scrollOffsetY
      }px)`;
      repositionedImages.set(image, {
        x: currentTransformX,
        y: currentTransformY + scrollOffsetY,
      });
    }
  });

  // Appel de la vérification à la prochaine frame
  requestAnimationFrame(checkRepositionedImages);
}

// Initialiser la vérification
checkRepositionedImages();

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
