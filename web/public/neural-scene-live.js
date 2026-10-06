import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const COLORS = {
  background: 0x070610,
  violet: 0x7c3aed,
  purple: 0xa855f7,
  lavender: 0xc4b5fd,
  backprop: 0xf0abfc,
};
const LAYERS = [4, 7, 7, 5, 3];
const LAYER_X = [-6.1, -3.15, -0.15, 2.85, 5.85];
const LAYER_Z = [1.8, -1.5, 1.35, -1.65, 1.55];
const LOOP_SECONDS = 12;
const TAU = Math.PI * 2;

const modeColors = [COLORS.violet, COLORS.purple, COLORS.lavender];
const modeFlows = [
  ['Image', 'Features', 'Prediction'],
  ['History', 'Patterns', 'Forecast'],
  ['Question', 'Experiment', 'Evidence'],
];

function seededRandom() {
  let seed = 816219;
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function smooth(value) {
  const amount = THREE.MathUtils.clamp(value, 0, 1);
  return amount * amount * (3 - 2 * amount);
}

function distanceOnLoop(time, eventTime) {
  let delta = time - eventTime;
  if (delta > LOOP_SECONDS / 2) delta -= LOOP_SECONDS;
  if (delta < -LOOP_SECONDS / 2) delta += LOOP_SECONDS;
  return delta;
}

function makeGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext('2d');
  const glow = context.createRadialGradient(32, 32, 1, 32, 32, 32);
  glow.addColorStop(0, 'rgba(255,255,255,0.8)');
  glow.addColorStop(0.25, 'rgba(255,255,255,0.26)');
  glow.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = glow;
  context.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function mountNeuralScene(host, mode = 0, initiallyPaused = false) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'low-power',
    preserveDrawingBuffer: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(COLORS.background, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.domElement.setAttribute('role', 'img');
  renderer.domElement.setAttribute(
    'aria-label',
    'Mô hình neuron 3D với năm lớp, tín hiệu truyền xuôi, lan truyền ngược và bề mặt loss landscape',
  );
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(COLORS.background, 14, 36);
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 80);
  scene.add(new THREE.AmbientLight(COLORS.lavender, 0.66));
  const keyLight = new THREE.PointLight(COLORS.lavender, 42, 30, 2);
  keyLight.position.set(-2, 7, 8);
  scene.add(keyLight);
  const fillLight = new THREE.PointLight(COLORS.purple, 24, 24, 2);
  fillLight.position.set(7, 1, -4);
  scene.add(fillLight);

  const geometries = [];
  const materials = [];
  const network = new THREE.Group();
  network.scale.setScalar(1.12);
  scene.add(network);
  const layerPalette = [COLORS.violet, COLORS.purple, COLORS.lavender, COLORS.purple, COLORS.violet];
  const nodeGeometry = new THREE.SphereGeometry(1, 22, 18);
  geometries.push(nodeGeometry);
  const glowTexture = makeGlowTexture();
  const nodeLayers = [];
  const layerMeshes = [];
  const layerMaterials = [];
  const layerBaseEmissive = [];

  LAYERS.forEach((count, layer) => {
    const meshMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      vertexColors: true,
      emissive: layerPalette[layer],
      emissiveIntensity: 0.76,
      metalness: 0.1,
      roughness: 0.28,
    });
    const mesh = new THREE.InstancedMesh(nodeGeometry, meshMaterial, count);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const dummy = new THREE.Object3D();
    const records = [];

    for (let index = 0; index < count; index++) {
      const centered = index - (count - 1) / 2;
      const phase = (index * 1.7 + layer * 0.83) % TAU;
      const base = new THREE.Vector3(
        LAYER_X[layer] + Math.sin(index * 2.3 + layer) * 0.14,
        0.82 + centered * 0.68 + Math.sin(index * 1.1 + layer) * 0.11,
        LAYER_Z[layer] + Math.cos(index * 0.92 + layer * 0.64) * 0.64,
      );
      const depth = THREE.MathUtils.clamp((base.z + 2.4) / 5.2, 0, 1);
      const radius = THREE.MathUtils.lerp(0.125, 0.225, depth);
      const nodeColor = new THREE.Color(layerPalette[layer]).lerp(
        new THREE.Color(COLORS.background),
        0.52 - depth * 0.3,
      );
      mesh.setColorAt(index, nodeColor);
      records.push({ base, phase, radius, depth });
      dummy.position.copy(base);
      dummy.scale.setScalar(radius);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);

      const haloMaterial = new THREE.SpriteMaterial({
        map: glowTexture,
        color: layerPalette[layer],
        transparent: true,
        opacity: 0.3 + depth * 0.1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      materials.push(haloMaterial);
      const halo = new THREE.Sprite(haloMaterial);
      halo.position.copy(base);
      halo.scale.setScalar(radius * 4.6);
      network.add(halo);
    }

    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
    network.add(mesh);
    nodeLayers.push(records);
    layerMeshes.push(mesh);
    layerMaterials.push(meshMaterial);
    layerBaseEmissive.push(new THREE.Color(layerPalette[layer]));
    materials.push(meshMaterial);
  });

  // A thin tilted halo around each layer makes the depth planes readable in perspective.
  const layerRingGeometry = new THREE.TorusGeometry(2.45, 0.012, 5, 72);
  geometries.push(layerRingGeometry);
  LAYER_X.forEach((x, index) => {
    const material = new THREE.MeshBasicMaterial({
      color: index % 2 ? COLORS.purple : COLORS.violet,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    materials.push(material);
    const ring = new THREE.Mesh(layerRingGeometry, material);
    ring.position.set(x, 0.82, LAYER_Z[index]);
    ring.rotation.y = Math.PI / 2;
    ring.rotation.x = (index - 2) * 0.025;
    network.add(ring);
  });

  // Fine connections span the actual 3D positions in adjacent layers.
  const edgePairs = [];
  const edgePositions = [];
  const edgeColors = [];
  for (let layer = 0; layer < nodeLayers.length - 1; layer++) {
    for (let source = 0; source < nodeLayers[layer].length; source++) {
      for (let target = 0; target < nodeLayers[layer + 1].length; target++) {
        edgePairs.push({ layer, source, target });
        edgePositions.push(0, 0, 0, 0, 0, 0);
        const from = new THREE.Color(layerPalette[layer]).multiplyScalar(0.58);
        const to = new THREE.Color(layerPalette[layer + 1]).multiplyScalar(0.72);
        edgeColors.push(from.r, from.g, from.b, to.r, to.g, to.b);
      }
    }
  }
  const edgeGeometry = new THREE.BufferGeometry();
  edgeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3).setUsage(THREE.DynamicDrawUsage));
  edgeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(edgeColors, 3));
  const edgeMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    vertexColors: true,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
  edges.frustumCulled = false;
  network.add(edges);
  geometries.push(edgeGeometry);
  materials.push(edgeMaterial);

  // Each bead follows one real edge; reverse beads are pink only during backpropagation.
  const pulses = [];
  const pulseGeometry = new THREE.SphereGeometry(0.055, 12, 10);
  geometries.push(pulseGeometry);
  function addPulse(route, stage, reverse) {
    const layer = reverse ? 3 - stage : stage;
    const fromLayer = reverse ? layer + 1 : layer;
    const toLayer = reverse ? layer : layer + 1;
    const fromIndex = reverse ? (route * 3 + stage * 2 + 1) % nodeLayers[fromLayer].length : route % nodeLayers[fromLayer].length;
    const toIndex = reverse ? route % nodeLayers[toLayer].length : (route * 3 + stage * 2 + 1) % nodeLayers[toLayer].length;
    const color = reverse ? COLORS.backprop : modeColors[mode % modeColors.length];
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    materials.push(material);
    const bead = new THREE.Mesh(pulseGeometry, material);
    bead.scale.setScalar(reverse ? 1.2 : 1);
    network.add(bead);
    pulses.push({ bead, material, fromLayer, fromIndex, toLayer, toIndex, route, stage, reverse });
  }
  for (let route = 0; route < 7; route++) {
    for (let stage = 0; stage < 4; stage++) {
      addPulse(route, stage, false);
      addPulse(route, stage, true);
    }
  }

  // A true X/Z loss surface with vertical Gaussian-bowl displacement.
  const bowlCenter = -1.2;
  const bowlDepth = 0.78;
  const lossBaseY = -2.2;
  function lossHeight(x, z) {
    const dx = x - bowlCenter;
    return -bowlDepth * Math.exp(-(dx * dx) / 22 - (z * z) / 1.35);
  }
  const columns = 66;
  const rows = 19;
  const landscapePositions = [];
  const landscapeColors = [];
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const x = -6.35 + (column / (columns - 1)) * 12.7;
      const z = -2.1 + (row / (rows - 1)) * 4.2;
      const y = lossBaseY + lossHeight(x, z);
      const brightness = Math.exp(-((x - bowlCenter) ** 2) / 8 - (z * z) / 0.8);
      const color = new THREE.Color(COLORS.violet).lerp(new THREE.Color(COLORS.lavender), brightness * 0.58);
      if (column < columns - 1) {
        landscapePositions.push(x, y, z, x + 12.7 / (columns - 1), lossBaseY + lossHeight(x + 12.7 / (columns - 1), z), z);
        landscapeColors.push(color.r, color.g, color.b, color.r, color.g, color.b);
      }
      if (row < rows - 1) {
        landscapePositions.push(x, y, z, x, lossBaseY + lossHeight(x, z + 4.2 / (rows - 1)), z + 4.2 / (rows - 1));
        landscapeColors.push(color.r, color.g, color.b, color.r, color.g, color.b);
      }
    }
  }
  const landscapeGeometry = new THREE.BufferGeometry();
  landscapeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(landscapePositions, 3));
  landscapeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(landscapeColors, 3));
  const landscapeMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    vertexColors: true,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const landscape = new THREE.LineSegments(landscapeGeometry, landscapeMaterial);
  landscape.frustumCulled = false;
  scene.add(landscape);
  geometries.push(landscapeGeometry);
  materials.push(landscapeMaterial);

  const descent = [{ x: 5.7, z: 0.8 }];
  for (let step = 0; step < 220; step++) {
    const current = descent[descent.length - 1];
    const dx = current.x - bowlCenter;
    const exponential = Math.exp(-(dx * dx) / 22 - (current.z * current.z) / 1.35);
    const gradientX = bowlDepth * exponential * (2 * dx / 22);
    const gradientZ = bowlDepth * exponential * (2 * current.z / 1.35);
    descent.push({ x: current.x - gradientX * 1.7, z: current.z - gradientZ * 1.4 });
  }
  const ballRadius = 0.105;
  const ballMaterial = new THREE.MeshStandardMaterial({
    color: COLORS.lavender,
    emissive: COLORS.purple,
    emissiveIntensity: 1.2,
    roughness: 0.23,
    metalness: 0.12,
  });
  materials.push(ballMaterial);
  const ball = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 20, 16), ballMaterial);
  geometries.push(ball.geometry);
  scene.add(ball);
  const ballLight = new THREE.PointLight(COLORS.purple, 7, 2.8, 2);
  scene.add(ballLight);

  const floor = new THREE.GridHelper(30, 26, COLORS.violet, COLORS.purple);
  floor.position.y = -3.22;
  const floorMaterials = Array.isArray(floor.material) ? floor.material : [floor.material];
  floorMaterials.forEach(material => {
    material.transparent = true;
    material.opacity = 0.09;
    material.blending = THREE.AdditiveBlending;
    material.depthWrite = false;
  });
  scene.add(floor);
  geometries.push(floor.geometry);
  materials.push(...floorMaterials);

  const random = seededRandom();
  const particleCount = 300;
  const particleData = [];
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);
  const particlePalette = [COLORS.violet, COLORS.purple, COLORS.lavender];
  for (let index = 0; index < particleCount; index++) {
    const x = (random() - 0.5) * 28;
    const y = (random() - 0.5) * 11;
    const z = (random() - 0.5) * 18;
    const phase = random() * TAU;
    const harmonic = 1 + Math.floor(random() * 4);
    const color = new THREE.Color(particlePalette[index % particlePalette.length]).multiplyScalar(0.22 + random() * 0.22);
    particleData.push({ x, y, z, phase, harmonic, drift: 0.06 + random() * 0.14 });
    particlePositions.set([x, y, z], index * 3);
    particleColors.set([color.r, color.g, color.b], index * 3);
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setUsage(THREE.DynamicDrawUsage));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
  const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({
    size: 0.034,
    vertexColors: true,
    transparent: true,
    opacity: 0.74,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }));
  scene.add(particles);
  geometries.push(particleGeometry);
  materials.push(particles.material);

  const currentNodes = nodeLayers.map(layer => layer.map(() => new THREE.Vector3()));
  const temporaryMatrix = new THREE.Object3D();
  const forwardDuration = 0.68;
  const flashes = LAYERS.map(() => ({ forward: 0, backward: 0 }));
  const activeModeColor = new THREE.Color(modeColors[mode % modeColors.length]);
  pulses.forEach(item => {
    if (!item.reverse) item.material.color.copy(activeModeColor);
  });

  let elapsed = 0;
  let previous = 0;
  let frame = 0;
  let paused = initiallyPaused;
  let visible = true;
  let pointerX = 0;
  let pointerY = 0;
  let disposed = false;

  function draw(timestamp = 0) {
    if (disposed) return;
    if (previous && !paused) elapsed += Math.min((timestamp - previous) / 1000, 0.05);
    previous = timestamp;
    const phase = ((elapsed % LOOP_SECONDS) + LOOP_SECONDS) % LOOP_SECONDS;
    const angle = TAU * phase / LOOP_SECONDS;

    camera.position.set(
      4.8 + Math.sin(angle) * 1.25 + pointerX * 2.2,
      4.1 + Math.sin(angle + 0.7) * 0.24 - pointerY * 1.15,
      15.7 + Math.cos(angle) * 0.48,
    );
    camera.lookAt(0, -0.48, 0);
    network.rotation.y = 0.19 + Math.sin(angle) * 0.1 + pointerX * 0.12;
    network.rotation.x = -0.035 + Math.cos(angle) * 0.045 + pointerY * 0.06;
    network.rotation.z = -0.018 + Math.sin(angle * 2) * 0.025;

    for (let layer = 0; layer < nodeLayers.length; layer++) {
      for (let index = 0; index < nodeLayers[layer].length; index++) {
        const record = nodeLayers[layer][index];
        const wave = angle * (1 + (index % 3)) + record.phase;
        const x = record.base.x + Math.sin(wave) * 0.045;
        const y = record.base.y + Math.sin(wave) * 0.055;
        const z = record.base.z + Math.sin(wave) * 0.19;
        currentNodes[layer][index].set(x, y, z);
        temporaryMatrix.position.copy(currentNodes[layer][index]);
        temporaryMatrix.scale.setScalar(record.radius * (1 + Math.sin(wave + 0.5) * 0.035));
        temporaryMatrix.updateMatrix();
        layerMeshes[layer].setMatrixAt(index, temporaryMatrix.matrix);
      }
      layerMeshes[layer].instanceMatrix.needsUpdate = true;
    }

    const edgeAttribute = edgeGeometry.attributes.position;
    edgePairs.forEach((edge, index) => {
      edgeAttribute.setXYZ(index * 2, ...currentNodes[edge.layer][edge.source].toArray());
      edgeAttribute.setXYZ(index * 2 + 1, ...currentNodes[edge.layer + 1][edge.target].toArray());
    });
    edgeAttribute.needsUpdate = true;
    flashes.forEach(flash => { flash.forward = 0; flash.backward = 0; });

    for (const item of pulses) {
      const start = item.reverse
        ? 6.15 + item.stage * 0.76 + item.route * 0.052
        : 0.34 + item.stage * 0.79 + item.route * 0.052;
      const duration = item.reverse ? 0.63 : forwardDuration;
      const pulsePhase = (phase - start + LOOP_SECONDS) % LOOP_SECONDS;
      if (pulsePhase <= duration) {
        const progress = pulsePhase / duration;
        const envelope = Math.min(progress / 0.12, (1 - progress) / 0.14, 1);
        item.material.opacity = Math.max(0, smooth(envelope));
        item.bead.position.lerpVectors(
          currentNodes[item.fromLayer][item.fromIndex],
          currentNodes[item.toLayer][item.toIndex],
          progress,
        );
      } else {
        item.material.opacity = 0;
      }

      const hitTime = (start + duration * 0.82) % LOOP_SECONDS;
      const delta = distanceOnLoop(phase, hitTime);
      const flash = Math.exp(-(delta * delta) / (2 * 0.15 * 0.15));
      const hitLayer = item.reverse ? 3 - item.stage : item.stage + 1;
      const type = item.reverse ? 'backward' : 'forward';
      flashes[hitLayer][type] = Math.max(flashes[hitLayer][type], flash);
    }

    for (let layer = 0; layer < layerMaterials.length; layer++) {
      const flash = flashes[layer];
      const material = layerMaterials[layer];
      const regular = new THREE.Color(layerBaseEmissive[layer]).lerp(
        new THREE.Color(COLORS.lavender),
        flash.forward * 0.78,
      );
      material.emissive.copy(regular.lerp(new THREE.Color(COLORS.backprop), flash.backward * 0.88));
      material.emissiveIntensity = 0.72 + Math.max(flash.forward, flash.backward) * 0.8;
    }

    const particleArray = particleGeometry.attributes.position.array;
    for (let index = 0; index < particleData.length; index++) {
      const particle = particleData[index];
      const wave = angle * particle.harmonic + particle.phase;
      particleArray[index * 3] = particle.x + Math.sin(wave) * particle.drift;
      particleArray[index * 3 + 1] = particle.y + Math.cos(wave) * particle.drift * 0.58;
      particleArray[index * 3 + 2] = particle.z + Math.sin(wave * 2) * particle.drift * 0.46;
    }
    particleGeometry.attributes.position.needsUpdate = true;

    const descendSeconds = 4.3;
    let ballX;
    let ballZ;
    let ballOpacity;
    if (phase <= descendSeconds) {
      const point = phase / descendSeconds * (descent.length - 1);
      const low = Math.floor(point);
      const high = Math.min(low + 1, descent.length - 1);
      const fraction = point - low;
      ballX = THREE.MathUtils.lerp(descent[low].x, descent[high].x, fraction);
      ballZ = THREE.MathUtils.lerp(descent[low].z, descent[high].z, fraction);
      ballOpacity = phase > 3.87 ? 1 - smooth((phase - 3.87) / 0.48) : 1;
    } else if (phase < 7.15) {
      ballX = bowlCenter;
      ballZ = 0;
      ballOpacity = 0;
    } else if (phase < 7.68) {
      const reset = smooth((phase - 7.15) / 0.53);
      ballX = THREE.MathUtils.lerp(bowlCenter, 5.7, reset);
      ballZ = THREE.MathUtils.lerp(0, 0.8, reset);
      ballOpacity = 0;
    } else {
      ballX = 5.7;
      ballZ = 0.8;
      ballOpacity = phase < 8.13 ? smooth((phase - 7.68) / 0.45) : 1;
    }
    ball.position.set(ballX, lossBaseY + lossHeight(ballX, ballZ) + ballRadius + 0.035, ballZ);
    ball.rotation.z = -phase * 0.55;
    ball.material.transparent = ballOpacity < 1;
    ball.material.opacity = ballOpacity;
    ballLight.position.copy(ball.position);
    ballLight.intensity = 7 * ballOpacity;

    renderer.render(scene, camera);
    if (!paused && visible && !document.hidden) frame = requestAnimationFrame(draw);
  }

  function start() {
    cancelAnimationFrame(frame);
    previous = 0;
    draw();
  }
  function resize() {
    if (!host.clientWidth || !host.clientHeight) return;
    camera.aspect = host.clientWidth / host.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(host.clientWidth, host.clientHeight, false);
    if (paused) draw();
  }
  function onPause(event) {
    paused = Boolean(event.detail);
    previous = 0;
    if (paused) {
      cancelAnimationFrame(frame);
      draw();
    } else if (visible && !document.hidden) {
      start();
    }
  }
  function onPointerMove(event) {
    if (event.pointerType === 'touch') return;
    const bounds = host.getBoundingClientRect();
    pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;
    if (paused) draw();
  }
  function onPointerLeave() {
    pointerX = 0;
    pointerY = 0;
    if (paused) draw();
  }
  function onVisibility() {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      previous = 0;
    } else if (visible && !paused) {
      start();
    }
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const visibilityObserver = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible && !paused && !document.hidden) start();
    else cancelAnimationFrame(frame);
  }, { threshold: 0.05 });
  visibilityObserver.observe(host);
  host.addEventListener('neural-scene:pause', onPause);
  host.addEventListener('pointermove', onPointerMove);
  host.addEventListener('pointerleave', onPointerLeave);
  document.addEventListener('visibilitychange', onVisibility);
  resize();
  start();

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    host.removeEventListener('neural-scene:pause', onPause);
    host.removeEventListener('pointermove', onPointerMove);
    host.removeEventListener('pointerleave', onPointerLeave);
    document.removeEventListener('visibilitychange', onVisibility);
    geometries.forEach(geometry => geometry.dispose());
    materials.forEach(material => material.dispose());
    glowTexture.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
