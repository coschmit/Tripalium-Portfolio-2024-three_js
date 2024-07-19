import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  BREAKPOINTS,
  CAMERA_SETTINGS,
  groups,
  SPHERE_SCALE,
} from "./config.js";
import { setStaticEarthCircleSize } from "./utils.js";

export class App {
  constructor({ animate, setup, onPointerMove, onCanvasReady }) {
    this.animate = animate;
    this.setup = setup;
    this.onPointerMove = onPointerMove;
    this.onCanvasReady = onCanvasReady;

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
    this.camera = new THREE.PerspectiveCamera(
      CAMERA_SETTINGS.fov,
      this.ratio,
      0.1,
      1000
    );
    this.camera.position.z = CAMERA_SETTINGS.z;
    this.camera.layers.enable(1);
  };

  initControls = () => {
    this.controls = new OrbitControls(app.camera, app.renderer.domElement);
    this.updateControlsSettings();
  };
  updateControlsSettings = () => {
    if (window.innerWidth >= BREAKPOINTS.LG) {
      this.controls.enabled = true;
      this.controls.enableDamping = true;
    } else {
      this.controls.enabled = false;
      this.controls.enableDamping = false;
    }
    this.controls.autoRotate = true;
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
    this.controls.update();
  };

  initRaycaster = () => {
    this.raycaster = new THREE.Raycaster();

    this.pointer = new THREE.Vector2();

    window.addEventListener("pointermove", this.handlePointerMove);
  };

  updateObjectsGroupScale = () => {
    if (window.innerWidth < BREAKPOINTS.MD) {
      groups.main.scale.set(SPHERE_SCALE.SM, SPHERE_SCALE.SM, SPHERE_SCALE.SM);
    } else if (window.innerWidth < BREAKPOINTS.LG) {
      groups.main.scale.set(SPHERE_SCALE.MD, SPHERE_SCALE.MD, SPHERE_SCALE.MD);
    } else if (window.innerWidth < BREAKPOINTS.XL) {
      groups.main.scale.set(SPHERE_SCALE.LG, SPHERE_SCALE.LG, SPHERE_SCALE.LG);
    } else {
      groups.main.scale.set(SPHERE_SCALE.XL, SPHERE_SCALE.XL, SPHERE_SCALE.XL);
    }
  };

  resizeCanvas = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.updateProjectionMatrix();

    // resize globe based on breakpoints
    this.updateObjectsGroupScale();
    this.updateControlsSettings();

    // static circle earth
    setStaticEarthCircleSize();
  };

  render = () => {
    this.setup(this);
    const earthContainer = document.getElementById("earth-canvas-section");
    earthContainer.appendChild(this.renderer.domElement);

    this.updateObjectsGroupScale();

    this.onCanvasReady();
  };

  update = () => {
    this.animate(this);

    this.raycaster.setFromCamera(this.pointer, this.camera);
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
    requestAnimationFrame(this.update);
  };

  handlePointerMove = (event) => {
    const rect = this.renderer.domElement.getBoundingClientRect();

    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    // this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

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
