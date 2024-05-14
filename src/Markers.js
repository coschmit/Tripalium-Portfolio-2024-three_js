import * as THREE from "three";
import { groups, markersConfig } from "./config.js";
import { Marker } from "./Marker.js";
import { toSphereCoordinates } from "./utils.js";

export class Markers {
  constructor() {
    //todo TO DEFINE
    this.radius = 1;
    //   config.sizes.globe + config.sizes.globe * config.scale.markers;
    //todo TO DEFINE

    this.hoveredMarker = null;

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
        markerConfig.label,
        cords
      );
      groups.markers.add(marker.group);
    }
  };
}
