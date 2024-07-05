import * as THREE from "three";
import { config } from "./config.js";
import { getCurrentClockByTimeZone } from "./utils.js";

export class Marker {
  constructor(geometry, material, id, label, cords, overlayData) {
    this.geometry = new THREE.SphereGeometry(0.04, 15, 15);
    this.material = new THREE.MeshBasicMaterial({
      color: 0x3dfa1a,
      transparent: true,
    });
    this.name = id;
    this.cords = cords;
    this.overlayData = overlayData;

    this.point = null;
    this.glow = null;
    this.overlay = null;

    this.pointColor = new THREE.Color(config.colors.globeMarkerColor);
    this.glowColor = new THREE.Color(config.colors.globeMarkerGlow);

    this.overlayActive = false;
    this.overlayDisplayed = false; // use only for clock updated, to be sure it's not displayed

    this.group = new THREE.Group();
    this.group.name = "Marker";
    this.group.userData.name = label;

    this.createPoint();
    this.createGlow();
    this.setPosition();
    this.initDataOverlay();
  }

  createPoint() {
    this.point = new THREE.Mesh(this.geometry, this.material);
    this.point.material.color.set(this.pointColor);
    this.point.name = this.name;
    this.group.add(this.point);
  }

  createGlow() {
    this.glow = new THREE.Mesh(this.geometry, this.material.clone());
    this.glow.material.color.set(this.glowColor);
    this.glow.material.opacity = 0.5;
    this.glow.layers.set(1);
    this.group.add(this.glow);
  }
  animateGlow() {
    if (!this.isAnimating) {
      if (Math.random() > 0.99) {
        this.isAnimating = true;
      }
    } else if (this.isAnimating) {
      this.glow.scale.x += 0.025;
      this.glow.scale.y += 0.025;
      this.glow.scale.z += 0.025;
      this.glow.material.opacity -= 0.005;

      if (this.glow.scale.x >= 4) {
        this.glow.scale.x = 1;
        this.glow.scale.y = 1;
        this.glow.scale.z = 1;
        this.glow.material.opacity = 0.6;
        this.glow.isAnimating = false;
      }
    }
  }

  setPosition() {
    const { x, y, z } = this.cords;
    this.group.position.set(-x, y, -z);
  }

  async createDataOverlay() {
    let { city, country, latitude, longitude, altitude, clock, timeZone } =
      this.overlayData;
    clock = getCurrentClockByTimeZone(timeZone);

    const div = `<div class="marker-overlay-data">
      <div class="location">
        <div class="city">${city}</div>
        <div class="country">${country}</div>
      </div>
      <br />
      <div class="coordinates">
        <div class="latitude">${latitude}</div>
        <div class="longitude">${longitude}</div>
        <div class="altitude">${altitude}</div>
      </div>
      <br />
      <div class="clock-time">${clock}</div>
    </div>`;

    const shareContent = document.getElementById("html2canvas");
    shareContent.innerHTML = div;

    const opts = {
      logging: false,
      backgroundColor: null,
      dpi: window.devicePixelRatio,
      // scale: 6,
      width: shareContent.offsetWidth,
      height: shareContent.offsetHeight,
      scale: 6, // Vous pouvez ajuster l'échelle si nécessaire
    };

    const canvas = await html2canvas(
      document.getElementById("html2canvas"),
      opts
    );
    shareContent.innerHTML = ``;
    const dataURL = canvas.toDataURL("image/png");
    const map = new THREE.TextureLoader().load(dataURL);
    const material = new THREE.SpriteMaterial({
      map: map,
      transparent: true,
      opacity: 0,
    });

    const imageAspect = canvas.width / canvas.height;
    const scaleFactor = 0.4;

    const sprite = new THREE.Sprite(material);
    sprite.name = "DataOverlay";
    sprite.scale.set(
      imageAspect * scaleFactor,
      1 * scaleFactor,
      1 * scaleFactor
    );

    const { x, y, z } = this.group.position;
    const positionDisplacement = 0.3;
    sprite.position.set(
      x * positionDisplacement,
      y * positionDisplacement,
      z * positionDisplacement
    );
    sprite.layers.set(1);

    return sprite;
  }

  async initDataOverlay() {
    const overlay = await this.createDataOverlay();
    this.overlay = overlay;
    this.group.add(this.overlay);
  }
  async updateDataOverlay() {
    this.group.remove(this.overlay);

    this.overlay.geometry.dispose();
    this.overlay.material.dispose();

    const overlay = await this.createDataOverlay();
    this.overlay = overlay;
    this.group.add(this.overlay);
  }

  displayOverlay() {
    if (!this.overlay) {
      return;
    }
    this.overlayActive = true;
    this.overlayDisplayed = true;
    gsap.to(this.overlay.material, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
    });
  }
  hideOverlay() {
    if (!this.overlay) {
      return;
    }
    this.overlayActive = false;
    setTimeout(() => {
      if (this.overlayActive === false) {
        gsap.to(this.overlay.material, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => {
            this.overlayDisplayed = false;
          },
        });
      }
    }, 3000);
  }
}

export const animateOverlayOpacity = ({ sprite, targetOpacity, duration }) => {
  gsap.to(sprite.material, {
    opacity: targetOpacity,
    duration: duration,
    ease: "power2.inOut",
  });
};
