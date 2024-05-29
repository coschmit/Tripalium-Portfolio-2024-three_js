import * as THREE from "three";
import { config, elements, groups, markersConfig } from "./config.js";
import { Marker, animateOverlayOpacity } from "./Marker.js";
import { toSphereCoordinates } from "./utils.js";

export class Markers {
  constructor() {
    //todo TO DEFINE
    this.radius = 1;
    //   config.sizes.globe + config.sizes.globe * config.scale.markers;
    //todo TO DEFINE

    this.hoveredMarker = null;
    this.markers = [];

    this.focusAnimated = false;

    groups.markers = new THREE.Group();
    groups.markers.name = "GlobeMarkers";

    this.markerGeometry = new THREE.SphereGeometry(0.04, 15, 15);
    this.markerMaterial = new THREE.MeshBasicMaterial({ color: 0x3dfa1a });
    this.markerMaterial.transparent = true;
    this.markerMaterial.opacity = 0.8;

    this.create();
  }

  create = () => {
    for (let i = 0; i < markersConfig.length; i++) {
      const markerConfig = markersConfig[i];

      const lat = +markerConfig.latitude;
      const lng = +markerConfig.longitude;

      const cords = toSphereCoordinates(lat, lng, this.radius);

      const marker = new Marker(
        this.markerGeometry,
        this.markerMaterial,
        markerConfig.id,
        markerConfig.label,
        cords,
        markerConfig.overlayData
      );
      groups.markers.add(marker.group);
      this.markers.push(marker);
      elements.markers.push(marker);
    }
  };
}

export const handleMarkerHover = (app) => {
  const intersects = app.raycaster.intersectObjects(groups.markers.children);

  if (intersects.length > 0) {
    const intersectedMarker = intersects[0].object;

    if (app.markers.hoveredMarker !== intersectedMarker) {
      if (app.markers.hoveredMarker) {
        app.markers.hoveredMarker.material.color.set(
          config.colors.globeMarkerColor
        );
      }

      app.markers.hoveredMarker = intersectedMarker;

      app.markers.hoveredMarker.material.color.set(
        config.colors.globeMarkerColorHovered
      );

      const hoveredMarker = app.markers.markers.find(
        (marker) => marker.name === intersectedMarker.name
      );
      if (hoveredMarker) {
        hoveredMarker.displayOverlay();
      }
    }
  } else {
    if (app.markers.hoveredMarker) {
      const overlaysActive = app.markers.markers.filter(
        (marker) => marker.overlayActive === true
      );
      overlaysActive.forEach((overlay) => {
        overlay.hideOverlay();
      });

      app.markers.hoveredMarker.material.color.set(
        config.colors.globeMarkerColor
      );
      app.markers.hoveredMarker = null; // reset the hovered sphere ref
    }
  }
};

// positions: THREE.Vector3
export const animateFocusMarkerLocation = (app, position) => {
  const ANIMATION_DURATION = 2;
  app.markers.focusAnimated = true;
  const { x, y, z } = position;
  const tinySpherePosition = new THREE.Vector3(x, y, z);

  const sphericalTarget = new THREE.Spherical();
  sphericalTarget.setFromVector3(tinySpherePosition);

  const sphericalCurrent = new THREE.Spherical();
  sphericalCurrent.setFromVector3(app.camera.position);

  const radius = sphericalCurrent.radius;

  const sphericalDelta = {
    phi: sphericalTarget.phi - sphericalCurrent.phi,
    theta: sphericalTarget.theta - sphericalCurrent.theta,
  };

  app.controls.autoRotate = false;

  let animation = gsap.to(sphericalCurrent, {
    phi: sphericalCurrent.phi + sphericalDelta.phi,
    theta: sphericalCurrent.theta + sphericalDelta.theta,
    duration: ANIMATION_DURATION,
    onUpdate: () => {
      sphericalCurrent.radius = radius;
      const newCameraPosition = new THREE.Vector3();
      newCameraPosition.setFromSpherical(sphericalCurrent);

      app.camera.position.set(
        newCameraPosition.x,
        newCameraPosition.y,
        newCameraPosition.z
      );
      app.camera.lookAt(0, 0, 0);

      app.controls.update();
    },
    onComplete: () => {
      app.markers.focusAnimated = false;
    },
  });

  app.controls.addEventListener("start", function () {
    if (animation) {
      animation.kill();
    }
  });
};

export const unFocusMakerLocation = (app) => {
  // if (app.markers.focusAnimated === false) {
  app.controls.autoRotate = true;
  // }
};
