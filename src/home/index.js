import { REVEAL_ANIMATION_DURATION } from "../config.js";
import { homeElementsToTranslate } from "../localization.js";
import { updateLanguageTexts } from "../utils.js";

document.addEventListener("DOMContentLoaded", function () {
  // ** Reveal Animation ** //
  gsap.fromTo(
    ".nasa-mobile-screenshot",
    { opacity: 0, y: 100 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power1.out",
      delay: REVEAL_ANIMATION_DURATION + 0.25,
    },
    "<"
  );

  // **  VALORS CONTAINER SWITCH ANIMATION ** //
  const contactSection = document.querySelector(".contact-section");
  const companyDescriptionSection = document.querySelector(
    ".company-description-section"
  );
  const valorsContainer = document.querySelector(".valors-container");
  const splineSceneMonogram = document.querySelector(".spline-scene-monogram");

  ScrollTrigger.create({
    trigger: ".company-description-section",
    start: "top 30%",
    end: "bottom 50%",

    onToggle: (self) => {
      if (self.isActive) {
        //active

        // monogram invert
        splineSceneMonogram.classList.add("white");

        // background color
        gsap.to("body", {
          backgroundColor: "#e51111",
          duration: 0.5,
          ease: "power1.inOut",
        });

        contactSection.classList.add("variant");
        companyDescriptionSection.classList.add("variant");
        valorsContainer.classList.add("variant");
      } else if (self.isActive === false) {
        // desactive

        // monogram invert
        splineSceneMonogram.classList.remove("white");

        // background color
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
