import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { groups } from "./config.js";
import { updateClocks } from "./utils.js";

export class App {
  constructor({ animate, setup, onPointerMove }) {
    this.animate = animate;
    this.setup = setup;
    this.onPointerMove = onPointerMove;

    this.scene = null;
    this.renderer = null;
    this.ratio = null;
    this.camera = null;
    this.controls = null;
    this.raycaster = null;
    this.pointer = null;

    // classes
    this.globe = null;
    this.markers = null;

    window.app = this;
  }

  init = async () => {
    this.initScene();
    this.initRenderer();

    this.initCamera();
    this.initControls();

    this.initRaycaster();
    // this.initStats();

    this.initClocks();

    // planet

    this.render();
    this.update();

    this.scene.add(groups.main);
  };

  initScene = () => {
    this.scene = new THREE.Scene();
  };

  initRenderer = () => {
    this.renderer = new THREE.WebGLRenderer({
      preserveDrawingBuffer: true,
      antialias: true,
    });
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
  };

  initCamera = () => {
    this.ratio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(20, this.ratio, 0.1, 1000);
    this.camera.position.z = 9;
    this.camera.layers.enable(1);
  };

  initControls = () => {
    this.controls = new OrbitControls(app.camera, app.renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
    this.controls.update();
  };

  initRaycaster = () => {
    this.raycaster = new THREE.Raycaster();

    this.pointer = new THREE.Vector2();

    window.addEventListener("pointermove", this.handlePointerMove);
  };

  handleResize = () => {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  };

  render = () => {
    this.setup(this);
    document.body.appendChild(this.renderer.domElement);
  };

  update = () => {
    this.animate(this);

    this.raycaster.setFromCamera(this.pointer, this.camera);
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
    requestAnimationFrame(this.update);
  };

  handlePointerMove = (event) => {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.onPointerMove(this);
  };

  // update clocks info overlay
  initClocks = () => {
    setInterval(() => {
      this.markers.markers.forEach((marker) => {
        if (marker.overlayDisplayed === false) {
          marker.updateDataOverlay();
        }
      });
    }, 60000);
  };
}
