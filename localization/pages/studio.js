export const studioTranslationsRefs = [
  {
    element: document.querySelector("#studio-paragraph-1 p"),
    key: "studioStrategicGuidance",
  },
  {
    element: document.querySelector("#studio-paragraph-2 p"),
    key: "studioLargerProjects",
  },

  {
    element: document.querySelector(
      "#w-node-_4e37c147-8698-9484-9911-4cb1b63310ae-1afab2c8 > div.profile-detail-info-text > p"
    ),
    key: "studioPaulDescription",
  },
  {
    element: document.querySelector(
      "#w-node-_6eddb2d8-3bb8-a9b3-25d8-ce6bdbf56c18-1afab2c8 > div.profile-detail-info-text > p"
    ),
    key: "studioColinDescription",
  },

  // circles
  {
    element: document.querySelector(
      ".studio-circles-container > .studio-circles-circle-wrapper:nth-child(1) > div"
    ),
    key: "studioCircle1",
  },
  {
    element: document.querySelector(
      ".studio-circles-container > .studio-circles-circle-wrapper:nth-child(2) > div"
    ),
    key: "studioCircle2",
  },
  {
    element: document.querySelector(
      ".studio-circles-container > .studio-circles-circle-wrapper:nth-child(3) > div"
    ),
    key: "studioCircle3",
  },

  // SPRINTS
  {
    element: document.querySelector(
      ".studio-agenda-container .agenda-item-wrapper:nth-child(1) .agenda-item .agenda-details-wrapper .tag"
    ),
    key: "studioSprint1Tag",
  },
  {
    element: document.querySelector(
      ".studio-agenda-container .agenda-item-wrapper:nth-child(2) .agenda-item .agenda-details-wrapper .tag"
    ),
    key: "studioSprint2Tag",
  },
  {
    element: document.querySelector(
      ".studio-agenda-container .agenda-item-wrapper:nth-child(3) .agenda-item .agenda-details-wrapper .tag"
    ),
    key: "studioSprint3Tag",
  },
  {
    element: document.querySelector(
      ".studio-agenda-container .agenda-item-wrapper:nth-child(4) .agenda-item .agenda-details-wrapper .tag"
    ),
    key: "studioSprint4Tag",
  },

  {
    element: document.querySelector(
      ".studio-agenda-container .agenda-item-wrapper:nth-child(1) .agenda-item .agenda-details-wrapper .agenda-details-countdown"
    ),
    key: "studioSprint1Duration",
  },
  {
    element: document.querySelector(
      ".studio-agenda-container .agenda-item-wrapper:nth-child(2) .agenda-item .agenda-details-wrapper .agenda-details-countdown"
    ),
    key: "studioSprint2Duration",
  },
  {
    element: document.querySelector(
      ".studio-agenda-container .agenda-item-wrapper:nth-child(3) .agenda-item .agenda-details-wrapper .agenda-details-countdown"
    ),
    key: "studioSprint3Duration",
  },
  {
    element: document.querySelector(
      ".studio-agenda-container .agenda-item-wrapper:nth-child(4) .agenda-item .agenda-details-wrapper .agenda-details-countdown"
    ),
    key: "studioSprint4Duration",
  },
];

export const studioTranslations = {
  fr: {
    studioTitle: "(projets)",
    studioStrategicGuidance:
      "Conseils stratégiques, ateliers créatifs, sprints d’idéation et site vitrine — idéal pour les projets à court terme et les besoins spécifiques.",
    studioLargerProjects:
      "Des projets plus importants tels que la création d’identités visuelles, de plateformes e-commerce, l'intégration de CMS, et un accompagnement tout au long des évolutions du site et de la croissance du projet",

    studioPaulDescription: `Hey ! Je suis designer et je vis dans les Pyrénées.

Je suis en charge d'établir la vision créative du studio, en veillant à ce que chaque projet reflète une approche cohérente et innovante. Mon travail se caractérise par une attention minutieuse aux détails visuels et fonctionnels.

Avant de co-fonder TRIPALIUM avec Colin, j'ai travaillé chez AREA 17, où j'ai acquis une solide expérience en travaillant avec des design systèmes complexes et en abordant des problématiques business exigeantes. J'ai eu l'occasion de collaborer avec des marques renommées telles que Balenciaga, Saint Laurent, Van Cleef & Arpels, et des institutions culturelles comme Fine Art Museum of San Francisco et Maison Gainsbourg.

Sur mon temps libre, je rénove ma maison au milieu des montagnes et j’aime m’occuper de mon jardin. J’aime également faire des randonnées, de la moto et explorer tout ce qui touche au domaine de la création.`,
    studioColinDescription: `Hey ! Je suis développeur fullstack, actuellement basé au Pérou.

Chez TRIPALIUM, je m’occupe de tout ce qui est technique, en m’assurant que chaque projet soit performant, viable et surtout innovant. Je cherche toujours à améliorer l’efficacité de ce qu’on crée, tout en restant créatif.

Avant de co-fonder TRIPALIUM avec Paul, j'ai travaillé chez Gameloft au Canada, où j'ai eu l'opportunité de collaborer avec des clients prestigieux comme Sony Music et Warner etc.. Ces expériences m'ont permis de naviguer dans des environnements techniques complexes et variés et de relever des défis exigeants.

Quand je ne code pas, j'aime voyager, capturer des moments à travers la photographie, jouer du piano, et explorer de nouveaux univers qui me fascinent. Toujours prêt pour de nouveaux défis, surtout ceux qui mêlent créativité et technologie !
`,
    studioCircle1: "Approche\nholistique",
    studioCircle2: "Exécution\nprécise",
    studioCircle3: "Collaboration\nsur-mesure",

    // SPRINTS
    studioSprint1Tag: "Recherches & idéation",
    studioSprint2Tag: "Fondations & itérations",
    studioSprint3Tag: "développement",
    studioSprint4Tag: "Mise en ligne",

    studioSprint1Duration: "2 sem",
    studioSprint2Duration: "6 sem",
    studioSprint3Duration: "8 sem",
    studioSprint4Duration: "1 sem",
  },
  en: {
    studioTitle: "(works)",
    studioStrategicGuidance:
      "Strategic guidance, creative workshops, ideation sprints, and showcase website — perfect for tackling short-term projects and specific needs.",
    studioLargerProjects:
      "We also handle larger projects such as branding, e-commerce platforms, CMS integration, and deliver continuous care to website evolutions and project growth.",
    studioPaulDescription: `Hey! I’m a designer living in the French Pyrenees.

I define the creative vision of the studio, ensuring that every project reflects a consistent and innovative approach. My work focuses on careful attention to both visual and functional details.

Before co-founding TRIPALIUM with Colin, I worked at AREA 17, where I gained solid experience working with complex design systems and tackling demanding business challenges. I’ve had the chance to collaborate with renowned brands like Balenciaga, Saint Laurent, Van Cleef & Arpels, and cultural institutions such as the Fine Arts Museums of San Francisco and Maison Gainsbourg.

In my free time, I’m renovating my house in the mountains and love taking care of my garden. I also enjoy hiking, riding my motorcycle, and exploring anything related to the creative field.
`,
    studioColinDescription: `Hey! I'm a fullstack developer, currently based in Peru.

At TRIPALIUM, I handle all things technical, making sure every project is efficient, viable, and above all, innovative. I'm always looking for ways to improve what we create while staying creative.

Before co-founding TRIPALIUM with Paul, I worked at Gameloft in Canada, where I had the opportunity to collaborate with prestigious clients like Sony Music and Warner. These experiences helped me navigate complex and varied technical environments and tackle demanding challenges.

When I’m not coding, I love to travel, capture moments through photography, play the piano, and explore new worlds that fascinate me. Always ready for new challenges, especially those that combine creativity and technology!`,
    studioCircle1: "Holistic\napproach",
    studioCircle2: "Thoughful\nCraft",
    studioCircle3: "Bespoke\ncollaboration",

    // SPRINT
    studioSprint1Tag: "research & ideation",
    studioSprint2Tag: "Foundations & itérations",
    studioSprint3Tag: "Development",
    studioSprint4Tag: "Deployment",

    studioSprint1Duration: "2 weeks",
    studioSprint2Duration: "6 weeks",
    studioSprint3Duration: "8 weeks",
    studioSprint4Duration: "1 week",
  },
};
