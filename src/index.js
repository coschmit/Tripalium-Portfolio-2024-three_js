import { translationsRefs } from "../localization/index.js";
import {
  definePopupAnimationTL,
  emailPopupReveal,
  getCopyEmailPopupDefaultWidth,
  switchNavigationLanguageSelected,
  updateLanguageTexts,
} from "./utils.js";

gsap.registerPlugin(ScrollTrigger);

const TRIPALIUM_EMAIL = "contact@tripalium-studio.com";

// is Mobile Landscape
const isMobile = window.innerWidth <= 768;

// LENIS SMOOTH SCROLL

export const lenis = new Lenis({
  smoothWheel: !isMobile,
  lerp: 0.1,
  wheelMultiplier: 1,
  gestureOrientation: "vertical",
  normalizeWheel: false,
  smoothTouch: false,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// prevent from scrolltrigger wrong position due to  lazy loading
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});

const getNavbarLetterHTML = (text) => {
  return [...text]
    .map((letter) => `<span class="trplm-link-letter">${letter}</span>`)
    .join("\n");
};

// ANIMATION LOADING
document.addEventListener("DOMContentLoaded", function () {
  // ******************* GET DOM ************************ //
  const navigationBar = document.querySelector(".navigation");
  const contactSection = document.querySelector(".contact-section");
  const footer = document.querySelector(".footer");
  // ******************************************* //

  //* LOADING SCREEN ANIMATION
  if (document.querySelector(".page-transition") !== null) {
    let tl = gsap.timeline();
    if (lenis) {
      lenis.stop();
    }
    // gsap.set(".home-loading-icon-wrapper", { rotate: 0, opacity: 1 });
    tl.to(".page-transition-icon-wrapper", { opacity: 1, duration: 0.4 })
      .to(".page-transition-icon-wrapper", { rotate: 0, duration: 0.5 }, "<")
      .to(".page-transition", {
        height: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
        onComplete: () => {
          if (lenis) {
            lenis.start();
          }
        },
      })
      .to(
        ".page-transition-icon-wrapper",
        {
          y: -150,
          opacity: 0,
        },
        "<"
      )
      .fromTo(
        ".navigation",
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "linear" },
        "<0.5"
      );

    const excludedClass = "no-transition";
    const exitDurationMS = 800;
    document.querySelectorAll("a").forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const hostname = this.hostname;
        const href = this.getAttribute("href");
        const target = this.getAttribute("target");

        if (
          hostname === window.location.hostname &&
          href.indexOf("#") === -1 &&
          !this.classList.contains(excludedClass) &&
          target !== "_blank"
        ) {
          e.preventDefault();
          gsap.to(".page-transition", {
            height: "100%",
            duration: 0.5,
            ease: "power2.inOut",
          });
          const transitionURL = href;

          setTimeout(() => {
            window.location.href = transitionURL;
          }, exitDurationMS);
        }
      });
    });
  }

  // ** END LOADING SCREEN ANIMATION ** //

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

      const emailHideParams = {
        width: "0%",
        duration: 0.4,
        onComplete: () => {
          tl.pause();
          tl.clear();

          copyEmailIsClicked = false;
          // reset position
          gsap.set([".copy-email-popup.clicked,.copy-email-popup.clicked-2"], {
            top: "100%",
          });
          const wrapperDefaultWidth = getCopyEmailPopupDefaultWidth();
          gsap.set(".copy-email-popups-wrapper", {
            width: wrapperDefaultWidth,
          });
          gsap.set(".copy-email-popup-reveal", { width: "0%" });
        },
      };

      contactSectionArrow.addEventListener("mouseenter", () => {
        gsap.to(contactSectionArrow, arrowEnterParams);
        if (copyEmailIsClicked === false) {
          emailPopupReveal();
        }
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
          definePopupAnimationTL(tl);
          setTimeout(() => {
            tl.play();
          }, 100);

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
      gsap.to(".page-transition", {
        height: "100%",
        duration: 0.5,
        ease: "power2.inOut",
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 800);
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
updateLanguageTexts(translationsRefs, savedLang);

const switchFR = document.getElementById("switch-fr");
if (switchFR) {
  switchFR.addEventListener("click", function () {
    switchNavigationLanguageSelected("fr");
    updateLanguageTexts(translationsRefs, "fr");
  });
}

const switchEN = document.getElementById("switch-en");
if (switchEN) {
  switchEN.addEventListener("click", function () {
    switchNavigationLanguageSelected("en");
    updateLanguageTexts(translationsRefs, "en");
  });
}
