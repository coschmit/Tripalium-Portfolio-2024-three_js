export const groups = {
  main: null,
  globe: null,
  markers: null,
};

export const elements = { markers: [] };

export const markersConfig = [
  {
    id: "paul",
    label: "Paul",
    latitude: 46.2276,
    longitude: 2.2137,
    overlayData: {
      city: "Saint-pé-de-bigorre",
      country: "France",
      latitude: "43° 06’ 07” N",
      longitude: "00° 09’ 33” W",
      altitude: "alt 360m",
      clock: "00:00AM",
      timeZone: "Europe/Paris",
    },
  },
  {
    id: "colin",
    label: "Colin",
    latitude: -12.046374,
    longitude: -77.042793,
    overlayData: {
      city: "Lima",
      country: "Peru",
      latitude: "12° 54’ 16” S",
      longitude: "77° 01’ 52” W",
      altitude: "alt 80m",
      clock: "00:00AM",
      timeZone: "America/Lima",
    },
  },
];

export const config = {
  colors: {
    globeMarkerColor: "rgb(255, 255, 255)",
    globeMarkerColorHovered: "rgb(150, 150, 150)",
    globeMarkerGlow: "rgb(255, 255, 255)",
  },
};
