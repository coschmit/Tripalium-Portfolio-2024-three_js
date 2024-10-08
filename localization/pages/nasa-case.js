export const nasaCaseTranslationsRefs = [
  {
    element: document.querySelector("#cs-nasa-paragraph-1 h1"),
    key: "nasaParagraphTitle1",
  },
  {
    element: document.querySelector("#cs-nasa-paragraph-2 h1"),
    key: "nasaParagraphTitle2",
  },
  {
    element: document.querySelector("#cs-nasa-paragraph-3 h1"),
    key: "nasaParagraphTitle3",
  },
  {
    element: document.querySelector("#cs-nasa-paragraph-1 p"),
    key: "nasaParagraphContent1",
  },
  {
    element: document.querySelector("#cs-nasa-paragraph-2 p"),
    key: "nasaParagraphContent2",
  },
  {
    element: document.querySelector("#cs-nasa-paragraph-3 p"),
    key: "nasaParagraphContent3",
  },
  // visit website
  {
    element: document.querySelector(".cs-header-visit-site-wrapper a"),
    key: "visitWebsite",
  },
  {
    element: document.querySelector(".project-detail-visit-website-section a"),
    key: "visitWebsite",
  },
];

export const nasaCaseTranslations = {
  fr: {
    nasaParagraphTitle1: "Digitaliser un livre physique",
    nasaParagraphTitle2: "Une expérience narrative",
    nasaParagraphTitle3: "un enjeu de performance",
    nasaParagraphContent1: `Créer un site web à partir d'un livre physique requière de numériser le contenu du livre pour créer une interface qui présente le contenu de celui-ci de manière interactive et engageante. Ce processus nécessite de remettre en question la structure, les images, la typographie [...] du livre afin de créer une expérience immersive.
    
    Concernant la Direction Artistique, nous avions la volonté de suivre les grands principes définis par Steffen Knöll dans son ouvrage “Nasa Apollo 11 — Man on the Moon, The Visual Archive” tout en l’adaptant au web et à ses contraintes`,
    nasaParagraphContent2: `Étant basé sur un livre physique, le site se veut être très narratif. Une navigation infini permets d’errer dans l’immensité de cette archive, en commençant sa lecture par n’importe quel chapitre du livre sans que ce choix altère l’expérience. Pour enrichir l’expérience, nous avons portés une attention particulière aux transitions et micro-interactions. 
    
    Nous avons également veillé à utiliser des images de haute qualité toutes issues des archives publiques de la Nasa, en restant soucieux de la fluidité de l’expérience et de l’optimisation des performances du site.`,
    nasaParagraphContent3: `Toute la complexité du projet réside dans l’optimisation des performances d’affichage 
et des différentes interactions. L’objectif étant de préserver une expérience utilisateur fluide et immersive sur tous les appareils. 

Pour gérer les images brutes et très lourdes des archives officielles de la NASA, nous avons appliqué des optimisation spécifiques, réduisant leur poids tout en préservant leur qualité. De plus, l’intégration du lazy loading permet un chargement progressif, assurant une expérience fluide et sans délais, même avec de nombreux assets en arrière-plan.`,
    visitWebsite: "visiter le site",
  },
  en: {
    nasaParagraphTitle1: "Digitizing a physical product",
    nasaParagraphTitle2: "A narrative experience",
    nasaParagraphTitle3: "A matter of performance",
    nasaParagraphContent1: `Making a website based on a physical book involve digitizing the content of the book to create an interface that presents the book’s content in an interactive and engaging way. This process require to challenging the book’s structure, images, typography [...] in order to create an immersive experience
    
    Regarding the Art Direction, we wanted to follow the major design principles defined by Steffen Knöll in his book "Nasa Apollo 11 - Man on the Moon, The Visual Archive" while adapting it to the web and its constraints.`,
    nasaParagraphContent2: `Based on a physical book, the website is intended to be very narrative. An infinite navigation allows you to walk through the immensity of this archive, starting your reading with any chapter of the book without altering the experience. To improve the experience, we paid particular attention to transitions and micro-interactions.
    
    We also made sure to use high-quality images all from the public archives of Nasa, while being mindful of the fluidity of the experience and the optimization of the site's performance.`,
    nasaParagraphContent3: `The project’s complexity lies in optimizing various interactions and display performances in order to preserve a smooth and immersive user experience across all devices.

To manage the large raw images from the official NASA archives, we applied specific optimizations, reducing their weight while preserving their quality. Additionally, the integration of a lazy loading ensures a fluid and friction-free experience, regardless of multiple assets in the background.`,
    visitWebsite: "visit website",
  },
};
