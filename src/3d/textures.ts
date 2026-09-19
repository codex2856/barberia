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
