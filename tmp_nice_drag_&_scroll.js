const scrollContainer = document.querySelector(".container");
const content = document.querySelector(".gallery");

let currentScrollX = 0;
let currentScrollY = 0;
let targetScrollX = 0;
let targetScrollY = 0;

const smoothFactor = 0.1;

let isDragging = false;
let startX = 0;
let startY = 0;
let initialScrollX = 0; // Sauvegarde du scroll initial
let initialScrollY = 0; // Sauvegarde du scroll initial

// Fonction pour appliquer un défilement fluide
function smoothScroll() {
  currentScrollX += (targetScrollX - currentScrollX) * smoothFactor;
  currentScrollY += (targetScrollY - currentScrollY) * smoothFactor;

  gallery.style.transform = `translate(${-currentScrollX}px, ${-currentScrollY}px)`;

  requestAnimationFrame(smoothScroll);
}

// Initialisation du smooth scroll
smoothScroll();

// Capture du scroll de la souris
container.addEventListener("wheel", (event) => {
  targetScrollX += event.deltaX;
  targetScrollY += event.deltaY;

  // targetScrollX = Math.max(
  //   0,
  //   Math.min(targetScrollX, content.offsetWidth - scrollContainer.offsetWidth)
  // );
  // targetScrollY = Math.max(
  //   0,
  //   Math.min(targetScrollY, content.offsetHeight - scrollContainer.offsetHeight)
  // );
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
  //   Math.min(targetScrollX, content.offsetWidth - scrollContainer.offsetWidth)
  // );
  // targetScrollY = Math.max(
  //   0,
  //   Math.min(targetScrollY, content.offsetHeight - scrollContainer.offsetHeight)
  // );
});

container.addEventListener("mouseup", () => {
  isDragging = false;
  container.style.cursor = "grab"; // Retour au curseur normal après drag
});

container.addEventListener("mouseleave", () => {
  isDragging = false; // Arrêter le drag si la souris quitte la zone
  container.style.cursor = "grab";
});
