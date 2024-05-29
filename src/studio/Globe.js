import { groups } from "./config.js";
import * as THREE from "three";
import { wireframeFragment, wireframeVertex } from "./shaders.js";

export class Globe {
  constructor() {
    groups.globe = new THREE.Group();
    groups.globe.name = "Globe";

    this.initGlobe();

    this.initWireframe();

    return groups.globe;
  }

  initGlobe = () => {
    const earth_texture_url =
      "https://uploads-ssl.webflow.com/65cd3dbed53c92b25e55ea23/663a6e88f110af5e3d8d9b1c_tripalium-earth-map.png";
    const texture = new THREE.TextureLoader().load(earth_texture_url);

    const geometry = new THREE.SphereGeometry(1, 30, 30);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      alphaTest: 1,
      transparent: true,
    });

    const globe = new THREE.Mesh(geometry, material);
    groups.globe.add(globe);
  };
  initWireframe = () => {
    const wireframedSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 60, 60),
      new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: {
          uLineWidth: { value: 0.04 }, // Épaisseur des lignes
          uLineColor: { value: new THREE.Color(0xff0000) }, // Couleur des lignes (rouge)
          uResolution: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight),
          },
        },
        vertexShader: wireframeVertex,
        fragmentShader: wireframeFragment,
        transparent: true,
      })
    );
    wireframedSphere.scale.setScalar(0.99);

    groups.globe.add(wireframedSphere);
  };
}
