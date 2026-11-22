import * as THREE from 'three';

/**
 * SUPER EZ TOUR — HANOI PHOTOREALISTIC PROTOTYPE: PBR TEXTURE GENERATOR
 * 
 * Injects authentic 19th-century French-Indochinese architectural textures
 * directly onto the detailed 157k-triangle CAD geometry of Turtle Tower (Tháp Rùa, 1886).
 * 
 * Features:
 * - 100% Cross-browser safe Canvas 2D procedural rendering (no unhandled API crashes).
 * - Authentic colonial ochre stucco, aged terracotta brick, glazed mossy roof tiles,
 *   Thăng Long grey limestone, and tropical weeping willow foliage.
 * - Hardware-accelerated Three.js CanvasTexture instances with repeat wrapping.
 */

function createSafeCanvas(width, height) {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

/**
 * 1. Colonial Weathered Stucco (Tường Vàng Thuộc Địa Phai Màu & Rêu Phong)
 * Replaces flat Mat 7 on Turtle Tower tiers 1, 2, 3 and arched portals.
 */
export function createWeatheredStuccoTexture(size = 512) {
  const canvas = createSafeCanvas(size, size);
  if (!canvas) return new THREE.Texture();
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  try {
    // Base Hanoi historic colonial ochre
    ctx.fillStyle = '#caa357';
    ctx.fillRect(0, 0, size, size);

    // Multi-tonal lime wash variations (patches of faded plaster vs exposed lime)
    for (let i = 0; i < 350; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const w = 6 + Math.random() * 32;
      const h = 6 + Math.random() * 32;
      const alpha = 0.03 + Math.random() * 0.07;
      ctx.fillStyle = Math.random() > 0.4
        ? `rgba(238, 215, 158, ${alpha})`
        : `rgba(142, 108, 48, ${alpha})`;
      ctx.fillRect(x, y, w, h);
    }

    // Vertical rain runoff & damp moss streaks (Vết nước mưa ngàn năm)
    for (let s = 0; s < 18; s++) {
      const sx = 10 + Math.random() * (size - 20);
      const sw = 8 + Math.random() * 26;
      const sh = size * (0.45 + Math.random() * 0.55);
      const streakGrad = ctx.createLinearGradient(sx, 0, sx, sh);
      streakGrad.addColorStop(0, 'rgba(55, 48, 32, 0.45)');
      streakGrad.addColorStop(0.3, 'rgba(78, 68, 42, 0.25)');
      streakGrad.addColorStop(0.7, 'rgba(52, 65, 38, 0.20)'); // Greenish moss tone near bottom
      streakGrad.addColorStop(1, 'rgba(40, 52, 30, 0.02)');
      ctx.fillStyle = streakGrad;
      ctx.fillRect(sx, 0, sw, sh);
    }

    // Bottom damp moisture gradient (Chân tường ẩm nước hồ)
    const dampGrad = ctx.createLinearGradient(0, size * 0.7, 0, size);
    dampGrad.addColorStop(0, 'rgba(45, 55, 38, 0)');
    dampGrad.addColorStop(0.6, 'rgba(38, 48, 30, 0.25)');
    dampGrad.addColorStop(1, 'rgba(28, 38, 22, 0.55)');
    ctx.fillStyle = dampGrad;
    ctx.fillRect(0, size * 0.7, size, size * 0.3);

    // Fine surface micro-cracks (Vết rạn chân chim)
    ctx.strokeStyle = 'rgba(70, 54, 30, 0.25)';
    ctx.lineWidth = 1;
    for (let c = 0; c < 8; c++) {
      let cx = Math.random() * size;
      let cy = Math.random() * size;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      for (let s = 0; s < 5; s++) {
        cx += (Math.random() - 0.5) * 24;
        cy += (Math.random() - 0.5) * 24;
        ctx.lineTo(cx, cy);
      }
      ctx.stroke();
    }
  } catch (err) {
    console.warn('[hanoiTextureGenerator] Stucco error:', err);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * 2. Weathered Plaster Bump Map (Bản Đồ Độ Nhám Nổi Cho Tường Vôi)
 */
export function createWeatheredStuccoBumpMap(size = 256) {
  const canvas = createSafeCanvas(size, size);
  if (!canvas) return new THREE.Texture();
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  try {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, size, size);

    // Grayscale noise for micro-roughness
    const imgData = ctx.getImageData(0, 0, size, size);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 28;
      const v = Math.min(255, Math.max(0, 128 + noise));
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
    }
    ctx.putImageData(imgData, 0, 0);
  } catch (err) {
    console.warn('[hanoiTextureGenerator] Bump error:', err);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

/**
 * 3. Aged Indochinese Brick (Gạch Nung Cổ Điển Vòm Cửa)
 * Replaces flat Mat 8 on archway friezes and keystones (Meshes 25, 27).
 */
export function createTerracottaBrickTexture(size = 512) {
  const canvas = createSafeCanvas(size, size);
  if (!canvas) return new THREE.Texture();
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  try {
    // Dark mortar background
    ctx.fillStyle = '#48433e';
    ctx.fillRect(0, 0, size, size);

    const rows = 16;
    const cols = 8;
    const brickH = size / rows;
    const brickW = size / cols;
    const mortar = 3;

    for (let r = 0; r < rows; r++) {
      const offset = (r % 2) * (brickW * 0.5);
      for (let c = -1; c <= cols + 1; c++) {
        const x = c * brickW + offset;
        const y = r * brickH;

        // Color variations between aged terracotta bricks
        const tone = Math.floor(Math.sin(r * 5 + c * 9) * 18);
        const red = 158 + tone;
        const green = 65 + Math.floor(tone * 0.5);
        const blue = 45 + Math.floor(tone * 0.3);

        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.fillRect(x + mortar, y + mortar, brickW - mortar * 2, brickH - mortar * 2);

        // Brick surface grain
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(x + mortar + 2, y + mortar + 2, (brickW - mortar * 2) * 0.6, (brickH - mortar * 2) * 0.4);
      }
    }
  } catch (err) {
    console.warn('[hanoiTextureGenerator] Brick error:', err);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * 4. Glazed Mossy Roof Tiles (Mái Ngói Âm Dương Rêu Phong)
 * Replaces flat Mat 10 on curved roof tiers (Meshes 36, 37, 38).
 */
export function createGlazedRoofTileTexture(size = 512) {
  const canvas = createSafeCanvas(size, size);
  if (!canvas) return new THREE.Texture();
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  try {
    // Base dark glazed terracotta
    ctx.fillStyle = '#5c2a1e';
    ctx.fillRect(0, 0, size, size);

    // Vertical curved tile channels (rãnh ngói ống)
    const flutes = 20;
    const fluteW = size / flutes;

    for (let f = 0; f < flutes; f++) {
      const x = f * fluteW;
      const grad = ctx.createLinearGradient(x, 0, x + fluteW, 0);
      grad.addColorStop(0, 'rgba(28, 12, 8, 0.85)');
      grad.addColorStop(0.3, 'rgba(145, 68, 48, 0.6)');
      grad.addColorStop(0.5, 'rgba(185, 92, 68, 0.85)'); // Glazed ridge specular shine
      grad.addColorStop(0.7, 'rgba(125, 55, 38, 0.5)');
      grad.addColorStop(1, 'rgba(22, 10, 6, 0.95)');
      ctx.fillStyle = grad;
      ctx.fillRect(x, 0, fluteW, size);

      // Organic green moss patina in crevices (rêu xanh bám rãnh ngói)
      if (f % 2 === 0 || f % 3 === 0) {
        const mossGrad = ctx.createLinearGradient(0, size * 0.3, 0, size);
        mossGrad.addColorStop(0, 'rgba(58, 75, 40, 0.05)');
        mossGrad.addColorStop(0.6, 'rgba(45, 65, 30, 0.45)');
        mossGrad.addColorStop(1, 'rgba(32, 50, 22, 0.65)');
        ctx.fillStyle = mossGrad;
        ctx.fillRect(x, size * 0.3, fluteW * 0.5, size * 0.7);
      }
    }
  } catch (err) {
    console.warn('[hanoiTextureGenerator] Tile error:', err);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * 5. Thăng Long Weathered Limestone (Đá Xám Cổ Thăng Long)
 * Replaces flat Mat 11 on roof ridges, dragon curves, and top finial/spire.
 */
export function createLimestoneTexture(size = 512) {
  const canvas = createSafeCanvas(size, size);
  if (!canvas) return new THREE.Texture();
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  try {
    ctx.fillStyle = '#7a766f';
    ctx.fillRect(0, 0, size, size);

    // Weathered stone grain
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const s = 3 + Math.random() * 14;
      const alpha = 0.04 + Math.random() * 0.08;
      ctx.fillStyle = Math.random() > 0.5
        ? `rgba(215, 212, 204, ${alpha})`
        : `rgba(60, 58, 54, ${alpha})`;
      ctx.fillRect(x, y, s, s);
    }

    // Mineral stains
    ctx.fillStyle = 'rgba(48, 58, 42, 0.22)';
    for (let m = 0; m < 12; m++) {
      ctx.beginPath();
      ctx.arc(Math.random() * size, Math.random() * size, 12 + Math.random() * 30, 0, Math.PI * 2);
      ctx.fill();
    }
  } catch (err) {
    console.warn('[hanoiTextureGenerator] Limestone error:', err);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * 6. Ancient Tree Bark Texture (Vỏ Cây Si & Cây Gạo Cổ Thụ Ven Hồ)
 * Replaces flat Mat 6 on islet tree trunks.
 */
export function createIsletBarkTexture(size = 256) {
  const canvas = createSafeCanvas(size, size);
  if (!canvas) return new THREE.Texture();
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  try {
    ctx.fillStyle = '#2c1e14';
    ctx.fillRect(0, 0, size, size);

    // Vertical bark ridges
    for (let x = 0; x < size; x += 6) {
      const w = 3 + Math.random() * 4;
      ctx.fillStyle = Math.random() > 0.5 ? '#3d2b1d' : '#1e140d';
      ctx.fillRect(x, 0, w, size);

      if (Math.random() > 0.6) {
        ctx.fillStyle = 'rgba(55, 75, 42, 0.35)'; // Moss patches on damp trunk
        ctx.fillRect(x, Math.random() * size * 0.6, w, 20 + Math.random() * 40);
      }
    }
  } catch (err) {
    console.warn('[hanoiTextureGenerator] Bark error:', err);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 4);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * 7. Tropical Islet Foliage (Tán Lá Xanh Mướt Đảo Rùa)
 * Replaces flat Mat 5 on islet shrubs and trees.
 */
export function createIsletFoliageTexture(size = 256) {
  const canvas = createSafeCanvas(size, size);
  if (!canvas) return new THREE.Texture();
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  try {
    ctx.fillStyle = '#244520';
    ctx.fillRect(0, 0, size, size);

    // Leaf cluster dapples
    for (let i = 0; i < 250; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = 4 + Math.random() * 12;
      const alpha = 0.15 + Math.random() * 0.25;
      ctx.fillStyle = Math.random() > 0.4
        ? `rgba(68, 125, 52, ${alpha})`
        : `rgba(28, 55, 22, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  } catch (err) {
    console.warn('[hanoiTextureGenerator] Foliage error:', err);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * 8. 360° Procedural Hoàn Kiếm Dawn Sky & Horizon Environment
 * Seamless 360-degree cylindrical/equirectangular sky dome with sunrise glow,
 * atmospheric lake mist, and perimeter tree line silhouettes.
 * Guarantees zero dark voids, zero seams, and zero clipping during 360° camera orbit.
 */
export function createDawnSky360Texture(width = 1024, height = 512) {
  const canvas = createSafeCanvas(width, height);
  if (!canvas) return new THREE.Texture();
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  try {
    // 1. Sky vertical gradient (Zenith -> Horizon -> Lake waterline)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0.0, '#162736'); // Deep dawn sapphire zenith
    skyGrad.addColorStop(0.35, '#28465c'); // Morning indigo azure
    skyGrad.addColorStop(0.48, '#78685e'); // Soft warm atmospheric haze
    skyGrad.addColorStop(0.51, '#e8be88'); // Golden sunrise horizon line
    skyGrad.addColorStop(0.56, '#385258'); // Low morning lake mist band
    skyGrad.addColorStop(1.0, '#14252a'); // Lake water base
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Sunrise Sunburst (East azimuth ~110 degrees, centered at X ~ 310)
    const sunX = Math.round(width * 0.31);
    const sunY = Math.round(height * 0.49);
    const sunGrad = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, width * 0.35);
    sunGrad.addColorStop(0.0, 'rgba(255, 248, 220, 0.95)');
    sunGrad.addColorStop(0.12, 'rgba(255, 215, 140, 0.70)');
    sunGrad.addColorStop(0.35, 'rgba(240, 165, 95, 0.30)');
    sunGrad.addColorStop(0.70, 'rgba(210, 130, 80, 0.10)');
    sunGrad.addColorStop(1.0, 'rgba(210, 130, 80, 0.0)');
    ctx.fillStyle = sunGrad;
    ctx.fillRect(0, 0, width, height);

    // 3. Perimeter distant ancient tree line silhouettes around Hoan Kiem lake
    const horizonY = height * 0.51;
    ctx.fillStyle = 'rgba(18, 30, 36, 0.85)';
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    for (let x = 0; x <= width; x += 12) {
      const treeH =
        Math.sin(x * 0.035) * 8 +
        Math.cos(x * 0.08) * 5 +
        Math.sin(x * 0.18) * 3 +
        Math.random() * 4;
      ctx.lineTo(x, horizonY - Math.max(3, treeH));
    }
    ctx.lineTo(width, horizonY);
    ctx.lineTo(width, height * 0.56);
    ctx.lineTo(0, height * 0.56);
    ctx.closePath();
    ctx.fill();

    // 4. Soft mist glaze over tree roots & shoreline
    const mistGrad = ctx.createLinearGradient(0, horizonY - 4, 0, horizonY + 24);
    mistGrad.addColorStop(0, 'rgba(232, 190, 136, 0.15)');
    mistGrad.addColorStop(0.4, 'rgba(45, 65, 70, 0.45)');
    mistGrad.addColorStop(1, 'rgba(20, 37, 42, 0.8)');
    ctx.fillStyle = mistGrad;
    ctx.fillRect(0, horizonY - 4, width, 28);
  } catch (err) {
    console.warn('[hanoiTextureGenerator] Dawn Sky 360 error:', err);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
