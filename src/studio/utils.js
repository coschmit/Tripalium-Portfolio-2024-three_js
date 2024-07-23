import {
  BREAKPOINTS,
  CAMERA_SETTINGS,
  groups,
  SPHERE_SCALE,
} from "./config.js";
import { animateFocusMarkerLocation, unFocusMakerLocation } from "./Markers.js";

export const toSphereCoordinates = (lat, lng, scale) => {
  var phi = ((90 - lat) * Math.PI) / 180;
  var theta = ((180 - lng) * Math.PI) / 180;
  var x = scale * Math.sin(phi) * Math.cos(theta);
  var y = scale * Math.cos(phi);
  var z = scale * Math.sin(phi) * Math.sin(theta);
  return { x, y, z };
};

export const handleCanvasProfileOver = (app) => {
  const canvasProfiles = document.querySelectorAll(".canvas-profile");

  canvasProfiles.forEach((canvasProfile, index) => {
    const position = groups.markers.children[index].position;
    const id = canvasProfile.getAttribute("data-value");
    if (id) {
      const markerSelected = app.markers.markers.find(
        (marker) => marker.name === id
      );

      canvasProfile.addEventListener("mouseenter", () => {
        animateFocusMarkerLocation(app, position);
        markerSelected.displayOverlay();
      });
      canvasProfile.addEventListener("mouseleave", () => {
        unFocusMakerLocation(app);
        markerSelected.hideOverlay();
      });
    }
  });
};

export function getCurrentClockByTimeZone(timeZone) {
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  return new Date()
    .toLocaleTimeString("fr-FR", { timeZone, ...options })
    .replace(/\s/g, "");
}

export function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export const threeUnitsToPx = (units, canvasHeight) => {
  // Get the camera's FOV in radians
  const fov = CAMERA_SETTINGS.fov * (Math.PI / 180);

  // Calculate the height of the view at the camera's distance
  const viewHeight = 2 * Math.tan(fov / 2) * CAMERA_SETTINGS.z;

  // Calculate the conversion factor from three.js units to pixels
  const conversionFactor = canvasHeight / viewHeight;

  // Convert three.js units to pixels
  return units * conversionFactor;
};

export const setStaticEarthCircleSize = () => {
  const canvas = document.querySelector("#earth-canvas-section canvas");
  const staticCircle = document.querySelector(".earth-static-circle");
  if (canvas) {
    const scale =
      window.innerWidth < BREAKPOINTS.MD
        ? SPHERE_SCALE.SM
        : window.innerWidth < BREAKPOINTS.LG
        ? SPHERE_SCALE.MD
        : window.innerWidth < BREAKPOINTS.XL
        ? SPHERE_SCALE.LG
        : SPHERE_SCALE.XL;

    const sphereRadius = 1 * scale;
    const canvasHeight = canvas.clientHeight;
    const circleRadius = threeUnitsToPx(sphereRadius, canvasHeight);
    // set the static earth circle size
    staticCircle.style.width = `${circleRadius * 2}px`;
  }
};
