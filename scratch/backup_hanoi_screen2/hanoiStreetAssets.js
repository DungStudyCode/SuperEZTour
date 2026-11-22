import * as THREE from 'three';

/**
 * SUPER EZ TOUR — HANOI LIVING OLD QUARTER ASSETS & PROCEDURAL PBR SYSTEM
 * 
 * Generates lightweight, ultra-crisp procedural PBR textures and modular 
 * historical shophouse architecture for Hanoi Old Quarter (36 Phố Phường).
 */

// ============================================================================
// 1. HIGH-PRECISION PROCEDURAL PBR TEXTURE GENERATORS
// ============================================================================

/**
 * Generates realistic dark basalt / granite cobblestone street pavement
 * with wet morning specular sheen and mortar joints.
 */
export function createCobblestoneTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  try {
    // Base wet asphalt/mortar
    ctx.fillStyle = '#1c2227';
    ctx.fillRect(0, 0, size, size);

    // Draw staggered pavers
    const rows = 16;
    const cols = 8;
    const blockH = size / rows;
    const blockW = size / cols;

    for (let r = 0; r < rows; r++) {
      const xOffset = (r % 2) * (blockW * 0.5);
      for (let c = -1; c <= cols + 1; c++) {
        const x = c * blockW + xOffset;
        const y = r * blockH;

        // Slight natural color variations for stone pavers
        const shade = 35 + Math.floor(Math.sin(r * 3 + c * 7) * 8 + Math.random() * 8);
        ctx.fillStyle = `rgb(${shade}, ${shade + 3}, ${shade + 6})`;
        
        // Rounded paver edges (cross-browser fallback)
        const pad = 2.5;
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(x + pad, y + pad, blockW - pad * 2, blockH - pad * 2, 3);
        } else {
          ctx.rect(x + pad, y + pad, blockW - pad * 2, blockH - pad * 2);
        }
        ctx.fill();

        // Subtle surface stone flecks
        ctx.fillStyle = `rgba(255, 255, 255, 0.04)`;
        ctx.fillRect(x + pad + 4, y + pad + 4, blockW - pad * 2 - 8, blockH * 0.4);
      }
    }

    // Morning wet puddle streaks
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
    grad.addColorStop(0.5, 'transparent');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0.08)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  } catch (err) {
    console.warn('[hanoiStreetAssets] Error creating cobblestone texture:', err);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 6);
  return texture;
}

/**
 * Generates Hanoi signature colonial yellow stucco wall texture with
 * aged patina, rain streaks, and plaster weathering.
 */
export function createColonialYellowWallTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  try {
    // Base warm ochre yellow plaster
    ctx.fillStyle = '#caa357';
    ctx.fillRect(0, 0, size, size);

    // Subtle tonal noise
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const w = 4 + Math.random() * 24;
      const h = 4 + Math.random() * 24;
      const alpha = 0.03 + Math.random() * 0.05;
      ctx.fillStyle = Math.random() > 0.5 
        ? `rgba(235, 205, 140, ${alpha})` 
        : `rgba(145, 110, 50, ${alpha})`;
      ctx.fillRect(x, y, w, h);
    }

    // Dark rain weathering runoff streaks down the wall
    for (let s = 0; s < 14; s++) {
      const sx = 10 + Math.random() * (size - 20);
      const sw = 12 + Math.random() * 28;
      const streakGrad = ctx.createLinearGradient(sx, 0, sx, size);
      streakGrad.addColorStop(0, 'rgba(75, 60, 40, 0.35)');
      streakGrad.addColorStop(0.35, 'rgba(95, 75, 45, 0.15)');
      streakGrad.addColorStop(1, 'rgba(110, 90, 50, 0.02)');
      ctx.fillStyle = streakGrad;
      ctx.fillRect(sx, 0, sw, size * (0.6 + Math.random() * 0.4));
    }

    // Exposed brick patch near base (cross-browser fallback)
    ctx.fillStyle = 'rgba(140, 65, 48, 0.45)';
    ctx.beginPath();
    if (typeof ctx.ellipse === 'function') {
      ctx.ellipse(size * 0.2, size * 0.85, 45, 25, 0, 0, Math.PI * 2);
    } else {
      ctx.arc(size * 0.2, size * 0.85, 30, 0, Math.PI * 2);
    }
    ctx.fill();
  } catch (err) {
    console.warn('[hanoiStreetAssets] Error creating yellow wall texture:', err);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * Generates ancient Yin-Yang terracotta roof tile texture with moss streaks.
 */
export function createRoofTileTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  try {
    // Base terracotta
    ctx.fillStyle = '#6b3628';
    ctx.fillRect(0, 0, size, size);

    // Vertical tile flutes
    const flutes = 16;
    const fluteW = size / flutes;
    for (let f = 0; f < flutes; f++) {
      const x = f * fluteW;
      const grad = ctx.createLinearGradient(x, 0, x + fluteW, 0);
      grad.addColorStop(0, 'rgba(40, 18, 12, 0.65)');
      grad.addColorStop(0.4, 'rgba(150, 80, 60, 0.35)');
      grad.addColorStop(0.7, 'rgba(180, 95, 75, 0.2)');
      grad.addColorStop(1, 'rgba(30, 12, 8, 0.8)');
      ctx.fillStyle = grad;
      ctx.fillRect(x, 0, fluteW, size);

      // Weathered green moss in crevices
      if (f % 3 === 0) {
        ctx.fillStyle = 'rgba(70, 85, 45, 0.35)';
        ctx.fillRect(x, size * 0.4, fluteW * 0.35, size * 0.6);
      }
    }
  } catch (err) {
    console.warn('[hanoiStreetAssets] Error creating roof tile texture:', err);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

/**
 * Generates Indochine dark green wooden louver shutter texture.
 */
export function createWoodLouverTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  try {
    ctx.fillStyle = '#1e3d34';
    ctx.fillRect(0, 0, size, size);

    // Horizontal louvers
    const slats = 24;
    const slatH = size / slats;
    for (let i = 0; i < slats; i++) {
      const y = i * slatH;
      ctx.fillStyle = 'rgba(12, 24, 20, 0.85)';
      ctx.fillRect(0, y, size, 2.5);
      ctx.fillStyle = 'rgba(50, 95, 80, 0.45)';
      ctx.fillRect(0, y + 2.5, size, slatH - 2.5);
    }
  } catch (err) {
    console.warn('[hanoiStreetAssets] Error creating wood louver texture:', err);
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Generates authentic lacquer and gold leaf signboard texture.
 */
export function createSignboardTexture(title, subtitle = '') {
  const width = 512;
  const height = 128;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  try {
    // Lacquered dark mahogany board
    ctx.fillStyle = '#24140e';
    ctx.fillRect(0, 0, width, height);

    // Gold border frame
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 5;
    ctx.strokeRect(8, 8, width - 16, height - 16);
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(14, 14, width - 28, height - 28);

    // Title in serif gold leaf
    ctx.fillStyle = '#f3e5ab';
    ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(title, width / 2, subtitle ? 52 : 64);

    // Subtitle
    if (subtitle) {
      ctx.fillStyle = '#d4af37';
      ctx.font = '16px sans-serif';
      try {
        ctx.letterSpacing = '2px';
      } catch (_) {}
      ctx.fillText(subtitle.toUpperCase(), width / 2, 92);
    }
  } catch (err) {
    console.warn('[hanoiStreetAssets] Error creating signboard texture:', err);
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// ============================================================================
// 2. MODULAR SHOPHOUSE ARCHITECTURAL FACTORY
// ============================================================================

export function createModularOldQuarterStreet(pbrTextures) {
  const streetGroup = new THREE.Group();

  try {
    const {
      cobblestone,
      colonialYellow,
      roofTile,
      woodLouver,
    } = pbrTextures;

  // Shared PBR Materials
  const wallMat = new THREE.MeshStandardMaterial({
    map: colonialYellow,
    roughness: 0.85,
    metalness: 0.05,
  });

  const wallAgedMat = new THREE.MeshStandardMaterial({
    color: 0xba9b58,
    roughness: 0.88,
    metalness: 0.05,
  });

  const roofMat = new THREE.MeshStandardMaterial({
    map: roofTile,
    roughness: 0.78,
    metalness: 0.08,
  });

  const louverMat = new THREE.MeshStandardMaterial({
    map: woodLouver,
    roughness: 0.65,
    metalness: 0.1,
  });

  const ironMat = new THREE.MeshStandardMaterial({
    color: 0x161b20,
    roughness: 0.45,
    metalness: 0.75,
  });

  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x2b1c14,
    roughness: 0.72,
    metalness: 0.1,
  });

  const awningMat = new THREE.MeshStandardMaterial({
    color: 0x8a4536,
    roughness: 0.8,
  });

  // ==========================================================================
  // STREET GROUND & SIDEWALKS
  // ==========================================================================
  // Cobblestone roadway
  const streetGeo = new THREE.PlaneGeometry(8.4, 44, 32, 64);
  const streetMat = new THREE.MeshStandardMaterial({
    map: cobblestone,
    roughness: 0.28,
    metalness: 0.35,
  });
  const streetMesh = new THREE.Mesh(streetGeo, streetMat);
  streetMesh.rotation.x = -Math.PI / 2;
  streetMesh.position.set(0, 0, -14);
  streetMesh.receiveShadow = true;
  streetGroup.add(streetMesh);

  // Granite curbs (Bó vỉa đá)
  const curbMat = new THREE.MeshStandardMaterial({ color: 0x3d4349, roughness: 0.65 });
  const curbLeft = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 44), curbMat);
  curbLeft.position.set(-3.2, 0.1, -14);
  const curbRight = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 44), curbMat);
  curbRight.position.set(3.2, 0.1, -14);
  streetGroup.add(curbLeft);
  streetGroup.add(curbRight);

  // Raised Sidewalks (Vỉa hè)
  const sidewalkMat = new THREE.MeshStandardMaterial({ color: 0x323940, roughness: 0.75 });
  const sidewalkLeft = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.18, 44), sidewalkMat);
  sidewalkLeft.position.set(-4.5, 0.09, -14);
  const sidewalkRight = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.18, 44), sidewalkMat);
  sidewalkRight.position.set(4.5, 0.09, -14);
  streetGroup.add(sidewalkLeft);
  streetGroup.add(sidewalkRight);

  // ==========================================================================
  // SHOPHOUSE ARTIFACT BUILDERS
  // ==========================================================================

  // TYPE A: 3-Story French Neoclassical Colonial
  function buildColonialHouse(signText, subText) {
    const house = new THREE.Group();
    // 3-story main wall
    const wall = new THREE.Mesh(new THREE.BoxGeometry(4.4, 7.6, 2.0), wallMat);
    wall.position.y = 3.8;
    house.add(wall);

    // Mansard / Pitch Roof
    const roof = new THREE.Mesh(new THREE.ConeGeometry(3.2, 1.6, 4), roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.set(0, 8.4, 0.2);
    roof.scale.set(1.4, 0.9, 0.9);
    house.add(roof);

    // Floor 1 Storefront Arch
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.4, 0.12), darkWoodMat);
    door.position.set(0, 1.2, 1.02);
    house.add(door);

    // Signboard
    if (signText) {
      const signTex = createSignboardTexture(signText, subText);
      const signMat = new THREE.MeshStandardMaterial({ map: signTex, roughness: 0.4 });
      const sign = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.6, 0.06), signMat);
      sign.position.set(0, 2.75, 1.05);
      house.add(sign);
    }

    // Floor 2 Balcony with Wrought Iron
    const balBase = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.16, 0.8), ironMat);
    balBase.position.set(0, 3.1, 1.25);
    house.add(balBase);
    const balRail = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.75, 0.04), ironMat);
    balRail.position.set(0, 3.5, 1.63);
    house.add(balRail);

    // Louvered Windows Floor 2
    const winF2L = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.5, 0.06), louverMat);
    winF2L.position.set(-0.7, 4.25, 1.02);
    const winF2R = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.5, 0.06), louverMat);
    winF2R.position.set(0.7, 4.25, 1.02);
    house.add(winF2L);
    house.add(winF2R);

    // Floor 3 Windows & Cornice
    const cornice = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.25, 0.3), wallAgedMat);
    cornice.position.set(0, 5.25, 1.05);
    house.add(cornice);

    const winF3L = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.3, 0.06), louverMat);
    winF3L.position.set(-0.7, 6.2, 1.02);
    const winF3R = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.3, 0.06), louverMat);
    winF3R.position.set(0.7, 6.2, 1.02);
    house.add(winF3L);
    house.add(winF3R);

    // Hanging Lantern
    const lantern = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 12, 12),
      new THREE.MeshStandardMaterial({
        color: 0xffaa44,
        emissive: 0xffaa44,
        emissiveIntensity: 2.2,
      })
    );
    lantern.position.set(0, 2.5, 1.35);
    house.add(lantern);

    return house;
  }

  // TYPE B: 2-Story Traditional Merchant Tube House (Nhà ống thương nhân)
  function buildTraditionalMerchantHouse(signText, subText) {
    const house = new THREE.Group();
    // 2-story main wall
    const wall = new THREE.Mesh(new THREE.BoxGeometry(4.0, 5.4, 2.0), wallAgedMat);
    wall.position.y = 2.7;
    house.add(wall);

    // Sloped Yin-Yang Roof with Extended Eaves
    const roof = new THREE.Mesh(new THREE.ConeGeometry(2.8, 1.4, 4), roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.set(0, 6.0, 0.3);
    roof.scale.set(1.5, 0.8, 1.1);
    house.add(roof);

    // Cửa bức bàn (Traditional folding wooden doors)
    const door = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.2, 0.1), darkWoodMat);
    door.position.set(0, 1.1, 1.02);
    house.add(door);

    // Striped Awning
    const awning = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.08, 0.8), awningMat);
    awning.rotation.x = 0.25;
    awning.position.set(0, 2.45, 1.35);
    house.add(awning);

    // Signboard
    if (signText) {
      const signTex = createSignboardTexture(signText, subText);
      const signMat = new THREE.MeshStandardMaterial({ map: signTex, roughness: 0.4 });
      const sign = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.55, 0.06), signMat);
      sign.position.set(0, 2.75, 1.05);
      house.add(sign);
    }

    // Wooden Balcony on Floor 2
    const bal = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.8, 0.6), darkWoodMat);
    bal.position.set(0, 3.4, 1.15);
    house.add(bal);

    // Hanging Lantern
    const lantern = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 12, 12),
      new THREE.MeshStandardMaterial({
        color: 0xff9933,
        emissive: 0xff9933,
        emissiveIntensity: 2.0,
      })
    );
    lantern.position.set(0, 2.3, 1.35);
    house.add(lantern);

    return house;
  }

  // TYPE C: 2.5-Story Indochine Art Deco Shophouse
  function buildArtDecoHouse(signText, subText) {
    const house = new THREE.Group();
    const wall = new THREE.Mesh(new THREE.BoxGeometry(4.2, 6.6, 2.0), wallMat);
    wall.position.y = 3.3;
    house.add(wall);

    // Art Deco Stepped Pediment
    const pediment = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.9, 0.4), wallAgedMat);
    pediment.position.set(0, 6.9, 0.9);
    house.add(pediment);

    // Entrance
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.2, 0.1), darkWoodMat);
    door.position.set(0, 1.1, 1.02);
    house.add(door);

    // Signboard
    if (signText) {
      const signTex = createSignboardTexture(signText, subText);
      const signMat = new THREE.MeshStandardMaterial({ map: signTex, roughness: 0.4 });
      const sign = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.55, 0.06), signMat);
      sign.position.set(0, 2.65, 1.05);
      house.add(sign);
    }

    // Floor 2 Balcony
    const bal = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.7, 0.7), ironMat);
    bal.position.set(0, 3.25, 1.25);
    house.add(bal);

    const win = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.4, 0.06), louverMat);
    win.position.set(0, 4.3, 1.02);
    house.add(win);

    return house;
  }

  // ==========================================================================
  // ARRANGE HOUSES ALONG THE STREET CANYON (Z = +2 down to Z = -28)
  // ==========================================================================
  // Left Side (-X)
  const leftConfigs = [
    { type: 'A', z: 1.5, sign: null },
    { type: 'B', z: -3.5, sign: 'HÀNG BẠC', sub: 'Kim hoàn gia truyền' }, // Hotspot 1
    { type: 'C', z: -8.8, sign: null },
    { type: 'B', z: -15.5, sign: '87 MÃ MÂY', sub: 'Nhà cổ di sản' },     // Hotspot 3
    { type: 'A', z: -21.2, sign: null },
    { type: 'C', z: -26.5, sign: null },
  ];

  leftConfigs.forEach((cfg) => {
    let house;
    if (cfg.type === 'A') house = buildColonialHouse(cfg.sign, cfg.sub);
    else if (cfg.type === 'B') house = buildTraditionalMerchantHouse(cfg.sign, cfg.sub);
    else house = buildArtDecoHouse(cfg.sign, cfg.sub);

    house.position.set(-5.6, 0, cfg.z);
    house.rotation.y = Math.PI / 2;
    streetGroup.add(house);
  });

  // Right Side (+X)
  const rightConfigs = [
    { type: 'C', z: 1.5, sign: null },
    { type: 'A', z: -4.0, sign: null },
    { type: 'B', z: -9.5, sign: 'CÀ PHÊ GIẢNG', sub: 'Trứng nóng 1946' }, // Hotspot 2
    { type: 'C', z: -15.0, sign: null },
    { type: 'A', z: -21.5, sign: 'HOA PHỐ CỔ', sub: 'Cúc họa mi mùa đông' }, // Hotspot 4
    { type: 'B', z: -26.8, sign: null },
  ];

  rightConfigs.forEach((cfg) => {
    let house;
    if (cfg.type === 'A') house = buildColonialHouse(cfg.sign, cfg.sub);
    else if (cfg.type === 'B') house = buildTraditionalMerchantHouse(cfg.sign, cfg.sub);
    else house = buildArtDecoHouse(cfg.sign, cfg.sub);

    house.position.set(5.6, 0, cfg.z);
    house.rotation.y = -Math.PI / 2;
    streetGroup.add(house);
  });

  // ==========================================================================
  // STREET PROPS: VINTAGE FLOWER BICYCLE (XE HOA CÚC HỌA MI at Z = -21.5)
  // ==========================================================================
  const flowerBike = new THREE.Group();
  flowerBike.position.set(2.4, 0, -21.2);
  flowerBike.rotation.y = -0.4;

  const bikeMat = new THREE.MeshStandardMaterial({ color: 0x1f2428, metalness: 0.8, roughness: 0.3 });
  const wheelGeo = new THREE.TorusGeometry(0.36, 0.025, 8, 24);
  const w1 = new THREE.Mesh(wheelGeo, bikeMat);
  w1.position.set(-0.65, 0.36, 0);
  const w2 = new THREE.Mesh(wheelGeo, bikeMat);
  w2.position.set(0.65, 0.36, 0);
  flowerBike.add(w1);
  flowerBike.add(w2);

  // Bike Frame
  const frameTube = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.3), bikeMat);
  frameTube.rotation.z = Math.PI / 2;
  frameTube.position.set(0, 0.65, 0);
  flowerBike.add(frameTube);

  // Rear Flower Baskets (Woven bamboo holding white daisies / cúc họa mi)
  const basketMat = new THREE.MeshStandardMaterial({ color: 0xbfa068, roughness: 0.85 });
  const daisyWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7 });
  const daisyCoreMat = new THREE.MeshStandardMaterial({ color: 0xffd23f, roughness: 0.6 });

  const rearBaskets = new THREE.Group();
  rearBaskets.position.set(-0.55, 0.85, 0);

  // Basket container
  const basketMesh = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.35, 0.55), basketMat);
  rearBaskets.add(basketMesh);

  // Clustered white daisies (cúc họa mi)
  for (let d = 0; d < 28; d++) {
    const daisy = new THREE.Group();
    const petal = new THREE.Mesh(new THREE.SphereGeometry(0.065, 6, 6), daisyWhiteMat);
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.028, 6, 6), daisyCoreMat);
    core.position.y = 0.035;
    daisy.add(petal);
    daisy.add(core);

    daisy.position.set(
      (Math.random() - 0.5) * 0.55,
      0.18 + Math.random() * 0.22,
      (Math.random() - 0.5) * 0.45
    );
    rearBaskets.add(daisy);
  }
  flowerBike.add(rearBaskets);
  streetGroup.add(flowerBike);

  // ==========================================================================
  // STREET PROPS: BAMBOO VENDOR YOKE & BASKETS (GÁNH HÀNG RONG at Z = -4.2)
  // ==========================================================================
  const vendorYoke = new THREE.Group();
  vendorYoke.position.set(-2.5, 0, -4.2);
  vendorYoke.rotation.y = 0.35;

  const b1 = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.28, 0.25, 16), basketMat);
  b1.position.set(-0.65, 0.14, 0);
  const b2 = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.28, 0.25, 16), basketMat);
  b2.position.set(0.65, 0.14, 0);
  const yokePole = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.5), basketMat);
  yokePole.rotation.z = Math.PI / 2;
  yokePole.position.set(0, 0.7, 0);
  vendorYoke.add(b1);
  vendorYoke.add(b2);
  vendorYoke.add(yokePole);
  streetGroup.add(vendorYoke);

  // ==========================================================================
  // OVERHEAD ELECTRICAL CABLES (DÂY ĐIỆN PHỐ CỔ HÀ NỘI)
  // ==========================================================================
  const cableMat = new THREE.LineBasicMaterial({ color: 0x14181c, linewidth: 1.5 });
  for (let c = 0; c < 7; c++) {
    const zC = 2 - c * 4.6;
    const cablePoints = [];
    cablePoints.push(new THREE.Vector3(-5.2, 5.4, zC - 0.5));
    cablePoints.push(new THREE.Vector3(-1.8, 4.6 + Math.sin(c) * 0.2, zC - 0.1));
    cablePoints.push(new THREE.Vector3(1.8, 4.7 + Math.cos(c) * 0.2, zC + 0.2));
    cablePoints.push(new THREE.Vector3(5.2, 5.6, zC + 0.4));

      const cableCurve = new THREE.CatmullRomCurve3(cablePoints);
      const cableGeo = new THREE.BufferGeometry().setFromPoints(cableCurve.getPoints(24));
      const cableLine = new THREE.Line(cableGeo, cableMat);
      streetGroup.add(cableLine);
    }
  } catch (err) {
    console.warn('[hanoiStreetAssets] Error building streetscape:', err);
  }

  return streetGroup;
}
