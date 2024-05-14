export const wireframeVertex = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const wireframeFragment = `
uniform float uLineWidth;
uniform vec3 uLineColor;
uniform vec2 uResolution;

varying vec2 vUv; // Normalized UV coordinates

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float xGrid = mod(vUv.x * 10.0, 1.0);
  float yGrid = mod(vUv.y * 10.0, 1.0);
  float line = step(1.0 - uLineWidth, xGrid) + step(1.0 - uLineWidth, yGrid);
  gl_FragColor = vec4(uLineColor, line);
}
`;
