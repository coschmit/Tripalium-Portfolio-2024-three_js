import * as THREE from "three";
import { App } from "./App.js";

import { config, elements, groups } from "./config.js";
import { Globe } from "./Globe.js";
import { Markers } from "./Markers.js";
import { animateFocusMarkerLocation, handleMarkerHover } from "./Markers.js";
import { handleCanvasProfileOver } from "./utils.js";

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
window.onresize = app.handleResize;

const update = () => {};
