const imagesSrcRandom = [
  "https://images.pexels.com/photos/6471779/pexels-photo-6471779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/28754972/pexels-photo-28754972/free-photo-of-beautiful-desert-dunes-meeting-the-ocean.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/27219297/pexels-photo-27219297/free-photo-of-malta.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/28951416/pexels-photo-28951416/free-photo-of-vintage-roller-skates-with-disco-theme.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/16194085/pexels-photo-16194085/free-photo-of-pile-of-lemons.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/28905934/pexels-photo-28905934/free-photo-of-charming-waterway-in-venice-s-historic-district.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/28180163/pexels-photo-28180163/free-photo-of-lavender-field-in-the-lavender-fields-of-provence.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/28975090/pexels-photo-28975090/free-photo-of-tranquil-boat-ride-on-yamuna-river-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/28939359/pexels-photo-28939359/free-photo-of-flock-of-birds-in-flight-against-cloudy-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/28833015/pexels-photo-28833015/free-photo-of-golden-autumn-foliage-on-a-sunny-day.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2516418/pexels-photo-2516418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://www.schmittcolin.com/static/media/cusco-street_alley.e0fdf0a7.jpg",
  "https://www.schmittcolin.com/static/media/cusco-vinicunca_autoportrait.3e274ebe.jpg",
  "https://www.schmittcolin.com/static/media/yacht_moon_sunset.9c0993de.jpg",
  "https://images.pexels.com/photos/28584797/pexels-photo-28584797/free-photo-of-elegant-coffee-cup-with-yellow-tulip-on-table.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/20414000/pexels-photo-20414000/free-photo-of-gentoo-penguin-on-snow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const container = document.querySelector(".container");
const gallery = document.querySelector(".gallery");
const images = Array.from(document.querySelectorAll(".archive-image"));

const imagesDisplayed = []; // {domElem: HTMLElem, yPosition:}

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

let lastLoggedScrollPosition = 0;
const addRowImagesScrollThreshold = 50;

let negativeColumnHeights = [];
let columnHeights = []; // On garde ce tableau global pour suivre les hauteurs des colonnes.

const imgWidth = 277; // Largeur fixe des images
const imageMargin = 15; // Marge de 15px autour de chaque image

// Calculer le nombre de colonnes en fonction de la largeur de l'écran + 1 colonne
const galleryColumnsCount =
  Math.ceil(screenWidth / (imgWidth + 2 * imageMargin)) + 1;
// Largeur d'une colonne (image + marges horizontales)
const galleryColumnWidth = imgWidth + 2 * imageMargin;
const galleryWidth = galleryColumnsCount * galleryColumnWidth;

let isDragging = false;
let currentScrollX = -window.innerWidth / 2;
let currentScrollY = 0;
let targetScrollX = -window.innerWidth / 2;
let targetScrollY = 0;

const smoothFactor = 0.1;
const dragSmoothFactor = 2;

// Suivre les images repositionnées et leur direction
const repositionedImages = new Map(); // { x: number, y: number, direction: string }

let lastScrollDirection = ""; // 'horizontal', 'vertical', or ''

function wrapGallery() {
  // Repositionnement horizontal (X)

  if (currentScrollX < -galleryWidth) {
    console.log("left");
    const offset = galleryWidth;
    targetScrollX += offset;
    currentScrollX += offset;
  }
  // Si plus de la moitié de la galerie sort de la vue à droite
  else if (currentScrollX > galleryWidth - window.innerWidth) {
    const offset = galleryWidth;

    targetScrollX -= offset;
    currentScrollX -= offset;

    // Repositionne la galerie vers la gauche
    // gsap.set(gallery, { x: currentScrollX });
  }
}

function smoothScroll() {
  currentScrollX += (targetScrollX - currentScrollX) * smoothFactor;
  currentScrollY += (targetScrollY - currentScrollY) * smoothFactor;

  gallery.style.transform = `translate(${-currentScrollX}px, ${-currentScrollY}px)`;

  const currentScrollPosition = Math.floor(
    currentScrollY / addRowImagesScrollThreshold
  );
  if (currentScrollPosition !== lastLoggedScrollPosition) {
    const newImgSrc =
      imagesSrcRandom[Math.floor(Math.random() * imagesSrcRandom.length)];
    if (currentScrollPosition > lastLoggedScrollPosition) {
      addImageToGalleryBottom(newImgSrc);
    } else {
      addImageToGalleryTop(newImgSrc);
    }
    lastLoggedScrollPosition = currentScrollPosition;
  }

  wrapGallery();

  requestAnimationFrame(smoothScroll);
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
  const deltaX = (startX - event.pageX) * dragSmoothFactor; // Inversion horizontale
  const deltaY = (startY - event.pageY) * dragSmoothFactor; // Inversion verticale

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

function createMasonryLayout(items) {
  // Tableau pour stocker la hauteur de chaque colonne
  columnHeights = new Array(galleryColumnsCount).fill(0);
  negativeColumnHeights = Array(galleryColumnsCount).fill(0);

  items.forEach((item) => {
    // Index de la colonne avec la plus petite hauteur
    const minColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

    // Calcul des positions en tenant compte de la largeur de la colonne et des marges
    const x = minColumnIndex * galleryColumnWidth;
    const y = columnHeights[minColumnIndex];

    // Positionnement absolu de l'image
    item.style.position = "absolute";
    item.style.left = `${x + imageMargin}px`; // Ajout de la marge à gauche
    item.style.top = `${y + imageMargin}px`; // Ajout de la marge en haut

    // Mise à jour de la hauteur de la colonne après l'ajout de l'image
    columnHeights[minColumnIndex] += item.offsetHeight + 2 * imageMargin;
  });
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

// Fonction pour ajouter dynamiquement une image sans recalculer tout le layout
const addImageToGalleryBottom = (imgSrc) => {
  return new Promise((resolve) => {
    const newImage = document.createElement("img");
    newImage.className = "archive-image";
    newImage.src = imgSrc;
    newImage.style.width = `${imgWidth}px`;
    newImage.style.opacity = 0;

    gallery.appendChild(newImage);

    // Récupérer l'index de la colonne avec la plus petite hauteur
    const minColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

    // Calcul de la position de l'image
    const columnWidth = imgWidth + 2 * imageMargin;
    const x = minColumnIndex * columnWidth;
    const y = columnHeights[minColumnIndex];
    const top = y + imageMargin;

    // Positionner l'image nouvellement ajoutée
    newImage.style.position = "absolute";
    newImage.style.left = `${x + imageMargin}px`;
    newImage.style.top = `${top}px`;

    // Mettre à jour la hauteur de la colonne après l'ajout de la nouvelle image
    newImage.onload = () => {
      const imgHeight = newImage.offsetHeight + 2 * imageMargin;
      columnHeights[minColumnIndex] += imgHeight;

      newImage.style.opacity = 1;

      // Créer une copie de l'image et la positionner à gauche (en négatif)
      const clonedImage = newImage.cloneNode(true);
      gallery.appendChild(clonedImage);

      // Positionner l'image dupliquée avant l'image originale
      clonedImage.style.position = "absolute";
      clonedImage.style.left = `${x + imageMargin - galleryWidth}px`; // Décalage à gauche
      clonedImage.style.top = `${top}px`; // Même position verticale

      imagesDisplayed.push({
        elem: newImage,
        clone: clonedImage,
        yPosition: top,
      });

      resolve();
    };
  });
};

function addImageToGalleryTop(imgSrc) {
  // Créer l'image à ajouter
  const newImage = document.createElement("img");
  newImage.className = "archive-image";
  newImage.src = imgSrc;
  newImage.style.opacity = 0;
  newImage.style.width = `${imgWidth}px`;

  // Ajouter l'image dans le DOM
  gallery.appendChild(newImage);
  // Récupérer l'index de la colonne avec la plus petite "hauteur négative" (pour les nouvelles images au-dessus)
  const minColumnIndex = negativeColumnHeights.indexOf(
    Math.min(...negativeColumnHeights)
  );

  // Calculer la largeur d'une colonne
  const columnWidth = imgWidth + 2 * imageMargin;

  // Calculer la position de la nouvelle image
  const x = minColumnIndex * columnWidth;

  // Positionner l'image nouvellement ajoutée
  newImage.style.position = "absolute";
  newImage.style.left = `${x + imageMargin}px`;

  // Mettre à jour la hauteur négative de la colonne où l'image a été ajoutée
  newImage.onload = () => {
    // position
    const y = -negativeColumnHeights[minColumnIndex] - newImage.offsetHeight; // Position en top négatif
    const top = y - imageMargin;
    newImage.style.top = `${top}px`; // Top négatif pour placer l'image au-dessus

    negativeColumnHeights[minColumnIndex] = -y + imageMargin;
    newImage.style.opacity = 1;

    // Créer une copie de l'image et la positionner à gauche (en négatif)
    const clonedImage = newImage.cloneNode(true);
    gallery.appendChild(clonedImage);

    // Positionner l'image dupliquée avant l'image originale
    clonedImage.style.position = "absolute";
    clonedImage.style.left = `${x + imageMargin - galleryWidth}px`; // Décalage à gauche
    clonedImage.style.top = `${y - imageMargin}px`; // Même position verticale

    imagesDisplayed.push({
      elem: newImage,
      clone: clonedImage,
      yPosition: top,
    });
  };
}

const addRowImagesTop = async () => {
  for (let index = 0; index < galleryColumnsCount; index++) {
    const imgSrc =
      imagesSrcRandom[Math.floor(Math.random() * imagesSrcRandom.length)];
    await addImageToGalleryTop(imgSrc);
  }
};
const addRowImagesBottom = async () => {
  for (let index = 0; index < galleryColumnsCount; index++) {
    const imgSrc =
      imagesSrcRandom[Math.floor(Math.random() * imagesSrcRandom.length)];
    await addImageToGalleryBottom(imgSrc);
  }
};
const removeRowImagesTop = () => {
  const sortedImages = imagesDisplayed.sort(
    (a, b) => b.yPosition - a.yPosition
  );

  // Retourner les x premiers éléments du tableau trié
  const imagesToRemove = sortedImages.slice(0, galleryColumnsCount);

  imagesToRemove.forEach((image) => {
    console.log("image", image, image.elem);
    if (image.elem && image.elem.remove) {
      image.elem.remove(); // Supprime l'élément du DOM
    }
  });

  // imagesDisplayed = imagesDisplayed.filter(image => !topXImages.includes(image));
};

window.addEventListener("load", () => {
  // Appel de la fonction Masonry avec la largeur de l'écran
  createMasonryLayout(images);
  duplicateAndShiftImages(gallery, images, galleryWidth);

  // Exemple d'ajout dynamique d'une image
  document.getElementById("addImageButtonTop").addEventListener("click", () => {
    const newImgSrc =
      imagesSrcRandom[Math.floor(Math.random() * imagesSrcRandom.length)];
    addRowImagesTop(newImgSrc);
  });
  document
    .getElementById("addImageButtonBottom")
    .addEventListener("click", () => {
      const newImgSrc =
        imagesSrcRandom[Math.floor(Math.random() * imagesSrcRandom.length)];
      addRowImagesBottom(newImgSrc);
    });

  // Ré-ajustement lors du redimensionnement de la fenêtre
  window.addEventListener("resize", () => {
    createMasonryLayout(images);
    duplicateAndShiftImages(gallery, images, galleryWidth);
  });
});

//todo  download image and infos from .hidden-gallery class
