import { globalElementsToTranslate } from "./localization.js";
import {
  switchNavigationLanguageSelected,
  updateLanguageTexts,
} from "./utils.js";

gsap.registerPlugin(ScrollTrigger);

export let lenis;
const TRIPALIUM_EMAIL = "colin@tripalium-studio.com";

const getNavbarLetterHTML = (text) => {
  return [...text]
    .map((letter) => `<span class="trplm-link-letter">${letter}</span>`)
    .join("\n");
};

window.addEventListener("load", (event) => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 1_000);
});

// ANIMATION LOADING
document.addEventListener("DOMContentLoaded", function () {
  // ******************* GET DOM ************************ //
  const navigationBar = document.querySelector(".navigation");
  const contactSection = document.querySelector(".contact-section");
  const footer = document.querySelector(".footer");
  // ******************************************* //

  // ** TRPLM LINK NAVBAR ** //
  if (navigationBar) {
    const trplmLinkWrapper = document.getElementById("trplm-nav-link");
    const trplmLinkShort = document.querySelector(".trplm-link-short");

    const trplmLinkFull = document.querySelector(".trplm-link-full");

    trplmLinkShort.innerHTML = getNavbarLetterHTML("TRPLM");
    trplmLinkFull.innerHTML = getNavbarLetterHTML("TRIPALIUM");

    trplmLinkWrapper.addEventListener("mouseenter", () => {
      trplmLinkWrapper.classList.add("expended");
    });
    trplmLinkWrapper.addEventListener("mouseleave", () => {
      trplmLinkWrapper.classList.remove("expended");
    });
  }

  // ******************************************* //
  // ******************************************* //
  // ******************************************* //

  // LENIS SMOOTH SCROLL

  if (Webflow.env("editor") === undefined) {
    lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.7,
      gestureOrientation: "vertical",
      normalizeWheel: false,
      smoothTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }
  function updateClocks() {
    const clocksElement = document.getElementsByClassName("footer-clock-time");
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    const timeZones = [
      { label: "Paris", timeZone: "Europe/Paris" },
      { label: "Lima", timeZone: "America/Lima" },
    ];

    if (clocksElement[0] && clocksElement[1]) {
      clocksElement[0].innerText = new Date()
        .toLocaleTimeString("fr-FR", { ...timeZones[0], ...options })
        .replace(/\s/g, "");
      clocksElement[1].innerText = new Date()
        .toLocaleTimeString("fr-FR", { ...timeZones[1], ...options })
        .replace(/\s/g, "");
    }
  }

  updateClocks();

  setInterval(updateClocks, 30000);

  // NAVBAR HOVER BLURRY ANIMATION
  if (navigationBar) {
    navigationBar.addEventListener("mouseenter", () => {
      navigationBar.classList.add("hovered");
    });
    navigationBar.addEventListener("mouseleave", () => {
      navigationBar.classList.remove("hovered");
    });
  }

  // **  VALOR CONTAINER - tags hover animation ** //
  //
  const valorsContainer = document.querySelector(".valors-container");
  const tags = document.querySelectorAll(
    ".valors-container .valor-row .valors-tags-container .tag"
  );
  const tagsDetail = document.querySelectorAll(
    ".valors-container .valor-row .valors-tags-details-container .valors-tags-details-item"
  );

  if (window.innerWidth > 991) {
    tags.forEach((tag, index) => {
      tag.addEventListener("mouseenter", () => {
        // Vérifier tous les tags pour réinitialiser le zIndex et éviter au saut d'affichage
        tags.forEach((t) => {
          if (t.style.zIndex === "2") {
            t.style.zIndex = "initial";
          }
        });

        tagsDetail[index].classList.add("active");
        tag.style.zIndex = 2;

        valorsContainer.classList.add("blurred");
      });
      tag.addEventListener("mouseleave", () => {
        tagsDetail[index].classList.remove("active");
        setTimeout(() => {
          tag.style.zIndex = "initial";
        }, 200);

        valorsContainer.classList.remove("blurred");
      });
    });
  }

  // HIDE NAVBAR AFTER FOOTER
  if (navigationBar && (contactSection || footer)) {
    const pathname = window.location.pathname;

    const start = pathname === "/" ? "top 30%" : "top 80%";
    const trigger =
      pathname === "/"
        ? ".company-description-section"
        : document.querySelector(".contact-section") !== null
        ? ".contact-section"
        : ".footer";
    ScrollTrigger.create({
      trigger: trigger,
      start: start,
      onToggle: (self) => {
        if (self.isActive === true && self.direction === 1) {
          gsap.to(navigationBar, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
              gsap.set(navigationBar, { display: "none" });
              gsap.set(navigationBar, { opacity: 1 });
            },
          });
        } else if (self.isActive === false && self.direction === -1) {
          gsap.set(navigationBar, { opacity: 0 });
          gsap.set(navigationBar, { display: "flex" });
          gsap.to(navigationBar, {
            opacity: 1,
            duration: 0.4,
          });
        }
      },
    });
  }

  // Contact Section Arrow animation
  // const arrowAnimation = gsap.to(contactSectionArrow, { x: 10, y: -10 });
  if (contactSection) {
    const contactSectionArrow = document.querySelector(
      ".contact-section .contact-section-row .arrow"
    );

    if (contactSectionArrow) {
      let copyEmailIsClicked = false;
      const COPY_EMAIL_CLICK_ANIMATION_DURATION = 4_500;
      let tl = gsap.timeline({ paused: true }); // (optional: repeat: -1)

      const arrowEnterParams = { x: 10, y: -10, duration: 0.2 };
      const arrowLeaveParams = { x: 0, y: 0, duration: 0.2 };
      const emailRevealParams = {
        width: "100%",
        duration: 0.4,
        onStart: () => {
          // gsap.set(".copy-email-popup-reveal", { display: "block" });
        },
      };
      const emailHideParams = {
        width: "0%",
        duration: 0.4,
        onComplete: () => {
          tl.pause();
          tl.seek(0);
          copyEmailIsClicked = false;
          // gsap.set(".copy-email-popup-reveal", { display: "none" });
        },
      };

      tl.to(".copy-email-popup.clicked", {
        top: "0%",
        duration: 0.5,
      })
        .to(".copy-email-popup.clicked", { top: "0%", duration: 1 })
        .to(
          ".copy-email-popup.clicked",
          {
            top: "-100%",
            duration: 0.5,
          },
          "<1.5"
        )
        .to(".copy-email-popup.clicked-2", { top: "0%", duration: 0.5 }, "<");

      contactSectionArrow.addEventListener("mouseenter", () => {
        gsap.to(contactSectionArrow, arrowEnterParams);
        gsap.to(".copy-email-popup-reveal", emailRevealParams);
      });

      contactSectionArrow.addEventListener("mouseleave", () => {
        gsap.to(contactSectionArrow, arrowLeaveParams);
        if (copyEmailIsClicked === false) {
          gsap.to(".copy-email-popup-reveal", emailHideParams);
        }
      });

      contactSectionArrow.addEventListener("click", () => {
        navigator.clipboard.writeText(TRIPALIUM_EMAIL);

        if (copyEmailIsClicked === false) {
          tl.play();

          copyEmailIsClicked = true;

          setTimeout(() => {
            gsap.to(".copy-email-popup-reveal", emailHideParams);
          }, COPY_EMAIL_CLICK_ANIMATION_DURATION);
        }
      });
    }
  }

  // GIF ANIMATION
  const animatedGifImagesGroups = document.querySelectorAll(
    ".animated-gif-images"
  );

  animatedGifImagesGroups.forEach((animatedGifImages) => {
    const delay = animatedGifImages.dataset.delay ?? 500;
    const childrenCount = animatedGifImages.childElementCount;
    let activeNb = 0;
    setInterval(() => {
      animatedGifImages.children[
        activeNb === 0 ? childrenCount - 1 : activeNb - 1
      ].style.zIndex = 0;
      animatedGifImages.children[activeNb].style.zIndex = 1;
      if (activeNb < childrenCount - 1) {
        activeNb++;
      } else {
        activeNb = 0;
      }
    }, delay);
  });

  // monogram redirect link
  const monogramWrapper = document.querySelector(
    ".spline-scene-monogram-wrapper"
  );

  if (monogramWrapper) {
    monogramWrapper.addEventListener("click", () => {
      window.location.replace("/");
    });
  }

  // FIX GRID IMAGES RESPONSIVENESS
  const fixGridImagesResponsiveness = () => {
    const gridImages = document.querySelectorAll(
      ".grid img, .grid-main img, .grid-project img"
    );
    gridImages.forEach((image) => {
      const imageWidth = image.offsetWidth;
      const imageVW = (imageWidth / window.innerWidth) * 100;
      const correctSizesAttribute = `(min-width: 480px) ${imageVW}vw, 100vw)`;
      image.setAttribute("sizes", correctSizesAttribute);
    });
  };
  fixGridImagesResponsiveness();

  window.addEventListener("resize", () => {
    fixGridImagesResponsiveness();
  });
});

// ** LOCALIZATION ** //

const savedLang = localStorage.getItem("selectedLang") || "fr";
switchNavigationLanguageSelected(savedLang);
updateLanguageTexts(globalElementsToTranslate, savedLang);

const switchFR = document.getElementById("switch-fr");
if (switchFR) {
  switchFR.addEventListener("click", function () {
    switchNavigationLanguageSelected("fr");
    updateLanguageTexts(globalElementsToTranslate, "fr");
  });
}

const switchEN = document.getElementById("switch-en");
if (switchEN) {
  switchEN.addEventListener("click", function () {
    switchNavigationLanguageSelected("en");
    updateLanguageTexts(globalElementsToTranslate, "en");
  });
}
