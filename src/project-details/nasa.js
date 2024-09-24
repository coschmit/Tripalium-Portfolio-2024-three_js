import { nasaCaseTranslationsRefs } from "../../localization/pages/nasa-case.js";
import { updateLanguageTexts } from "../utils.js";

new Splide("#nasa-case-splide", {
  type: "loop",
  drag: "free",
  gap: "20px",
  padding: "12.5%",
  snap: true,
  perPage: 1,
  breakpoints: {
    991: {
      gap: "16px",
    },
    478: {
      gap: "10px",
    },
  },
  autoScroll: {
    speed: 2,
  },
}).mount();

// ** FIX VIDEOS RATIO ** //
const fixVideosRatio = () => {
  const videos = document.querySelectorAll(".cs-background-video video");

  videos.forEach((video) => {
    const width = video.videoWidth;
    const height = video.videoHeight;
    video.parentElement.style.aspectRatio = `${width} / ${height}`;
  });
};
fixVideosRatio();

// **   START LOCALIZATION  ** //
document.getElementById("switch-fr").addEventListener("click", function () {
  updateLanguageTexts(nasaCaseTranslationsRefs, "fr");
});

document.getElementById("switch-en").addEventListener("click", function () {
  updateLanguageTexts(nasaCaseTranslationsRefs, "en");
});

const savedLang = localStorage.getItem("selectedLang") || "fr";
updateLanguageTexts(nasaCaseTranslationsRefs, savedLang);

// **   END LOCALIZATION  ** //
