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
      ".nasa-apollo-mobile-screenshots",
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
});

// **  VALORS CONTAINER SWITCH ANIMATION ** //
const companyDescriptionSection = document.querySelector(
  ".company-description-section"
);
const valorsContainer = document.querySelector(".valors-container");
ScrollTrigger.create({
  trigger: companyDescriptionSection,
  start: "top 30%",
  onToggle: (self) => {
    if (self.isActive === true && self.direction === 1) {
      //active
      companyDescriptionSection.classList.add("variant");
      valorsContainer.classList.add("variant");
    } else if (self.isActive === false && self.direction === -1) {
      // desactive
      companyDescriptionSection.classList.remove("variant");
      valorsContainer.classList.remove("variant");
    }
  },
});
