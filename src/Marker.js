import * as THREE from "three";
import { groups } from "./config.js";

export class Marker {
  constructor(geometry, material, label, cords) {
    this.geometry = geometry;
    this.material = material;
    this.label = label;
    this.cords = cords;

    this.group = new THREE.Group();
    this.group.name = "Marker";

    this.createPoint();
    this.setPosition();
  }

  createPoint = () => {
    // this.point = new THREE.Mesh(this.geometry, this.material);
    this.point = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 15, 15),
      new THREE.MeshBasicMaterial({ color: 0x3dfa1a })
    );

    this.group.add(this.point);
  };

  setPosition = () => {
    const { x, y, z } = this.cords;
    this.group.position.set(-x, y, -z);
  };
}
