/**
 * GLSL Shaders for Water Ripples & Liquid Image Transitions
 */

export const waterDistortionVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const waterDistortionFragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Wave distortion formula
    float waveX = sin(uv.y * 12.0 + uTime * 2.0) * 0.015 * uProgress;
    float waveY = cos(uv.x * 12.0 + uTime * 2.0) * 0.015 * uProgress;
    
    vec2 distortedUv = uv + vec2(waveX, waveY);
    vec4 color = texture2D(uTexture, distortedUv);
    
    // Subtle chromatic aberration on edges
    float r = texture2D(uTexture, distortedUv + vec2(0.003 * uProgress, 0.0)).r;
    float g = color.g;
    float b = texture2D(uTexture, distortedUv - vec2(0.003 * uProgress, 0.0)).b;
    
    gl_FragColor = vec4(r, g, b, color.a);
  }
`;