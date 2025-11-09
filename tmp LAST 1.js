const container = document.querySelector(".container");
const gallery = document.querySelector(".gallery");
const images = Array.from(document.querySelectorAll(".archive-image"));

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const imgWidth = 277; // Largeur fixe des images
const imageMargin = 15; // Marge de 15px autour de chaque image

// Calculer le nombre de colonnes en fonction de la largeur de l'écran + 1 colonne
const galleryColumns =
  Math.ceil(screenWidth / (imgWidth + 2 * imageMargin)) + 1;
// Largeur d'une colonne (image + marges horizontales)
const galleryColumnWidth = imgWidth + 2 * imageMargin;
const galleryWidth = galleryColumns * galleryColumnWidth;

let isDragging = false;
let currentScrollX = -window.innerWidth / 2;
let currentScrollY = 0;
let targetScrollX = -window.innerWidth / 2;
let targetScrollY = 0;

const smoothFactor = 0.1;
const scrollOffsetFactor = 2; // Facteur pour multiplier la largeur/hauteur du viewport

// Suivre les images repositionnées et leur direction
const repositionedImages = new Map(); // { x: number, y: number, direction: string }

let lastScrollDirection = ""; // 'horizontal', 'vertical', or ''

function wrapGallery() {
  const containerBounds = container.getBoundingClientRect();
  const galleryBounds = gallery.getBoundingClientRect();

  // Repositionnement horizontal (X)
  // Si plus de la moitié de la galerie sort de la vue à gauche
  if (galleryBounds.right < containerBounds.right) {
    console.log("left");
    const offset = galleryBounds.width;
    targetScrollX -= offset;
    currentScrollX -= offset;

    // Repositionne la galerie vers la droite
    gsap.set(gallery, { x: currentScrollX });
  }
  // Si plus de la moitié de la galerie sort de la vue à droite
  else if (galleryBounds.left > containerBounds.right) {
    console.log("right");
    const offset = galleryBounds.width;
    targetScrollX += offset;
    currentScrollX += offset;

    // Repositionne la galerie vers la gauche
    gsap.set(gallery, { x: currentScrollX });
  }
}

function centerGallery() {
  gallery.style.transform = `translate(${window.innerWidth / 2}px, 0px)`;
}

function smoothScroll() {
  currentScrollX += (targetScrollX - currentScrollX) * smoothFactor;
  currentScrollY += (targetScrollY - currentScrollY) * smoothFactor;

  gallery.style.transform = `translate(${-currentScrollX}px, ${-currentScrollY}px)`;

  // wrapGallery();

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

  return (
    rect.left <= screenWidth &&
    rect.right >= 0 &&
    rect.top <= screenHeight &&
    rect.bottom >= 0
  );
}

// centerGallery();
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

//**  MASONRY **//

function createMasonryLayout(container, items, imgWidth, margin) {
  // Tableau pour stocker la hauteur de chaque colonne
  let columnHeights = new Array(galleryColumns).fill(0);

  items.forEach((item) => {
    // Index de la colonne avec la plus petite hauteur
    const minColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

    // Calcul des positions en tenant compte de la largeur de la colonne et des marges
    const x = minColumnIndex * galleryColumnWidth;
    const y = columnHeights[minColumnIndex];

    // Positionnement absolu de l'image
    item.style.position = "absolute";
    item.style.left = `${x + margin}px`; // Ajout de la marge à gauche
    item.style.top = `${y + margin}px`; // Ajout de la marge en haut

    // Mise à jour de la hauteur de la colonne après l'ajout de l'image
    columnHeights[minColumnIndex] += item.offsetHeight + 2 * margin;
  });

  // Met à jour la hauteur du container en fonction de la plus haute colonne
  const maxHeight = Math.max(...columnHeights);
  // container.style.height = `${maxHeight}px`;
}

function duplicateAndShiftImages(container, items, galleryWidth) {
  items.forEach((item) => {
    // Dupliquer chaque image
    const clonedItem = item.cloneNode(true);
    container.appendChild(clonedItem);

    // Récupérer la position actuelle de l'image originale
    const originalLeft = parseFloat(item.style.left);

    // Positionner la copie avant l'image originale
    clonedItem.style.position = "absolute";
    clonedItem.style.left = `${originalLeft - galleryWidth}px`; // Décalage à gauche
    clonedItem.style.top = item.style.top; // Garder la même hauteur
  });
}

window.addEventListener("load", () => {
  // Appel de la fonction Masonry avec la largeur de l'écran
  createMasonryLayout(gallery, images, imgWidth, imageMargin);
  duplicateAndShiftImages(gallery, images, galleryWidth);

  // Ré-ajustement lors du redimensionnement de la fenêtre
  window.addEventListener("resize", () => {
    createMasonryLayout(gallery, images, imgWidth, imageMargin);
    duplicateAndShiftImages(gallery, images, galleryWidth);
  });
});
