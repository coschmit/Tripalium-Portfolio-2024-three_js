const getNavbarLetterHTML = (text) => {
  return [...text]
    .map((letter) => `<span class="trplm-link-letter">${letter}</span>`)
    .join("\n");
};

// ANIMATION LOADING
document.addEventListener("DOMContentLoaded", function () {
  // ** TRPLM LINK NAVBAR ** //
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
});

// LENIS SMOOTH SCROLL
let lenis;
if (Webflow.env("editor") === undefined) {
  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.7,
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

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
}

// NAVBAR HOVER BLURRY ANIMATION
const navBar = document.querySelector(".navigation");
const navBarLinks = document.querySelectorAll(".navigation .link");
const blurryBackground = document.querySelector(".blurry-background");

navBarLinks.forEach((navBarLink) => {
  navBarLink.addEventListener("mouseenter", () => {
    navBar.classList.add("hovered");
  });
  navBarLink.addEventListener("mouseleave", () => {
    navBar.classList.remove("hovered");
  });
});

// **  VALOR CONTAINER - tags hover animation ** //
//
const tags = document.querySelectorAll(
  ".valors-container .valor-row .valors-tags-container .tag"
);
const tagsDetail = document.querySelectorAll(
  ".valors-container .valor-row .valors-tags-details-container .valors-tags-details-item"
);

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
    // using navigation blur
    navBar.classList.add("hovered");
  });
  tag.addEventListener("mouseleave", () => {
    tagsDetail[index].classList.remove("active");
    setTimeout(() => {
      tag.style.zIndex = "initial";
    }, 200);

    // using navigation blur
    navBar.classList.remove("hovered");
  });
});
