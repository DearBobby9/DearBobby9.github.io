"use client";

import * as React from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const FIELD_SIZE = 500;
const TEXTURE_SIZE = 256;
type GoogleAntigravityTheme = "light" | "dark";

const NOISE_GLSL = `
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  float permute(float x){return floor(mod(((x*34.0)+1.0)*x, 289.0));}

  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  vec3 taylorInvSqrt(vec3 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float taylorInvSqrt(float r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
            -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= taylorInvSqrt( a0*a0 + h*h );
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    i = mod(i, 289.0);
    vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  vec4 grad4(float j, vec4 ip){
    const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
    vec4 p,s;
    p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
    p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
    s = vec4(lessThan(p, vec4(0.0)));
    p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;
    return p;
  }

  #define F4 0.309016994374947451

  float snoise(vec4 v){
    const vec4 C = vec4(0.138196601125011,
                        0.276393202250021,
                        0.414589803375032,
                       -0.447213595499958);

    vec4 i  = floor(v + dot(v, vec4(F4)) );
    vec4 x0 = v -   i + dot(i, C.xxxx);

    vec4 i0;
    vec3 isX = step( x0.yzw, x0.xxx );
    vec3 isYZ = step( x0.zww, x0.yyz );
    i0.x = isX.x + isX.y + isX.z;
    i0.yzw = 1.0 - isX;
    i0.y += isYZ.x + isYZ.y;
    i0.zw += 1.0 - isYZ.xy;
    i0.z += isYZ.z;
    i0.w += 1.0 - isYZ.z;

    vec4 i3 = clamp( i0, 0.0, 1.0 );
    vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
    vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

    vec4 x1 = x0 - i1 + 1.0 * C.xxxx;
    vec4 x2 = x0 - i2 + 2.0 * C.xxxx;
    vec4 x3 = x0 - i3 + 3.0 * C.xxxx;
    vec4 x4 = x0 - 1.0 + 4.0 * C.xxxx;

    i = mod(i, 289.0);
    float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
    vec4 j1 = permute( permute( permute( permute (
              i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
            + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
            + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
            + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));

    vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0);

    vec4 p0 = grad4(j0,   ip);
    vec4 p1 = grad4(j1.x, ip);
    vec4 p2 = grad4(j1.y, ip);
    vec4 p3 = grad4(j1.z, ip);
    vec4 p4 = grad4(j1.w, ip);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    p4 *= taylorInvSqrt(dot(p4,p4));

    vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
    vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)), 0.0);
    m0 = m0 * m0;
    m1 = m1 * m1;
    return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
                + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) );
  }
`;

type Point2 = [number, number];

const linearMap = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
  ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

function squaredDistance(point1: number[], point2: number[]) {
  let result = 0;
  for (let i = 0; i < point1.length; i += 1) {
    result += Math.pow(point1[i] - point2[i], 2);
  }
  return result;
}

function poissonDiskSample(width: number, height: number, minDistance: number, maxDistance: number, maxTries: number) {
  const shape = [width, height];
  const dimension = shape.length;
  let maxShape = 0;
  for (let i = 0; i < shape.length; i += 1) {
    maxShape = Math.max(maxShape, shape[i]);
  }

  const floatPrecisionMitigation = Math.max(1, (maxShape / 128) | 0);
  const epsilonDistance = 1e-14 * floatPrecisionMitigation;
  const minDistancePlusEpsilon = minDistance + epsilonDistance;
  const squaredMinDistance = minDistance * minDistance;
  const deltaDistance = Math.max(0, maxDistance - minDistancePlusEpsilon);
  const cellSize = minDistance / Math.sqrt(dimension);
  const gridShape = shape.map((size) => Math.ceil(size / cellSize));
  const stride = [gridShape[1], 1];
  const grid = new Uint32Array(gridShape[0] * gridShape[1]);
  const neighbourhood = getPoissonNeighbourhood(dimension);
  const samples: Point2[] = [];
  const process: Point2[] = [];
  let currentPoint: Point2 | null = null;

  const addPoint = (point: Point2) => {
    process.push(point);
    samples.push(point);
    let index = 0;
    for (let i = 0; i < dimension; i += 1) {
      index += ((point[i] / cellSize) | 0) * stride[i];
    }
    grid[index] = samples.length;
    return point;
  };

  const inNeighbourhood = (point: Point2) => {
    for (const offset of neighbourhood) {
      let index = 0;
      let valid = true;
      for (let i = 0; i < dimension; i += 1) {
        const sampleGridPosition = ((point[i] / cellSize) | 0) + offset[i];
        if (sampleGridPosition < 0 || sampleGridPosition >= gridShape[i]) {
          valid = false;
          break;
        }
        index += sampleGridPosition * stride[i];
      }

      if (valid && grid[index] !== 0) {
        const sample = samples[grid[index] - 1];
        if (squaredDistance(point, sample) < squaredMinDistance) return true;
      }
    }
    return false;
  };

  addPoint([Math.random() * width, Math.random() * height]);
  while (process.length > 0 || currentPoint !== null) {
    if (currentPoint === null) {
      currentPoint = process.shift() ?? null;
    }
    if (currentPoint === null) break;

    let accepted = false;
    for (let tries = 0; tries < maxTries; tries += 1) {
      const angle = Math.random() * Math.PI * 2;
      const distance = minDistancePlusEpsilon + deltaDistance * Math.random();
      const candidate: Point2 = [
        currentPoint[0] + Math.cos(angle) * distance,
        currentPoint[1] + Math.sin(angle) * distance,
      ];
      if (
        candidate[0] >= 0 &&
        candidate[0] < width &&
        candidate[1] >= 0 &&
        candidate[1] < height &&
        !inNeighbourhood(candidate)
      ) {
        addPoint(candidate);
        accepted = true;
        break;
      }
    }

    if (!accepted) {
      currentPoint = null;
    }
  }

  return samples;
}

function createMooreNeighbourhood(range = 1, dimensions = 2) {
  const size = range * 2 + 1;
  const length = Math.pow(size, dimensions) - 1;
  const neighbors: number[][] = new Array(length);
  for (let i = 0; i < length; i += 1) {
    const neighbor = (neighbors[i] = new Array(dimensions));
    let index = i < length / 2 ? i : i + 1;
    for (let dimension = 1; dimension <= dimensions; dimension += 1) {
      const value = index % Math.pow(size, dimension);
      neighbor[dimension - 1] = value / Math.pow(size, dimension - 1) - range;
      index -= value;
    }
  }
  return neighbors;
}

const neighbourhoodCache: Record<number, number[][]> = {};

function getPoissonNeighbourhood(dimensions: number) {
  if (neighbourhoodCache[dimensions]) return neighbourhoodCache[dimensions];

  const neighbourhood = createMooreNeighbourhood(2, dimensions).filter((neighbor) => {
    let distance = 0;
    for (let i = 0; i < dimensions; i += 1) {
      distance += Math.pow(Math.max(0, Math.abs(neighbor[i]) - 1), 2);
    }
    return distance < dimensions;
  });
  const origin = Array.from({ length: dimensions }, () => 0);
  neighbourhood.push(origin);
  neighbourhood.sort((a, b) => squaredDistance(a, origin) - squaredDistance(b, origin));
  neighbourhoodCache[dimensions] = neighbourhood;
  return neighbourhood;
}

class SmoothNoise {
  private readonly maxVertices = 256;
  private readonly maxVerticesMask = this.maxVertices - 1;
  private readonly values = Array.from({ length: this.maxVertices }, () => Math.random());
  private readonly amplitude = 1;
  private readonly scale = 1;

  getVal(value: number) {
    const t = value * this.scale;
    const index = Math.floor(t);
    const fraction = t - index;
    const smooth = fraction * fraction * (3 - 2 * fraction);
    const a = index % this.maxVerticesMask;
    const b = (a + 1) % this.maxVerticesMask;
    return (this.values[a] * (1 - smooth) + this.values[b] * smooth) * this.amplitude;
  }
}

class MainParticleField {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene: WebGLParticleScene;
  private readonly noise = new SmoothNoise();
  private readonly colorScheme: number;
  private readonly pointsData: number[];
  private readonly count: number;
  private readonly simScene = new THREE.Scene();
  private readonly simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private readonly mesh: THREE.Points;
  private readonly simMaterial: THREE.ShaderMaterial;
  private readonly renderMaterial: THREE.ShaderMaterial;
  private readonly posTex: THREE.DataTexture;
  private rt1: THREE.WebGLRenderTarget;
  private rt2: THREE.WebGLRenderTarget;
  private readonly ringPos = new THREE.Vector2(0, 0);
  private readonly cursorPos = new THREE.Vector2(0, 0);
  private lastTime = 0;
  private everRendered = false;
  private particleScale: number;

  constructor(scene: WebGLParticleScene) {
    this.scene = scene;
    this.renderer = scene.renderer;
    this.colorScheme = scene.theme === "dark" ? 0 : 1;
    this.particleScale = (this.renderer.domElement.width / scene.pixelRatio / 2000) * scene.particlesScale;

    const points = poissonDiskSample(
      FIELD_SIZE,
      FIELD_SIZE,
      linearMap(scene.density, 0, 300, 10, 2),
      linearMap(scene.density, 0, 300, 11, 3),
      20
    );
    this.pointsData = [];
    for (const point of points) {
      this.pointsData.push(point[0] - 250, point[1] - 250);
    }
    this.count = this.pointsData.length / 2;

    this.posTex = this.createDataTexturePosition();
    this.rt1 = this.createRenderTarget();
    this.rt2 = this.createRenderTarget();

    this.renderer.setRenderTarget(this.rt1);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.clear();
    this.renderer.setRenderTarget(this.rt2);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.clear();
    this.renderer.setRenderTarget(null);

    this.simMaterial = this.createSimulationMaterial();
    this.simScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.simMaterial));

    const geometry = new THREE.BufferGeometry();
    const uvs = new Float32Array(this.count * 2);
    const positions = new Float32Array(this.count * 3);
    const seeds = new Float32Array(this.count * 4);
    for (let i = 0; i < this.count; i += 1) {
      const x = i % TEXTURE_SIZE;
      const y = Math.floor(i / TEXTURE_SIZE);
      uvs[i * 2] = x / TEXTURE_SIZE;
      uvs[i * 2 + 1] = y / TEXTURE_SIZE;
      seeds[i * 4] = Math.random();
      seeds[i * 4 + 1] = Math.random();
      seeds[i * 4 + 2] = Math.random();
      seeds[i * 4 + 3] = Math.random();
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    geometry.setAttribute("seeds", new THREE.BufferAttribute(seeds, 4));

    this.renderMaterial = this.createRenderMaterial();
    this.mesh = new THREE.Points(geometry, this.renderMaterial);
    this.mesh.position.set(0, 0, 0);
    this.mesh.scale.set(5, 5, 5);
    this.scene.scene.add(this.mesh);
  }

  private createDataTexturePosition() {
    const data = new Float32Array(TEXTURE_SIZE * TEXTURE_SIZE * 4);
    for (let i = 0; i < this.count; i += 1) {
      const offset = i * 4;
      data[offset] = this.pointsData[i * 2] / 250;
      data[offset + 1] = this.pointsData[i * 2 + 1] / 250;
      data[offset + 2] = 0;
      data[offset + 3] = 0;
    }
    const texture = new THREE.DataTexture(data, TEXTURE_SIZE, TEXTURE_SIZE, THREE.RGBAFormat, THREE.FloatType);
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
    return texture;
  }

  private createRenderTarget() {
    return new THREE.WebGLRenderTarget(TEXTURE_SIZE, TEXTURE_SIZE, {
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      depthBuffer: false,
      stencilBuffer: false,
    });
  }

  private createSimulationMaterial() {
    return new THREE.ShaderMaterial({
      uniforms: {
        uPosition: { value: this.posTex },
        uPosRefs: { value: this.posTex },
        uRingPos: { value: new THREE.Vector2(0, 0) },
        uRingRadius: { value: 0.2 },
        uDeltaTime: { value: 0 },
        uRingWidth: { value: 0.05 },
        uRingWidth2: { value: 0.015 },
        uRingDisplacement: { value: this.scene.ringDisplacement },
        uTime: { value: 0 },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform sampler2D uPosition;
        uniform sampler2D uPosRefs;
        uniform vec2 uRingPos;
        uniform float uTime;
        uniform float uDeltaTime;
        uniform float uRingRadius;
        uniform float uRingWidth;
        uniform float uRingWidth2;
        uniform float uRingDisplacement;
        ${NOISE_GLSL}

        void main() {
          vec2 simTexCoords = gl_FragCoord.xy / vec2(${TEXTURE_SIZE.toFixed(1)}, ${TEXTURE_SIZE.toFixed(1)});
          vec4 pFrame = texture2D(uPosition, simTexCoords);
          float scale = pFrame.z;
          float velocity = pFrame.w;
          vec2 refPos = texture2D(uPosRefs, simTexCoords).xy;
          float time = uTime * .5;
          vec2 curentPos = refPos;
          vec2 pos = pFrame.xy;
          pos *= .8;
          float dist = distance(curentPos.xy, uRingPos);
          float noise0 = snoise(vec3(curentPos.xy * .2 + vec2(18.4924, 72.9744), time * 0.5));
          float dist1 = distance(curentPos.xy + (noise0 * .005), uRingPos);
          float t = smoothstep(uRingRadius - (uRingWidth * 2.), uRingRadius, dist) - smoothstep(uRingRadius, uRingRadius + uRingWidth, dist1);
          float t2 = smoothstep(uRingRadius - (uRingWidth2 * 2.), uRingRadius, dist) - smoothstep(uRingRadius, uRingRadius + uRingWidth2, dist1);
          float t3 = smoothstep(uRingRadius + uRingWidth2, uRingRadius, dist);
          t = pow(t, 2.);
          t2 = pow(t2, 3.);
          t += t2 * 3.;
          t += t3 * .4;
          t += snoise(vec3(curentPos.xy * 30. + vec2(11.4924, 12.9744), time * 0.5)) * t3 * .5;
          float nS = snoise(vec3(curentPos.xy * 2. + vec2(18.4924, 72.9744), time * 0.5));
          t += pow((nS + 1.5) * .5, 2.) * .6;
          float noise1 = snoise(vec3(curentPos.xy * 4. + vec2(88.494, 32.4397), time * 0.35));
          float noise2 = snoise(vec3(curentPos.xy * 4. + vec2(50.904, 120.947), time * 0.35));
          float noise3 = snoise(vec3(curentPos.xy * 20. + vec2(18.4924, 72.9744), time * .5));
          float noise4 = snoise(vec3(curentPos.xy * 20. + vec2(50.904, 120.947), time * .5));
          vec2 disp = vec2(noise1, noise2) * .03;
          disp += vec2(noise3, noise4) * .005;
          disp.x += sin((refPos.x * 20.) + (time * 4.)) * .02 * clamp(dist, 0., 1.);
          disp.y += cos((refPos.y * 20.) + (time * 3.)) * .02 * clamp(dist, 0., 1.);
          pos -= (uRingPos - (curentPos + disp)) * pow(t2, .75) * uRingDisplacement;
          float scaleDiff = t - scale;
          scaleDiff *= .2;
          scale += scaleDiff;
          vec2 finalPos = curentPos + disp + (pos * .25);
          velocity *= .5;
          velocity += scale * .25;
          gl_FragColor = vec4(finalPos, scale, velocity);
        }
      `,
    });
  }

  private createRenderMaterial() {
    return new THREE.ShaderMaterial({
      uniforms: {
        uPosition: { value: this.posTex },
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(this.scene.colorControls.color1) },
        uColor2: { value: new THREE.Color(this.scene.colorControls.color2) },
        uColor3: { value: new THREE.Color(this.scene.colorControls.color3) },
        uAlpha: { value: 1 },
        uRingPos: { value: new THREE.Vector2(0, 0) },
        uRez: { value: new THREE.Vector2(this.renderer.domElement.width, this.renderer.domElement.height) },
        uParticleScale: { value: this.particleScale },
        uPixelRatio: { value: this.scene.pixelRatio },
        uColorScheme: { value: this.colorScheme },
      },
      vertexShader: `
        precision highp float;
        attribute vec4 seeds;
        uniform sampler2D uPosition;
        uniform float uTime;
        uniform float uParticleScale;
        uniform float uPixelRatio;
        uniform int uColorScheme;
        varying vec4 vSeeds;
        varying float vVelocity;
        varying vec2 vLocalPos;
        varying vec2 vScreenPos;
        varying float vScale;

        void main() {
          vec4 pos = texture2D(uPosition, uv);
          vSeeds = seeds;
          vVelocity = pos.w;
          vScale = pos.z;
          vLocalPos = pos.xy;
          vec4 viewSpace = modelViewMatrix * vec4(vec3(pos.xy, 0.), 1.0);
          gl_Position = projectionMatrix * viewSpace;
          vScreenPos = gl_Position.xy;
          gl_PointSize = ((vScale * 7.) * (uPixelRatio * 0.5) * uParticleScale);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec4 vSeeds;
        varying vec2 vScreenPos;
        varying vec2 vLocalPos;
        varying float vScale;
        varying float vVelocity;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec2 uRingPos;
        uniform vec2 uRez;
        uniform float uAlpha;
        uniform float uTime;
        uniform int uColorScheme;
        ${NOISE_GLSL}
        #define PI 3.1415926535897932384626433832795

        float sdRoundBox(in vec2 p, in vec2 b, in vec4 r) {
          r.xy = (p.x > 0.0) ? r.xy : r.zw;
          r.x = (p.y > 0.0) ? r.x : r.y;
          vec2 q = abs(p) - b + r.x;
          return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r.x;
        }

        vec2 rotate(vec2 v, float a) {
          float s = sin(a);
          float c = cos(a);
          mat2 m = mat2(c, s, -s, c);
          return m * v;
        }

        void main() {
          float uBorderSize = 0.2;
          vec2 center = vec2(.48, .4);
          float ratio = uRez.x / uRez.y;
          float noiseAngle = snoise(vec3(vLocalPos * 10. + vec2(18.4924, 72.9744), uTime * .85));
          float noiseColor = snoise(vec3(vLocalPos * 2. + vec2(74.664, 91.556), uTime * .5));
          noiseColor = (noiseColor + 1.) * .5;
          float angle = atan(vLocalPos.y - uRingPos.y, vLocalPos.x - uRingPos.x);
          vec2 uv = gl_PointCoord.xy;
          uv -= vec2(0.5);
          uv.y *= -1.;
          uv = rotate(uv, -angle + (noiseAngle * .5));
          vec2 tuv = vScreenPos;
          tuv = rotate(tuv, uTime * 1.);
          tuv.y *= 1. / ratio;
          tuv += .5;
          float h = 0.8;
          float progress = smoothstep(0., .75, pow(noiseColor, 2.));
          vec3 col = mix(mix(uColor1, uColor2, progress / h), mix(uColor2, uColor3, (progress - h) / (1.0 - h)), step(h, progress));
          vec3 color = col;
          float dist = sqrt(dot(uv, uv));
          float dr = .5;
          float t = smoothstep(dr + (uBorderSize + .0001), dr - uBorderSize, dist);
          t = clamp(t, 0., 1.);
          float rounded = sdRoundBox(uv, vec2(0.5, 0.2), vec4(.25));
          rounded = smoothstep(.1, 0., rounded);
          float a = uAlpha * rounded * smoothstep(0.1, 0.2, vScale);
          if (a < 0.01) {
            discard;
          }
          color = clamp(color, 0., 1.);
          color = mix(color, color * clamp(vVelocity, 0., 1.), float(uColorScheme));
          gl_FragColor = vec4(color, clamp(a, 0., 1.));
          #ifdef SRGB_TRANSFER
            gl_FragColor = sRGBTransferOETF(gl_FragColor);
          #endif
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
  }

  resize() {
    this.renderMaterial.uniforms.uRez.value = new THREE.Vector2(this.renderer.domElement.width, this.renderer.domElement.height);
    this.renderMaterial.uniforms.uPixelRatio.value = this.scene.pixelRatio;
    this.renderMaterial.needsUpdate = true;
  }

  update() {
    const elapsed = this.scene.clock.getElapsedTime();
    const deltaTime = elapsed - this.lastTime;
    this.lastTime = elapsed;
    const noiseX = (this.noise.getVal(this.scene.time * 0.66 + 94.234) - 0.5) * 2;
    const noiseY = (this.noise.getVal(this.scene.time * 0.75 + 21.028) - 0.5) * 2;
    this.cursorPos.set(noiseX * 0.2, noiseY * 0.1);

    if (this.scene.isIntersecting) {
      this.cursorPos.set(this.scene.intersectionPoint.x * 0.175 + noiseX * 0.1, this.scene.intersectionPoint.y * 0.175 + noiseY * 0.1);
      this.ringPos.set(this.ringPos.x + (this.cursorPos.x - this.ringPos.x) * 0.02, this.ringPos.y + (this.cursorPos.y - this.ringPos.y) * 0.02);
    } else {
      this.cursorPos.set(noiseX * 0.2, noiseY * 0.1);
      this.ringPos.set(this.ringPos.x + (this.cursorPos.x - this.ringPos.x) * 0.01, this.ringPos.y + (this.cursorPos.y - this.ringPos.y) * 0.01);
    }

    this.particleScale = (this.renderer.domElement.width / this.scene.pixelRatio / 2000) * this.scene.particlesScale;
    this.simMaterial.uniforms.uPosition.value = this.everRendered ? this.rt1.texture : this.posTex;
    this.simMaterial.uniforms.uTime.value = elapsed;
    this.simMaterial.uniforms.uDeltaTime.value = deltaTime;
    this.simMaterial.uniforms.uRingRadius.value = 0.175 + Math.sin(this.scene.time) * 0.03 + Math.cos(this.scene.time * 3) * 0.02;
    this.simMaterial.uniforms.uRingPos.value = this.ringPos;
    this.simMaterial.uniforms.uRingWidth.value = this.scene.ringWidth;
    this.simMaterial.uniforms.uRingWidth2.value = this.scene.ringWidth2;
    this.simMaterial.uniforms.uRingDisplacement.value = this.scene.ringDisplacement;

    this.renderer.setRenderTarget(this.rt2);
    this.renderer.render(this.simScene, this.simCamera);
    this.renderer.setRenderTarget(null);

    this.renderMaterial.uniforms.uPosition.value = this.everRendered ? this.rt2.texture : this.posTex;
    this.renderMaterial.uniforms.uTime.value = elapsed;
    this.renderMaterial.uniforms.uRingPos.value = this.ringPos;
    this.renderMaterial.uniforms.uParticleScale.value = this.particleScale;
  }

  postRender() {
    const target = this.rt1;
    this.rt1 = this.rt2;
    this.rt2 = target;
    this.everRendered = true;
  }

  dispose() {
    this.mesh.geometry.dispose();
    if (Array.isArray(this.mesh.material)) {
      this.mesh.material.forEach((material) => material.dispose());
    } else {
      this.mesh.material.dispose();
    }
    this.rt1.dispose();
    this.rt2.dispose();
    this.posTex.dispose();
    this.simMaterial.dispose();
    this.renderMaterial.dispose();
  }
}

class WebGLParticleScene {
  readonly theme: GoogleAntigravityTheme;
  readonly scene = new THREE.Scene();
  readonly renderer: THREE.WebGLRenderer;
  readonly camera: THREE.PerspectiveCamera;
  readonly clock = new THREE.Clock();
  readonly raycaster = new THREE.Raycaster();
  readonly mouse = new THREE.Vector2();
  readonly intersectionPoint = new THREE.Vector3();
  readonly colorControls = {
    color1: "#2c64ed",
    color2: "#f84242",
    color3: "#ffcf03",
  };

  readonly particlesScale = 0.59;
  readonly density = 230;
  readonly ringWidth = 0.006;
  readonly ringWidth2 = 0.107;
  readonly ringDisplacement = 0.62;
  readonly pixelRatio = window.devicePixelRatio || 1;
  readonly particles: MainParticleField;

  private readonly container: HTMLElement;
  private readonly raycastPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(12.5, 12.5),
    new THREE.MeshBasicMaterial({ color: 0xff0000, visible: false, side: THREE.DoubleSide })
  );
  private resizeObserver?: ResizeObserver;
  private lastTime = 0;
  private skipFrame = false;
  private isPaused = false;
  private mouseIsOver = false;
  private readonly cursor = new THREE.Vector2();
  private screenWidth = window.innerWidth;
  private screenHeight = window.innerHeight;
  time = 0;
  isIntersecting = false;

  constructor(container: HTMLElement, theme: GoogleAntigravityTheme) {
    this.container = container;
    this.theme = theme;
    this.scene.background = new THREE.Color(theme === "dark" ? 0x09090b : 0xffffff);
    THREE.ColorManagement.enabled = false;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
      stencil: false,
      precision: "highp",
    });
    this.renderer.extensions.get("EXT_color_buffer_float");
    this.renderer.setPixelRatio(this.pixelRatio);
    this.container.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    this.camera.position.z = 3.1;
    this.scene.add(this.raycastPlane);
    this.resize();
    this.particles = new MainParticleField(this);
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.particles?.resize();
  }

  updatePointer(event: MouseEvent | PointerEvent) {
    this.cursor.x = event.clientX;
    this.cursor.y = event.clientY;
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  preRender() {
    const elapsed = this.clock.getElapsedTime();
    const delta = elapsed - this.lastTime;
    this.lastTime = elapsed;
    this.time += delta;
    this.particles.update();

    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = (this.cursor.x - rect.left) * (this.screenWidth / Math.max(1, rect.width));
    this.mouse.y = (this.cursor.y - rect.top) * (this.screenHeight / Math.max(1, rect.height));
    this.mouse.x = (this.mouse.x / Math.max(1, this.screenWidth)) * 2 - 1;
    this.mouse.y = -(this.mouse.y / Math.max(1, this.screenHeight)) * 2 + 1;
    this.mouseIsOver = !(this.mouse.x < -1 || this.mouse.x > 1 || this.mouse.y < -1 || this.mouse.y > 1);

    this.skipFrame = !this.skipFrame;
    if (this.skipFrame) return;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersections = this.raycaster.intersectObject(this.raycastPlane);
    if (intersections.length > 0 && this.mouseIsOver) {
      this.intersectionPoint.copy(intersections[0].point);
      this.isIntersecting = true;
    } else {
      this.isIntersecting = false;
    }
  }

  render() {
    if (this.isPaused) return;
    this.preRender();
    this.renderer.setRenderTarget(null);
    this.renderer.autoClear = false;
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
    this.particles.postRender();
  }

  stop() {
    this.isPaused = true;
    this.clock.stop();
  }

  resume() {
    this.isPaused = false;
    this.clock.start();
  }

  dispose() {
    this.stop();
    this.resizeObserver?.disconnect();
    this.scene.remove(this.raycastPlane);
    this.raycastPlane.geometry.dispose();
    this.raycastPlane.material.dispose();
    this.particles.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}

interface GoogleAntigravityBackgroundProps {
  className?: string;
  theme?: GoogleAntigravityTheme;
}

export function GoogleAntigravityBackground({
  className,
  theme = "light",
}: GoogleAntigravityBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new WebGLParticleScene(container, theme);
    let visible = true;

    const render = () => {
      frameRef.current = requestAnimationFrame(render);
      if (visible) scene.render();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) scene.resume();
      else scene.stop();
    });

    const onPointerMove = (event: MouseEvent | PointerEvent) => scene.updatePointer(event);

    observer.observe(container);
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frameRef.current = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("pointermove", onPointerMove);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      scene.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      data-background-kind="google-antigravity"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 block h-full w-full overflow-hidden [&_canvas]:absolute [&_canvas]:inset-0 [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full",
        className
      )}
      aria-hidden="true"
    />
  );
}
