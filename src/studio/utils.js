import * as THREE from "three";
import { groups } from "./config.js";
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

export function updateClocks(clocksElement, timeZones) {
  for (let i = 0; i < clocksElement.length; i++) {
    const timeZone = timeZones[i];

    clocksElement[i].innerText = getCurrentClockByTimeZone(timeZone);
  }
}
