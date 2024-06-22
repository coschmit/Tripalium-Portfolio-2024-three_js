gsap.registerPlugin(ScrollTrigger);

// *** CIRCLES ANIMATION *** //

const circleDivs = document.querySelectorAll(".studio-circles-circle-wrapper");
circleDivs.forEach((circleDiv) => {
  gsap.to(circleDiv, {
    y: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: circleDivs[0],
      start: "top 40%",
      end: "top top",
      scrub: true,
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
        markers: true,
        trigger: ".studio-agenda-container",
        start: "top 70%",
        markers: true,
      },
    });
    sprintCardAnimateItems(tl, "mobile");
    timelines.push(tl);
  } else {
    for (let index = 0; index < 2; index++) {
      const item = agendaItems[index];
      const delay = index * 0.5;
      const tl = gsap.timeline({
        scrollTrigger: {
          markers: true,
          trigger: ".studio-agenda-container",
          start: "top 50%",
          markers: true,
        },
        delay: delay,
      });
      sprintCardAnimateItems(tl, "large", item);
      timelines.push(tl);
    }
  }
}

animateSprintCards();
