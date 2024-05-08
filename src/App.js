import * as THREE from "three";

export class App {
  constructor() {
    window.app = this;
    this.earthName = "blue earth";
    this.population;
  }

  init = async () => {
    this.population = 7_951_000_000;

    this.initScene();
  };

  initScene = () => {
    this.scene = new THREE.Scene();
    console.log("init scene DONE");
  };

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    this.renderer.setSize(w, h);
    document.body.appendChild(this.renderer.domElement);
  }

  getSphere() {
    const geometry = new THREE.SphereGeometry(1, 30, 30);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      alphaTest: 1,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }
}
