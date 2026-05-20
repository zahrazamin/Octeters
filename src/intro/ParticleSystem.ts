import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders';

// ─── Inline 3D simplex noise (Stefan Gustavson) ───────────────────────────
const _GRAD3: readonly [number, number, number][] = [
  [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
  [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
  [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1],
];
const _PERM   = new Uint8Array(512);
const _PERM12 = new Uint8Array(512);
(function () {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = p[i]; p[i] = p[j]; p[j] = t;
  }
  for (let i = 0; i < 512; i++) {
    _PERM[i]   = p[i & 255];
    _PERM12[i] = _PERM[i] % 12;
  }
}());

function noise3d(xin: number, yin: number, zin: number): number {
  const F3 = 1 / 3, G3 = 1 / 6;
  const s  = (xin + yin + zin) * F3;
  const i  = Math.floor(xin + s);
  const j  = Math.floor(yin + s);
  const k  = Math.floor(zin + s);
  const t  = (i + j + k) * G3;
  const x0 = xin - (i - t), y0 = yin - (j - t), z0 = zin - (k - t);
  let i1: number, j1: number, k1: number;
  let i2: number, j2: number, k2: number;
  if (x0 >= y0) {
    if      (y0 >= z0) { i1=1;j1=0;k1=0; i2=1;j2=1;k2=0; }
    else if (x0 >= z0) { i1=1;j1=0;k1=0; i2=1;j2=0;k2=1; }
    else               { i1=0;j1=0;k1=1; i2=1;j2=0;k2=1; }
  } else {
    if      (y0 < z0)  { i1=0;j1=0;k1=1; i2=0;j2=1;k2=1; }
    else if (x0 < z0)  { i1=0;j1=1;k1=0; i2=0;j2=1;k2=1; }
    else               { i1=0;j1=1;k1=0; i2=1;j2=1;k2=0; }
  }
  const x1=x0-i1+G3, y1=y0-j1+G3, z1=z0-k1+G3;
  const x2=x0-i2+2*G3, y2=y0-j2+2*G3, z2=z0-k2+2*G3;
  const x3=x0-1+3*G3, y3=y0-1+3*G3, z3=z0-1+3*G3;
  const ii=i&255, jj=j&255, kk=k&255;
  let n = 0;
  let tt: number;
  tt = 0.6 - x0*x0 - y0*y0 - z0*z0;
  if (tt >= 0) { tt *= tt; const g=_GRAD3[_PERM12[ii+_PERM[jj+_PERM[kk]]]]; n+=tt*tt*(g[0]*x0+g[1]*y0+g[2]*z0); }
  tt = 0.6 - x1*x1 - y1*y1 - z1*z1;
  if (tt >= 0) { tt *= tt; const g=_GRAD3[_PERM12[ii+i1+_PERM[jj+j1+_PERM[kk+k1]]]]; n+=tt*tt*(g[0]*x1+g[1]*y1+g[2]*z1); }
  tt = 0.6 - x2*x2 - y2*y2 - z2*z2;
  if (tt >= 0) { tt *= tt; const g=_GRAD3[_PERM12[ii+i2+_PERM[jj+j2+_PERM[kk+k2]]]]; n+=tt*tt*(g[0]*x2+g[1]*y2+g[2]*z2); }
  tt = 0.6 - x3*x3 - y3*y3 - z3*z3;
  if (tt >= 0) { tt *= tt; const g=_GRAD3[_PERM12[ii+1+_PERM[jj+1+_PERM[kk+1]]]]; n+=tt*tt*(g[0]*x3+g[1]*y3+g[2]*z3); }
  return 32 * n;
}

// ─── ParticleSystem ───────────────────────────────────────────────────────
export class ParticleSystem {
  private canvas: HTMLCanvasElement;
  private count: number;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private geometry: THREE.BufferGeometry | null = null;
  private material: THREE.ShaderMaterial | null = null;
  private positions: Float32Array;
  private sizes: Float32Array;
  private opacities: Float32Array;
  private colors: Float32Array;
  private driftX: Float32Array;
  private driftY: Float32Array;
  private rafId = 0;
  private fadeRafId = 0;
  private time = 0;
  private masterOpacity = 0;

  constructor(canvas: HTMLCanvasElement, count: number) {
    this.canvas  = canvas;
    this.count   = count;
    this.positions = new Float32Array(count * 3);
    this.sizes     = new Float32Array(count);
    this.opacities = new Float32Array(count);
    this.colors    = new Float32Array(count * 3);
    this.driftX    = new Float32Array(count);
    this.driftY    = new Float32Array(count);
  }

  init(): void {
    const { count, canvas } = this;

    // ── Renderer ─────────────────────────────────────────────────────
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);

    // ── Scene + camera ────────────────────────────────────────────────
    this.scene  = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.z = 3;

    // ── Particle data ─────────────────────────────────────────────────
    // Color distribution: 60% deep blue-black, 25% electric blue, 10% teal, 5% white
    const palette: [number, number, number][] = [
      [0x0a / 255, 0x14 / 255, 0x29 / 255],  // deep blue-black
      [0x1a / 255, 0x6f / 255, 0xff / 255],  // electric blue #1A6FFF
      [0x00 / 255, 0xb4 / 255, 0xd8 / 255],  // teal #00B4D8
      [1, 1, 1],                               // white
    ];

    // Box-Muller transform for Gaussian sampling
    const gaussian = (mean: number, std: number): number => {
      const u = 1 - Math.random();
      const v = Math.random();
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * std + mean;
    };

    const clusterCount = Math.floor(count * 0.6);

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const isCluster = i < clusterCount;

      if (isCluster) {
        // Center cluster: Gaussian around origin, tighter on y
        this.positions[ix]     = Math.max(-2.6, Math.min(2.6, gaussian(0, 0.8)));
        this.positions[ix + 1] = Math.max(-1.6, Math.min(1.8, gaussian(0, 0.4)));
        this.sizes[i]          = 0.012 + Math.random() * 0.033;  // 0.012 → 0.045
      } else {
        // Ambient: uniform across full field
        this.positions[ix]     = (Math.random() - 0.5) * 5;
        this.positions[ix + 1] = (Math.random() - 0.5) * 3;
        this.sizes[i]          = 0.006 + Math.random() * 0.014;  // 0.006 → 0.020
      }

      this.positions[ix + 2] = (Math.random() - 0.5) * 2;        // z: -1.0 → 1.0
      this.opacities[i] = 0.1   + Math.random() * 0.35;           // 0.1   → 0.45

      const r = Math.random();
      const col = r < 0.75 ? palette[0] : r < 0.95 ? palette[1] : palette[2];
      this.colors[ix]     = col[0];
      this.colors[ix + 1] = col[1];
      this.colors[ix + 2] = col[2];

      this.driftX[i] = (Math.random() - 0.5) * 0.0008;                // slight x wander
      this.driftY[i] = 0.0003 + Math.random() * 0.0007;               // upward bias
    }

    // ── BufferGeometry ────────────────────────────────────────────────
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('aSize',    new THREE.BufferAttribute(this.sizes,     1));
    this.geometry.setAttribute('aOpacity', new THREE.BufferAttribute(this.opacities, 1));
    this.geometry.setAttribute('aColor',   new THREE.BufferAttribute(this.colors,    3));

    // ── Material ──────────────────────────────────────────────────────
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uPixelRatio:    { value: Math.min(window.devicePixelRatio, 2) },
        uMasterOpacity: { value: 0 },
      },
      transparent: true,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    });

    const points = new THREE.Points(this.geometry, this.material);
    this.scene.add(points);

    window.addEventListener('resize', this.onResize);
  }

  private onResize = (): void => {
    if (!this.renderer || !this.camera) return;
    const w = window.innerWidth, h = window.innerHeight;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if (this.material) this.material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
  };

  start(): void {
    const tick = (): void => {
      this.rafId = requestAnimationFrame(tick);
      this.time += 0.005;

      const { count, positions, driftX, driftY } = this;
      for (let i = 0; i < count; i++) {
        const ix = i * 3, iy = i * 3 + 1;
        const noiseOff = noise3d(positions[ix] * 0.3, positions[iy] * 0.3, this.time * 0.1) * 0.002;
        positions[ix]     += driftX[i] + noiseOff;
        positions[iy]     += driftY[i];
        // Wrap at edges
        if (positions[ix]     >  2.6) positions[ix]     = -2.6;
        if (positions[ix]     < -2.6) positions[ix]     =  2.6;
        if (positions[iy]     >  1.8) positions[iy]     = -1.6;
      }

      if (this.geometry) this.geometry.attributes.position.needsUpdate = true;
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    };
    tick();
  }

  stop(): void {
    cancelAnimationFrame(this.rafId);
  }

  fadeIn(ms: number): void {
    cancelAnimationFrame(this.fadeRafId);
    const t0 = performance.now();
    const from = this.masterOpacity;
    const tick = (): void => {
      const progress = Math.min(1, (performance.now() - t0) / ms);
      this.masterOpacity = from + (1 - from) * progress;
      if (this.material) this.material.uniforms.uMasterOpacity.value = this.masterOpacity;
      if (progress < 1) this.fadeRafId = requestAnimationFrame(tick);
    };
    this.fadeRafId = requestAnimationFrame(tick);
  }

  fadeOut(ms: number): void {
    cancelAnimationFrame(this.fadeRafId);
    const t0 = performance.now();
    const from = this.masterOpacity;
    const tick = (): void => {
      const progress = Math.min(1, (performance.now() - t0) / ms);
      this.masterOpacity = from * (1 - progress);
      if (this.material) this.material.uniforms.uMasterOpacity.value = this.masterOpacity;
      if (progress < 1) this.fadeRafId = requestAnimationFrame(tick);
    };
    this.fadeRafId = requestAnimationFrame(tick);
  }

  dispose(): void {
    this.stop();
    cancelAnimationFrame(this.fadeRafId);
    window.removeEventListener('resize', this.onResize);
    this.geometry?.dispose();
    this.material?.dispose();
    this.renderer?.dispose();
    this.scene?.clear();
    this.geometry = null;
    this.material = null;
    this.renderer = null;
    this.scene    = null;
    this.camera   = null;
  }
}
