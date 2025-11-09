let isDragging = false;
let startX, startY;
let currentX = 0,
  currentY = 0;
let velocityX = 0,
  velocityY = 0;
let previousX = 0,
  previousY = 0;
let friction = 0.92; // Le taux de friction pour lisser le mouvement

// Positionner les images aléatoirement
const images = document.querySelectorAll(".archive-image");
const randomPosition = () => {
  images.forEach((img) => {
    img.style.setProperty("--random-top", Math.random());
    img.style.setProperty("--random-left", Math.random());
  });
};

// randomPosition(); // Appel au démarrage

// Utilisation de GSAP Draggable pour le drag smooth
gsap.registerPlugin(Draggable);

const container = document.querySelector(".container");
const gallery = document.querySelector(".gallery");

// Draggable.create(gallery, {
//   type: "x,y", // On dragge dans les deux directions
//   // inertia: true,
//   // dragResistance: 0.4,
//   // resistance: 400,
//   // edgeResistance: 0.5, // Résistance quand on approche des bords
//   // throwProps: true, // Permet d'avoir un mouvement "lancé" fluide
//   // onDrag: wrapGallery, // On réajuste les positions si nécessaire
//   // onThrowUpdate: wrapGallery, // Même pendant le mouvement lancé
// });

function wrapGallery() {
  const containerBounds = document
    .querySelector(".container")
    .getBoundingClientRect();
  const galleryBounds = gallery.getBoundingClientRect();

  // Réglage pour l'axe horizontal
  if (galleryBounds.right < containerBounds.right) {
    gsap.set(gallery, {
      x: "+=" + (containerBounds.width - galleryBounds.width),
    });
  } else if (galleryBounds.left > containerBounds.left) {
    gsap.set(gallery, {
      x: "-=" + (containerBounds.width - galleryBounds.width),
    });
  }

  // Réglage pour l'axe vertical
  if (galleryBounds.bottom < containerBounds.bottom) {
    gsap.set(gallery, {
      y: "+=" + (containerBounds.height - galleryBounds.height),
    });
  } else if (galleryBounds.top > containerBounds.top) {
    gsap.set(gallery, {
      y: "-=" + (containerBounds.height - galleryBounds.height),
    });
  }
}

// Fonction pour commencer le drag
container.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - currentX;
  startY = e.pageY - currentY;

  // Stocker la position initiale
  previousX = e.pageX;
  previousY = e.pageY;

  container.style.cursor = "grabbing";
});

// Fonction pour calculer le déplacement
container.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const deltaX = e.pageX - previousX;
  const deltaY = e.pageY - previousY;

  currentX += deltaX;
  currentY += deltaY;

  // Mise à jour des positions précédentes
  previousX = e.pageX;
  previousY = e.pageY;

  // Déplacer la galerie en fonction du mouvement
  gsap.set(gallery, {
    x: currentX,
    y: currentY,
  });

  // Stocker la vélocité pour l'inertie
  velocityX = deltaX;
  velocityY = deltaY;
});

// Fonction pour arrêter le drag
container.addEventListener("mouseup", () => {
  isDragging = false;
  container.style.cursor = "grab";
});

// Fonction pour ajouter l'inertie au mouvement
function applyMomentum() {
  if (!isDragging) {
    // Ajouter l'inertie au mouvement quand on arrête de dragger
    currentX += velocityX;
    currentY += velocityY;

    velocityX *= friction;
    velocityY *= friction;

    // Déplacer la galerie en conséquence
    gsap.to(gallery, {
      x: currentX,
      y: currentY,
      duration: 0.1, // Ajoute de la fluidité dans la mise à jour
      ease: "power2.out",
    });

    // Répéter si le mouvement n'a pas cessé
    if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
      requestAnimationFrame(applyMomentum);
    }
  }
}

// Lancer l'inertie lorsque le drag est terminé
container.addEventListener("mouseup", () => {
  applyMomentum();
});

// Fonction pour gérer le scroll infini
// function wrapGallery() {
//   const containerBounds = container.getBoundingClientRect();
//   const galleryBounds = gallery.getBoundingClientRect();

//   // Réglage pour l'axe horizontal
//   if (galleryBounds.right < containerBounds.right) {
//     console.log("x - 1");
//     gsap.set(gallery, {
//       x: "+=" + (containerBounds.width - galleryBounds.width),
//     });
//   } else if (galleryBounds.left > containerBounds.left) {
//     console.log("x - 2");

//     gsap.set(gallery, {
//       x: "-=" + (containerBounds.width - galleryBounds.width),
//     });
//   }

//   // Réglage pour l'axe vertical
//   if (galleryBounds.bottom < containerBounds.bottom) {
//     console.log("y - 1");
//     gsap.set(gallery, {
//       y: "+=" + (containerBounds.height - galleryBounds.height),
//     });
//   } else if (galleryBounds.top > containerBounds.top) {
//     console.log("y - 2");
//     gsap.set(gallery, {
//       y: "-=" + (containerBounds.height - galleryBounds.height),
//     });
//   }
// }
function wrapGallery() {
  const containerBounds = container.getBoundingClientRect();
  const galleryBounds = gallery.getBoundingClientRect();

  // Pour l'axe horizontal (X)
  if (galleryBounds.right < containerBounds.left) {
    console.log("aiie");
    // Si la galerie sort du côté gauche, on la téléporte à droite
    // gsap.set(gallery, { x: containerBounds.right });
  } else if (galleryBounds.left > containerBounds.right) {
    // Si la galerie sort du côté droit, on la téléporte à gauche
    // gsap.set(gallery, { x: -galleryBounds.width });
  }

  // Pour l'axe vertical (Y)
  if (galleryBounds.bottom < containerBounds.top) {
    // Si la galerie sort par le haut, on la téléporte en bas
    // gsap.set(gallery, { y: containerBounds.bottom });
  } else if (galleryBounds.top > containerBounds.bottom) {
    // Si la galerie sort par le bas, on la téléporte en haut
    // gsap.set(gallery, { y: -galleryBounds.height });
  }
}

container.addEventListener("mousemove", wrapGallery);
