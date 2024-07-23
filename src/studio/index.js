import * as THREE from "three";
import { App } from "./App.js";

import { elements, groups } from "./config.js";
import { Globe } from "./Globe.js";
import { Markers } from "./Markers.js";
import { handleMarkerHover } from "./Markers.js";
import {
  debounce,
  handleCanvasProfileOver,
  setStaticEarthCircleSize,
} from "./utils.js";

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

const onCanvasReady = () => {
  setStaticEarthCircleSize();
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

const app = new App({ setup, animate, onPointerMove, onCanvasReady });

window.onload = app.init;

window.onresize = debounce(app.resizeCanvas, 500);
