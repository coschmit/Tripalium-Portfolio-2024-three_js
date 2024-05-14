import * as THREE from "three";

import { App } from "./App.js";

import { groups } from "./config.js";
import { Globe } from "./Globe.js";
import { Markers } from "./Markers.js";
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
};

const animate = (app) => {};

const onPointerMove = (app) => {
  const intersects = app.raycaster.intersectObjects(groups.markers.children);

  if (intersects.length > 0) {
    const intersectedMarker = intersects[0].object;

    if (app.markers.hoveredMarker !== intersectedMarker) {
      // Si une sphère était précédemment survolée, remettre sa couleur à rouge
      if (app.markers.hoveredMarker) {
        app.markers.hoveredMarker.material.color.set(0x00ff00);
      }

      // Stocker la référence de la nouvelle sphère survolée
      app.markers.hoveredMarker = intersectedMarker;

      // Changer la couleur de la nouvelle sphère survolée en vert
      app.markers.hoveredMarker.material.color.set(0x1a94fa);
    }
  } else {
    // Si aucune sphère n'est survolée, remettre la couleur de la sphère survolée à rouge
    if (app.markers.hoveredMarker) {
      app.markers.hoveredMarker.material.color.set(0x00ff00);
      app.markers.hoveredMarker = null; // Réinitialiser la référence de la sphère survolée
    }
  }
};

const app = new App({ setup, animate, onPointerMove });

window.onload = app.init;
window.onresize = app.handleResize;
