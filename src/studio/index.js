import * as THREE from "three";
import { App } from "./App.js";

import { config, elements, groups } from "./config.js";
import { Globe } from "./Globe.js";
import { Markers } from "./Markers.js";
import { handleMarkerHover } from "./Markers.js";
import { debounce, handleCanvasProfileOver, updateClocks } from "./utils.js";

// 0xe51111

const setup = (app) => {
  groups.main = new THREE.Group();

  // GLOBE
  const globe = new Globe();
  app.globe = globe;
  groups.main.add(groups.globe);

  // MARKERS
  const markers = new Markers();
  app.markers = markers;
  groups.main.add(groups.markers);

  handleCanvasProfileOver(app);
};

const animate = (app) => {
  if (elements.markers) {
    for (let i = 0; i < elements.markers.length; i++) {
      const marker = elements.markers[i];
      // marker.point.material.color.set(config.colors.globeMarkerColor);
      // marker.glow.material.color.set(config.colors.globeMarkerGlow);
      marker.animateGlow();
    }
  }
};

const onPointerMove = (app) => {
  handleMarkerHover(app);
};

const app = new App({ setup, animate, onPointerMove });

window.onload = app.init;
window.onresize = debounce(app.resizeCanvas, 500);

var splide1 = new Splide("#studio-profile-splide-paul", {
  type: "slide",
  drag: "free",
  gap: "20px",
  snap: true,
  breakpoints: {
    991: {
      gap: "16px",
    },
    478: {
      gap: "10px",
    },
  },
  autoScroll: {
    speed: 2,
  },
});

var splide2 = new Splide("#studio-profile-splide-colin", {
  type: "slide",
  drag: "free",
  gap: "20px",
  snap: true,
  breakpoints: {
    991: {
      gap: "16px",
    },
    478: {
      gap: "10px",
    },
  },
  autoScroll: {
    speed: 2,
  },
});

splide1.mount();
splide2.mount();

function updateStudioProfileClocks() {
  const clocksElement = document.querySelectorAll(
    ".profile-detail-info-clock > div"
  );

  updateClocks(clocksElement, ["Europe/Paris", "America/Lima"]);
}

updateStudioProfileClocks();
setInterval(updateStudioProfileClocks, 30_000);

//********* PROFILE OVERLAY *********//

const handleDisplayCanvasProfile = (event) => {
  const dataValue = event?.currentTarget?.dataset?.value;
  if (dataValue) {
    const overlay = document.querySelector(
      `.profile-detail-overlay.${dataValue}`
    );

    if (overlay) {
      overlay.style.display = "block";
      gsap.to(overlay, { duration: 0.5, opacity: 1 });
    }
  }
};

const handleCloseCanvasProfile = (event) => {
  const openedOverlay = [
    ...document.querySelectorAll(".profile-detail-overlay"),
  ].find((elem) => elem.style.display === "block");

  gsap.to(openedOverlay, {
    duration: 0.4,
    opacity: 0,
    onComplete: function () {
      openedOverlay.style.display = "none";
    },
  });
};

//*** display profile overlay ***//
const canvasProfiles = document.querySelectorAll(".canvas-profile");
canvasProfiles.forEach((canvasProfile) => {
  canvasProfile.addEventListener("click", handleDisplayCanvasProfile);
});

//*** hide profile overlay ***//
//TODO update with the real close button
const profileDetailsNames = document.querySelectorAll(
  ".profile-detail-info-name"
);
profileDetailsNames.forEach((profileDetailsName) => {
  profileDetailsName.addEventListener("click", handleCloseCanvasProfile);
});
