import * as THREE from "three";

/**
 * Texturas 100% procedurales (dibujadas por código en un <canvas>), sin
 * ninguna imagen externa: un patrón de ladrillo para la pared y de
 * madera para el piso, para ambientar la escena como un interior de
 * barbería sin depender de fotografías de terceros.
 */

function makeCanvas(size: number): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  return { canvas, ctx };
}

function toTexture(canvas: HTMLCanvasElement, repeatX: number, repeatY: number): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export function createBrickWallTexture(): THREE.CanvasTexture {
  const size = 512;
  const { canvas, ctx } = makeCanvas(size);

  // Mortero de fondo
  ctx.fillStyle = "#9c8f80";
  ctx.fillRect(0, 0, size, size);

  const brickW = 64;
  const brickH = 28;
  const mortar = 5;
  const rows = Math.ceil(size / brickH) + 1;

  for (let row = 0; row < rows; row++) {
    const y = row * brickH;
    const offset = row % 2 === 0 ? 0 : -brickW / 2;
    for (let x = offset; x < size + brickW; x += brickW) {
      const shade = 0.85 + Math.random() * 0.3;
      const r = Math.round(120 * shade + 20);
      const g = Math.round(58 * shade + 10);
      const b = Math.round(44 * shade + 8);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x + mortar / 2, y + mortar / 2, brickW - mortar, brickH - mortar);
    }
  }

  // Grano sutil
  const grain = ctx.getImageData(0, 0, size, size);
  for (let i = 0; i < grain.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 14;
    grain.data[i] += n;
    grain.data[i + 1] += n;
    grain.data[i + 2] += n;
  }
  ctx.putImageData(grain, 0, 0);

  return toTexture(canvas, 3, 2);
}

export function createWoodFloorTexture(): THREE.CanvasTexture {
  const size = 512;
  const { canvas, ctx } = makeCanvas(size);

  ctx.fillStyle = "#4a2f1e";
  ctx.fillRect(0, 0, size, size);

  const plankH = 48;
  const rows = Math.ceil(size / plankH) + 1;

  for (let row = 0; row < rows; row++) {
    const y = row * plankH;
    const shade = 0.85 + Math.random() * 0.3;
    const r = Math.round(96 * shade);
    const g = Math.round(60 * shade);
    const b = Math.round(38 * shade);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, y, size, plankH - 3);

    // vetas de madera: líneas horizontales suaves y onduladas
    ctx.strokeStyle = `rgba(30,18,10,0.35)`;
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      const ly = y + 6 + i * 12 + Math.random() * 4;
      ctx.beginPath();
      ctx.moveTo(0, ly);
      for (let x = 0; x <= size; x += 32) {
        ctx.lineTo(x, ly + Math.sin(x * 0.05 + row) * 2);
      }
      ctx.stroke();
    }

    // juntas entre tablas (verticales, alternadas)
    ctx.strokeStyle = "rgba(20,12,6,0.6)";
    ctx.lineWidth = 2;
    const xOffset = row % 2 === 0 ? 0 : size / 2;
    for (let x = xOffset; x < size + 128; x += 128) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + plankH);
      ctx.stroke();
    }
  }

  return toTexture(canvas, 4, 4);
}

export function createWoodPanelTexture(): THREE.CanvasTexture {
  const size = 512;
  const { canvas, ctx } = makeCanvas(size);

  ctx.fillStyle = "#3a2416";
  ctx.fillRect(0, 0, size, size);

  const panelW = 128;
  const cols = Math.ceil(size / panelW) + 1;

  for (let col = 0; col < cols; col++) {
    const x = col * panelW;
    const shade = 0.85 + Math.random() * 0.25;
    const r = Math.round(74 * shade);
    const g = Math.round(46 * shade);
    const b = Math.round(28 * shade);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(x + 4, 0, panelW - 8, size);

    // vetas verticales suaves
    ctx.strokeStyle = "rgba(20,12,6,0.3)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      const lx = x + 14 + i * 26 + Math.random() * 6;
      ctx.beginPath();
      ctx.moveTo(lx, 0);
      for (let y = 0; y <= size; y += 32) {
        ctx.lineTo(lx + Math.sin(y * 0.05 + col) * 2, y);
      }
      ctx.stroke();
    }

    // marco moldurado del panel
    ctx.strokeStyle = "rgba(10,6,3,0.7)";
    ctx.lineWidth = 3;
    ctx.strokeRect(x + 14, 24, panelW - 28, size - 48);
  }

  return toTexture(canvas, 3, 1);
}

export function createBarberPoleTexture(): THREE.CanvasTexture {
  const width = 64;
  const height = 256;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#f2efe6";
  ctx.fillRect(0, 0, width, height);

  const stripe = 26;
  ctx.save();
  ctx.translate(0, 0);
  for (let y = -height; y < height * 2; y += stripe * 2) {
    ctx.fillStyle = "#c23b3b";
    ctx.beginPath();
    ctx.moveTo(-width, y);
    ctx.lineTo(width * 2, y - width * 3);
    ctx.lineTo(width * 2, y - width * 3 + stripe);
    ctx.lineTo(-width, y + stripe);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#2b3a8f";
    ctx.beginPath();
    ctx.moveTo(-width, y + stripe);
    ctx.lineTo(width * 2, y - width * 3 + stripe);
    ctx.lineTo(width * 2, y - width * 3 + stripe * 2);
    ctx.lineTo(-width, y + stripe * 2);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
