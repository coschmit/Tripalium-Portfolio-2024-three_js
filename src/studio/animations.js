gsap.registerPlugin(ScrollTrigger);

function getCurrentClockByTimeZone(timeZone) {
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  return new Date()
    .toLocaleTimeString("fr-FR", { timeZone, ...options })
    .replace(/\s/g, "");
}

function updateStudioProfileClocks() {
  const clocksElement = document.querySelectorAll(
    ".profile-detail-info-clock > div"
  );
  updateClocks(clocksElement, ["Europe/Paris", "America/Lima"]);
}

function updateClocks(clocksElement, timeZones) {
  for (let i = 0; i < clocksElement.length; i++) {
    const timeZone = timeZones[i];

    clocksElement[i].innerText = getCurrentClockByTimeZone(timeZone);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // *** CIRCLES ANIMATION *** //

  const circleDivs = document.querySelectorAll(
    ".studio-circles-circle-wrapper"
  );
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

  const agendaItems = document.querySelectorAll(".agenda-item-wrapper");
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
        const delay = index * 1;
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

  // CANVAS PROFILES
  gsap.to(".canvas-profile", {
    scrollTrigger: {
      trigger: "#earth-canvas-section",
      start: "top center",
      toggleActions: "play none none reverse",
    },
    duration: 0.4,
    ease: "power2.inOut",
    opacity: 1,
  });

  const navigationBar = document.querySelector(".navigation");
  gsap.to(navigationBar, {
    scrollTrigger: {
      trigger: "#earth-canvas-section",
      start: "top center",
      end: "bottom center",
      toggleActions: "play reverse play reverse",
      onEnter: () => gsap.set(".navigation .link", { pointerEvents: "none" }),
      onEnterBack: () =>
        gsap.set(".navigation .link", { pointerEvents: "none" }),
      onLeave: () => gsap.set(".navigation .link", { pointerEvents: "auto" }),
      onLeaveBack: () =>
        gsap.set(".navigation .link", { pointerEvents: "auto" }),
    },

    duration: 0.2,
    ease: "power2.inOut",
    opacity: 0,
  });

  var splide1 = new Splide("#studio-profile-splide-paul", {
    type: "slide",
    drag: "free",
    gap: "20px",
    snap: true,
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
  });

  var splide2 = new Splide("#studio-profile-splide-colin", {
    type: "slide",
    drag: "free",
    gap: "20px",
    snap: true,
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
  });

  splide1.mount();
  splide2.mount();

  //********* PROFILE OVERLAY *********//

  const handleDisplayCanvasProfile = (event) => {
    if (lenis) {
      lenis.stop();
    }
    const dataValue = event?.currentTarget?.dataset?.value;
    if (dataValue) {
      const overlay = document.querySelector(
        `.profile-detail-overlay.${dataValue}`
      );

      if (overlay) {
        overlay.style.display = "block";
        gsap.to(overlay, { duration: 0.5, opacity: 1 });
      }
    }
  };

  const handleCloseCanvasProfile = (event) => {
    event.preventDefault();
    const openedOverlay = [
      ...document.querySelectorAll(".profile-detail-overlay"),
    ].find((elem) => elem.style.display === "block");

    gsap.to(openedOverlay, {
      duration: 0.4,
      opacity: 0,
      onComplete: () => {
        openedOverlay.style.display = "none";
        if (lenis) {
          lenis.start();
        }
      },
    });
  };

  //*** display profile overlay ***//
  const canvasProfiles = document.querySelectorAll(".canvas-profile");
  canvasProfiles.forEach((canvasProfile) => {
    canvasProfile.addEventListener("click", handleDisplayCanvasProfile);
  });

  //*** hide profile overlay ***//
  const profileOverlayDetailCloseBtns = document.querySelectorAll(
    ".profile-detail-overlay-close-btn .link-btn-wrapper"
  );
  profileOverlayDetailCloseBtns.forEach((profileOverlayDetailCloseBtn) => {
    profileOverlayDetailCloseBtn.addEventListener(
      "click",
      handleCloseCanvasProfile
    );
  });

  updateStudioProfileClocks();
  setInterval(updateStudioProfileClocks, 30_000);
});
