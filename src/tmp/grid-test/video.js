// Configuration
let MIN_GAP = 30; // Espacement minimum entre les images en pixels
let MAX_OFFSET = 60; // Offset maximum depuis le centre du wrapper (en pixels)
const MAX_ATTEMPTS = 300;
let PARALLAX_STRENGTH = 10;
let HOVER_SCALE = 1.5;

// Stocker les offsets originaux et la force de parallax de chaque image
const imageOffsets = new Map();
const imageParallaxForce = new Map();
const imageHoverState = new Map(); // Stocker l'état de hover

// Fonction pour vérifier si deux rectangles se chevauchent
function checkCollision(rect1, rect2, minGap = MIN_GAP) {
  return !(
    rect1.right + minGap < rect2.left ||
    rect1.left > rect2.right + minGap ||
    rect1.bottom + minGap < rect2.top ||
    rect1.top > rect2.bottom + minGap
  );
}

// Fonction pour calculer la position finale d'une image avec offset
function calculateImageBounds(wrapper, image, offsetX, offsetY) {
  const originalTransform = image.style.transform;
  image.style.transform = "translate(-50%, -50%)";

  const wrapperRect = wrapper.getBoundingClientRect();
  const imageRect = image.getBoundingClientRect();

  image.style.transform = originalTransform;

  const centerX = wrapperRect.left + wrapperRect.width / 2;
  const centerY = wrapperRect.top + wrapperRect.height / 2;

  const finalLeft = centerX + offsetX - imageRect.width / 2;
  const finalTop = centerY + offsetY - imageRect.height / 2;

  return {
    left: finalLeft,
    top: finalTop,
    right: finalLeft + imageRect.width,
    bottom: finalTop + imageRect.height,
    width: imageRect.width,
    height: imageRect.height,
  };
}

// Fonction pour vérifier si l'image reste dans les limites du grid (en excluant le padding)
function isWithinGridBounds(imageBounds, gridRect, margin = 10) {
  const gridContainer = document.querySelector(".test-grid-grid");
  const computedStyle = window.getComputedStyle(gridContainer);
  const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
  const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
  const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
  const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;

  const availableLeft = gridRect.left + paddingLeft;
  const availableRight = gridRect.right - paddingRight;
  const availableTop = gridRect.top + paddingTop;
  const availableBottom = gridRect.bottom - paddingBottom;

  return (
    imageBounds.left >= availableLeft + margin &&
    imageBounds.right <= availableRight - margin &&
    imageBounds.top >= availableTop + margin &&
    imageBounds.bottom <= availableBottom - margin
  );
}

// Fonction pour randomiser les positions
function randomizeGridImages() {
  const images = document.querySelectorAll(".test-grid-video");
  const gridContainer = document.querySelector(".test-grid-grid");

  if (!gridContainer) {
    console.error("Container .test-grid-grid non trouvé");
    return;
  }

  const gridRect = gridContainer.getBoundingClientRect();
  const placedImages = [];
  let successCount = 0;

  images.forEach((image, index) => {
    const wrapper = image.closest(".test-grid-image-wrapper");
    if (!wrapper) return;

    let placed = false;
    let attempts = 0;

    while (!placed && attempts < MAX_ATTEMPTS) {
      attempts++;

      const offsetX = (Math.random() - 0.5) * 2 * MAX_OFFSET;
      const offsetY = (Math.random() - 0.5) * 2 * MAX_OFFSET;

      const imageBounds = calculateImageBounds(
        wrapper,
        image,
        offsetX,
        offsetY
      );

      if (!isWithinGridBounds(imageBounds, gridRect, 10)) {
        continue;
      }

      let hasCollision = false;
      for (const placedImage of placedImages) {
        if (checkCollision(imageBounds, placedImage)) {
          hasCollision = true;
          break;
        }
      }

      if (!hasCollision) {
        // Ajouter une transition smooth
        image.style.transition =
          "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        image.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`;
        placedImages.push(imageBounds);
        placed = true;
        successCount++;

        // Stocker les offsets originaux pour le parallax
        imageOffsets.set(image, { x: offsetX, y: offsetY });
        // Générer une force de parallax aléatoire pour chaque image (entre 0.5 et 1.5)
        imageParallaxForce.set(image, 0.5 + Math.random());
        // imageParallaxForce.set(image, 1);
      }
    }

    if (!placed) {
      image.style.transition =
        "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      image.style.transform = "translate(-50%, -50%)";
      const imageBounds = calculateImageBounds(wrapper, image, 0, 0);
      if (isWithinGridBounds(imageBounds, gridRect, 10)) {
        placedImages.push(imageBounds);
      }

      // Stocker les offsets originaux (0,0) pour le parallax
      imageOffsets.set(image, { x: 0, y: 0 });
      imageParallaxForce.set(image, 0.5 + Math.random());
    }
  });

  console.log(`✅ ${successCount}/${images.length} images randomisées`);
}

function updateTransformOrigins() {
  const gridContainer = document.querySelector(".test-grid-grid");
  const gridRect = gridContainer.getBoundingClientRect();
  const images = document.querySelectorAll(".test-grid-video");

  const thirdWidth = gridRect.width / 3;
  const thirdHeight = gridRect.height / 3;

  images.forEach((image) => {
    const wrapper = image.closest(".test-grid-image-wrapper");
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();

    // Coordonnées du centre de l'image
    const centerX = rect.left + rect.width / 2 - gridRect.left;
    const centerY = rect.top + rect.height / 2 - gridRect.top;

    // Déterminer la zone horizontale
    let horizontal;
    if (centerX < thirdWidth) horizontal = "left";
    else if (centerX > 2 * thirdWidth) horizontal = "right";
    else horizontal = "center";

    // Déterminer la zone verticale
    let vertical;
    if (centerY < thirdHeight) vertical = "top";
    else if (centerY > 2 * thirdHeight) vertical = "bottom";
    else vertical = "center";

    const origin = `${vertical} ${horizontal}`;
    image.style.transformOrigin = origin;
  });
}

// Fonction pour activer l'effet parallax
function initParallax() {
  const gridContainer = document.querySelector(".test-grid-grid");
  if (!gridContainer) return;

  gridContainer.addEventListener("mousemove", (e) => {
    const rect = gridContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculer la distance du curseur par rapport au centre (-1 à 1)
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    // Appliquer le parallax à chaque image avec sa propre force
    const images = document.querySelectorAll(".test-grid-video");
    images.forEach((image) => {
      const originalOffset = imageOffsets.get(image);
      const parallaxForce = imageParallaxForce.get(image) || 1;
      const isHovered = imageHoverState.get(image) || false;
      if (!originalOffset) return;

      // Calculer le nouveau offset avec parallax et force variable
      const parallaxX = deltaX * PARALLAX_STRENGTH * parallaxForce;
      const parallaxY = deltaY * PARALLAX_STRENGTH * parallaxForce;

      const newOffsetX = originalOffset.x + parallaxX;
      const newOffsetY = originalOffset.y + parallaxY;

      // Intégrer le scale si l'image est en hover
      const scaleValue = isHovered ? HOVER_SCALE : 1;
      image.style.transform = `translate(-50%, -50%) translate(${newOffsetX}px, ${newOffsetY}px) scale(${scaleValue})`;
    });
  });
}

// Fonction pour initialiser l'effet hover avec zoom
function initHoverEffect() {
  const images = document.querySelectorAll(".test-grid-video");
  const wrappers = document.querySelectorAll(".test-grid-image-wrapper");
  const logo = document.querySelector(".test-grid-logo");

  images.forEach((image) => {
    const wrapper = image.closest(".test-grid-image-wrapper");
    image.style.cursor = "pointer";

    // Ajouter la transition d'opacity sur toutes les images et wrappers
    images.forEach((img) => {
      img.style.transition =
        "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease";
    });
    logo.style.transition = "opacity 0.3s ease";

    image.addEventListener("mouseenter", () => {
      imageHoverState.set(image, true);

      images.forEach((img) => {
        if (img !== image) {
          img.style.opacity = "0.3";
        }
      });
      logo.style.opacity = "0.3";

      // Appliquer le scale immédiatement
      const originalOffset = imageOffsets.get(image);
      if (originalOffset) {
        image.style.transform = `translate(-50%, -50%) translate(${originalOffset.x}px, ${originalOffset.y}px) scale(${HOVER_SCALE})`;
        image.style.transition =
          "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease";
        image.style.zIndex = 4;
      }
    });

    image.addEventListener("mouseleave", () => {
      // Démarquer l'image
      imageHoverState.set(image, false);

      images.forEach((img) => {
        img.style.opacity = "1";
      });
      logo.style.opacity = "1";

      // Remettre à la taille normale
      const originalOffset = imageOffsets.get(image);
      if (originalOffset) {
        image.style.transform = `translate(-50%, -50%) translate(${originalOffset.x}px, ${originalOffset.y}px) scale(1)`;
        image.style.transition =
          "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease";
        image.style.zIndex = 1;
      }
    });
  });
}

// Fonction pour réinitialiser toutes les positions au centre
function resetPositions() {
  const images = document.querySelectorAll(".test-grid-video");
  images.forEach((image) => {
    image.style.transform = "translate(-50%, -50%)";
  });
}

const hideGridDebugStyle = (hide) => {
  const emptyTiles = document.querySelectorAll(".test-grid-empty");
  const imageWrappers = document.querySelectorAll(".test-grid-image-wrapper");

  emptyTiles.forEach((tile) => {
    tile.style.backgroundColor = hide ? "transparent" : "#69a5aa33";
  });
  imageWrappers.forEach((imgWrapper) => {
    imgWrapper.style.backgroundColor = hide ? "transparent" : "brown";
  });
};

// Fonction pour créer l'interface de contrôle
function createControlPanel() {
  const panel = document.createElement("div");
  panel.id = "control-panel";
  panel.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.9);
    padding: 20px;
    border-radius: 10px;
    color: white;
    font-family: Arial, sans-serif;
    z-index: 10000;
    min-width: 280px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  `;

  const gridContainer = document.querySelector(".test-grid-grid");
  const computedStyle = window.getComputedStyle(gridContainer);
  const currentPadding = parseFloat(computedStyle.padding) || 100;
  const currentGap = parseFloat(computedStyle.gap) || 0;

  // Récupérer la taille actuelle des images (en vw)
  const firstImage = document.querySelector(".test-grid-video");
  const currentImageSize = firstImage
    ? (parseFloat(window.getComputedStyle(firstImage).width) /
        window.innerWidth) *
      100
    : 15;

  panel.innerHTML = `
    <div id="panel-header" style="
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  ">
    <span style="font-weight: bold;">Control Panel</span>
    <button id="toggle-panel" style="
      background: none;
      border: none;
      color: white;
      font-size: 16px;
      cursor: pointer;
      padding: 0;
    ">−</button>
  </div>

    <div style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px; font-size: 12px;">
       Grid Padding: <span id="padding-value">${currentPadding}</span>px
      </label>
      <input type="range" id="padding-slider" min="0" max="200" value="${currentPadding}" 
        style="width: 100%;">
    </div>
    
    <div style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px; font-size: 12px;">
        Grid Gap: <span id="gap-value">${currentGap}</span>px
      </label>
      <input type="range" id="gap-slider" min="0" max="100" value="${currentGap}" 
        style="width: 100%;">
    </div>
    
    <div style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px; font-size: 12px;">
         Images Size: <span id="size-value">${currentImageSize.toFixed(
           1
         )}</span>vw
      </label>
      <input type="range" id="size-slider" min="5" max="30" step="0.5" value="${currentImageSize}" 
        style="width: 100%;">
    </div>

    <div style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px; font-size: 12px;">
        Hover Scale: <span id="hover-scale-value">${HOVER_SCALE}</span>x
      </label>
      <input type="range" id="hover-scale-slider" min=".5" max="4" step="0.1" value="${HOVER_SCALE}"
        style="width: 100%;">
    </div>

    
    <div style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px; font-size: 12px;">
        Max Offset: <span id="offset-value">${MAX_OFFSET}</span>px
      </label>
      <input type="range" id="offset-slider" min="0" max="150" value="${MAX_OFFSET}" 
        style="width: 100%;">
    </div>
    
    <div style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px; font-size: 12px;">
       Collision Min Gap: <span id="mingap-value">${MIN_GAP}</span>px
      </label>
      <input type="range" id="mingap-slider" min="0" max="100" value="${MIN_GAP}" 
        style="width: 100%;">
    </div>

     <div style="margin-bottom: 15px; display: inline-flex; justify-content: center; align-items: center; gap: .4rem;">
    <input checked type="checkbox" id="hide-style-checkbox" name="hide-style-checkbox" />
    <label for="hide-style-checkbox" style="margin-bottom: 0;">Hide style</label>
  </div>
    
    <button id="regenerate-btn" style="
      width: 100%;
      padding: 10px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 10px;
    ">Regenerate</button>
    
    <button id="shuffle-videos-btn" style="
      width: 100%;
      padding: 10px;
      background: #36def4ff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      margin-bottom: 10px;
    ">Shuffle videos</button>

    <button id="reset-btn" style="
      width: 100%;
      padding: 10px;
      background: #f44336;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
    ">Reset positions</button>
  `;

  document.body.appendChild(panel);

  // Event listeners pour les sliders
  const paddingSlider = document.getElementById("padding-slider");
  const paddingValue = document.getElementById("padding-value");
  paddingSlider.addEventListener("input", (e) => {
    const value = e.target.value;
    paddingValue.textContent = value;
    gridContainer.style.padding = `${value}px`;
    randomizeGridImages();
  });

  const gapSlider = document.getElementById("gap-slider");
  const gapValue = document.getElementById("gap-value");
  gapSlider.addEventListener("input", (e) => {
    const value = e.target.value;
    gapValue.textContent = value;
    gridContainer.style.gap = `${value}px`;
    randomizeGridImages();
  });

  // image size
  const sizeSlider = document.getElementById("size-slider");
  const sizeValue = document.getElementById("size-value");
  sizeSlider.addEventListener("input", (e) => {
    const value = e.target.value;
    sizeValue.textContent = parseFloat(value).toFixed(1);
    const images = document.querySelectorAll(".test-grid-video");
    images.forEach((img) => {
      if (img.classList.contains("_16-9")) {
        // portrait
        img.style.width = `${value}vw`;
        img.style.height = "auto";
      } else {
        // landscape
        img.style.height = `${value}vw`;
        img.style.width = "auto";
      }
    });
    randomizeGridImages();
  });

  // hover scale
  const hoverScaleSlider = document.getElementById("hover-scale-slider");
  const hoverScaleValue = document.getElementById("hover-scale-value");
  hoverScaleSlider.addEventListener("input", (e) => {
    const value = parseFloat(e.target.value);
    hoverScaleValue.textContent = value.toFixed(1);
    HOVER_SCALE = value;
  });

  const offsetSlider = document.getElementById("offset-slider");
  const offsetValue = document.getElementById("offset-value");
  offsetSlider.addEventListener("input", (e) => {
    const value = e.target.value;
    offsetValue.textContent = value;
    MAX_OFFSET = parseInt(value);
    randomizeGridImages();
  });

  const mingapSlider = document.getElementById("mingap-slider");
  const mingapValue = document.getElementById("mingap-value");
  mingapSlider.addEventListener("input", (e) => {
    const value = e.target.value;
    mingapValue.textContent = value;
    MIN_GAP = parseInt(value);
    randomizeGridImages();
  });

  // Hide Grid Debug Style
  const hideStyleCheckbox = document.getElementById("hide-style-checkbox");
  hideStyleCheckbox.addEventListener("change", (event) => {
    const isChecked = event.target.checked;
    hideGridDebugStyle(isChecked);
  });

  // Bouton régénérer
  document.getElementById("regenerate-btn").addEventListener("click", () => {
    randomizeGridImages();
  });

  const shuffleBtn = document.getElementById("shuffle-videos-btn");
  shuffleBtn.addEventListener("click", () => {
    const wrappers = Array.from(
      document.querySelectorAll(".test-grid-image-wrapper")
    );
    const videos = wrappers.map((w) => w.querySelector(".test-grid-video"));

    for (let i = videos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [videos[i], videos[j]] = [videos[j], videos[i]];
    }

    wrappers.forEach((wrapper, i) => {
      const currentVideo = wrapper.querySelector(".test-grid-video");
      const targetVideo = videos[i];

      if (currentVideo && targetVideo && currentVideo !== targetVideo) {
        const currentParent = currentVideo.parentNode;
        const targetParent = targetVideo.parentNode;

        const currentPlaceholder = document.createElement("div");
        const targetPlaceholder = document.createElement("div");

        currentParent.replaceChild(currentPlaceholder, currentVideo);
        targetParent.replaceChild(targetPlaceholder, targetVideo);

        currentParent.replaceChild(targetVideo, currentPlaceholder);
        targetParent.replaceChild(currentVideo, targetPlaceholder);
      }
    });
    console.log("✅ Vidéos échangées entre wrappers (vraiment échangées) !");
    randomizeGridImages();
    updateTransformOrigins();
  });

  // Bouton reset
  document.getElementById("reset-btn").addEventListener("click", () => {
    resetPositions();
  });

  // hide menu
  const toggleBtn = document.getElementById("toggle-panel");
  toggleBtn.addEventListener("click", () => {
    panel.classList.toggle("collapsed");

    if (panel.classList.contains("collapsed")) {
      panel.style.height = "auto";
      panel.style.overflow = "hidden";
      panel.querySelectorAll(":scope > *:not(#panel-header)").forEach((el) => {
        el.style.display = "none";
      });
      toggleBtn.textContent = "+";
    } else {
      panel.querySelectorAll(":scope > *").forEach((el) => {
        el.style.display = "";
      });
      toggleBtn.textContent = "−";
    }
  });
}

// Lancer la randomisation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    hideGridDebugStyle(true);
  }, 0);

  setTimeout(() => {
    createControlPanel();
    randomizeGridImages();
    updateTransformOrigins();
    initParallax();
    initHoverEffect();
  }, 200);
});

// Re-randomiser au redimensionnement de la fenêtre
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    randomizeGridImages();
    updateTransformOrigins();
  }, 500);
});

// Exporter les fonctions
window.randomizeGridImages = randomizeGridImages;
window.resetPositions = resetPositions;
