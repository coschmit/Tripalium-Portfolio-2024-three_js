gsap.registerPlugin(ScrollTrigger);

// *** CIRCLES ANIMATION *** //

const circleDivs = document.querySelectorAll(".studio-circles-circle-wrapper");
const screenWidth = window.innerWidth;
let circleSpacing = 20;
if (screenWidth <= 991) {
  circleSpacing = 16;
}
if (screenWidth <= 448) {
  circleSpacing = -30;
}

const isMobile = screenWidth <= 478;
const nbOfCircles = 3;
const xDisplacement =
  screenWidth -
  nbOfCircles * (circleDivs[0].offsetWidth + circleSpacing) +
  circleSpacing;

circleDivs.forEach((circleDiv) => {
  gsap.to(circleDiv, {
    y: isMobile ? undefined : 0,
    x: xDisplacement,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: circleDivs[0],
      start: "top 60%",
      end: "top+=100px top",
      scrub: 1,
    },
  });
});

// *** SPRINT CARDS *** //

const studioAgendaContainer = document.querySelector(
  ".studio-agenda-container"
);
const agendaItems = document.querySelectorAll(".agenda-item-wrapper");
let agendaTimelines = [];
let timelines = [];

function sprintCardAnimateItems(tl, animation, wrapper) {
  switch (animation) {
    case "mobile":
      tl.fromTo(
        ".agenda-container-left-line",
        { height: "0%" },
        { height: "100%" }
      ).fromTo(
        ".agenda-item-wrapper",
        { x: "100%" },
        { x: "0%", stagger: 0.2 },
        "<"
      );
      break;
    case "large":
      tl.fromTo(
        wrapper.querySelector(".agenda-item-left-line"),
        { height: "0%" },
        { height: "100%", duration: 1 }
      )
        .fromTo(
          wrapper.querySelector(".agenda-item"),
          {
            width: "0%",
          },
          { width: "100%", duration: 0.8, ease: "power2.inOut" },
          "<.2"
        )
        .fromTo(
          wrapper.querySelector(".agenda-item-centered-line"),
          {
            height: "0%",
          },
          { height: "100%", duration: 0.6 },
          "<.8"
        )
        .fromTo(
          wrapper.querySelector(".tag-with-dot"),
          {
            opacity: 0,
          },
          { opacity: 1 }
        );
      break;
    default:
      break;
  }
}

function animateSprintCards() {
  timelines.forEach((tl) => tl.kill());
  timelines = [];

  if (window.innerWidth < 769) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".studio-agenda-container",
        start: "top 70%",
      },
    });
    sprintCardAnimateItems(tl, "mobile");
    timelines.push(tl);
  } else {
    for (let index = 0; index < 2; index++) {
      const item = agendaItems[index];
      const delay = index * 1.5;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".studio-agenda-container",
          start: "top 50%",
        },
        delay: delay,
      });
      sprintCardAnimateItems(tl, "large", item);
      timelines.push(tl);
    }
  }
}

animateSprintCards();
