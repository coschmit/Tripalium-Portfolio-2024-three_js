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

      const { x, y, z } = intersectedMarker.parent.position;
      const tinySpherePosition = new THREE.Vector3(x, y, z);

      const spherical = new THREE.Spherical();
      spherical.setFromVector3(tinySpherePosition);

      const radius = 9;

      const cameraSpherical = new THREE.Spherical(
        radius,
        spherical.phi, // vertical angle
        spherical.theta // horizontal angle
      );

      const cameraPosition = new THREE.Vector3();
      cameraPosition.setFromSpherical(cameraSpherical);
      // app.camera.position.set(
      //   cameraPosition.x,
      //   cameraPosition.y,
      //   cameraPosition.z
      // );

      // const angle = Math.PI / 2;
      // const positionX = x + radius * Math.sin(angle);
      // const positionY = y + radius * Math.sin(angle);
      // const positionZ = z + radius * Math.cos(angle);
      // // const positionX =  9 * Math.sin(angle);
      // // const positionY =  9 * Math.sin(angle);
      // // const positionZ =  9 * Math.cos(angle);

      // app.camera.position.x = positionX;
      // app.camera.position.y = positionY;
      // app.camera.position.z = positionZ;

      // return;
      // var targetPoint = new THREE.Vector3(positionX, 0, positionZ + 8);
      // var targetPoint = new THREE.Vector3(2, 0, 9);
      let animation = gsap.to(app.camera.position, {
        duration: 2,
        x: cameraPosition.x,
        y: cameraPosition.y,
        z: cameraPosition.z,
        onStart: () => {
          // app.controls.enabled = false;
        },
        onComplete: () => {
          // app.controls.enabled = true;
          animation = null;
        },
        onUpdate: function () {
          app.camera.lookAt(0, 0, 0);
          app.controls.update();
        },
      });

      app.controls.addEventListener("start", function () {
        if (animation) {
          animation.kill();
        }
      });
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

const update = () => {};
