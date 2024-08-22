import { homeElementsToTranslate } from "../localization.js";
import { updateLanguageTexts } from "../utils.js";

document.addEventListener("DOMContentLoaded", function () {
  //* LOADING SCREEN ANIMATION
  let tl = gsap.timeline();
  tl.to(".home-loading-icon-wrapper", { opacity: 1, duration: 0.4 })
    .to(".home-loading-icon-wrapper", { rotate: 0, duration: 0.5 }, "<")
    .to(".home-loading-section", {
      height: 0,
      duration: 0.8,
      delay: 0.4,
      ease: "power2.out",
    })
    .to(
      ".home-loading-icon-wrapper",
      {
        y: -150,
        opacity: 0,
        onComplete: () => {
          gsap.set(".home-loading-icon-wrapper", { display: "none" });
        },
      },
      "<"
    )
    .fromTo(
      ".nasa-mobile-screenshot",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.1 },
      "<"
    )
    .fromTo(
      ".navigation",
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "linear" },
      "<0.5"
    );

  // **  VALORS CONTAINER SWITCH ANIMATION ** //
  const contactSection = document.querySelector(".contact-section");
  const companyDescriptionSection = document.querySelector(
    ".company-description-section"
  );
  const valorsContainer = document.querySelector(".valors-container");

  ScrollTrigger.create({
    trigger: ".company-description-section",
    start: "top 30%",
    end: "bottom 50%",
    onToggle: (self) => {
      if (
        (self.isActive === true && self.direction === 1) ||
        (self.isActive === true && self.direction === -1)
      ) {
        //active
        gsap.to("body", {
          backgroundColor: "#e51111",
          duration: 0.5,
          ease: "power1.inOut",
        });

        contactSection.classList.add("variant");
        companyDescriptionSection.classList.add("variant");
        valorsContainer.classList.add("variant");
      } else if (
        (self.isActive === false && self.direction === -1) ||
        (self.isActive === false && self.direction === 1)
      ) {
        // desactive
        gsap.to("body", {
          backgroundColor: "rgba(0,0,0,0)",
          duration: 0.5,
          ease: "power1.inOut",
        });
        contactSection.classList.remove("variant");
        companyDescriptionSection.classList.remove("variant");
        valorsContainer.classList.remove("variant");
      }
    },
  });

  const splineSceneMonogram = document.querySelector(".spline-scene-monogram");

  ScrollTrigger.create({
    trigger: ".company-description-section",
    start: "top 30%",
    end: "bottom 50%",
    onToggle: (self) => {
      if (self.isActive) {
        splineSceneMonogram.classList.add("white");
      } else {
        splineSceneMonogram.classList.remove("white");
      }
    },
  });

  // **   START LOCALIZATION  ** //

  document.getElementById("switch-fr").addEventListener("click", function () {
    updateLanguageTexts(homeElementsToTranslate, "fr");
  });

  document.getElementById("switch-en").addEventListener("click", function () {
    updateLanguageTexts(homeElementsToTranslate, "en");
  });

  const savedLang = localStorage.getItem("selectedLang") || "fr";
  updateLanguageTexts(homeElementsToTranslate, savedLang);

  // **   END LOCALIZATION  ** //
});
