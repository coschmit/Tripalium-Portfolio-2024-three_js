import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// 0xe51111

const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const fragmentShader = `
varying vec2 vUv;

void main() {
    gl_FragColor = vec4(vUv,0.0,1.0);
}
`;

const wireframeVertex = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const wireframeFragment = `
uniform float uLineWidth;
uniform vec3 uLineColor;
uniform vec2 uResolution;

varying vec2 vUv; // Normalized UV coordinates

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float xGrid = mod(vUv.x * 10.0, 1.0);
  float yGrid = mod(vUv.y * 10.0, 1.0);
  float line = step(1.0 - uLineWidth, xGrid) + step(1.0 - uLineWidth, yGrid);
  gl_FragColor = vec4(uLineColor, line);
}
`;

const getSphere = () => {
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

  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(20, w / h, 0.1, 1000);
camera.position.z = 9;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xffffff, 0);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

scene.add(camera);

const sphere = getSphere();

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

scene.add(sphere);
scene.add(wireframedSphere);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.update();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const animate = () => {
  renderer.render(scene, camera);
  controls.update();

  window.requestAnimationFrame(animate);
};

animate();
