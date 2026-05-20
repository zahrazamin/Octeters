export const vertexShader = /* glsl */`
  uniform float uPixelRatio;
  attribute float aSize;
  attribute float aOpacity;
  attribute vec3 aColor;
  varying float vOpacity;
  varying vec3 vColor;

  void main() {
    vOpacity = aOpacity;
    vColor = aColor;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    gl_PointSize = aSize * uPixelRatio * (1.0 / -viewPosition.z) * 800.0;
  }
`;

export const fragmentShader = /* glsl */`
  uniform float uMasterOpacity;
  varying float vOpacity;
  varying vec3 vColor;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float strength = 1.0 - (dist * 2.0);
    strength = pow(strength, 2.5);
    gl_FragColor = vec4(vColor, strength * vOpacity * uMasterOpacity);
  }
`;
