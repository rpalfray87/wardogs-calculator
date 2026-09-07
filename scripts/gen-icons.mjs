// Genere les PNG de l'app sans dependance externe : encodeur PNG minimal + zlib.
// Motif : reticule de tir jaune sur fond sombre, lisible jusqu'a 16 px.
import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const BG = [0x0e, 0x0f, 0x11];
const ACCENT = [0xf5, 0xc5, 0x18];

// ---------- encodeur PNG ----------

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buffer) {
  let c = 0xffffffff;
  for (const byte of buffer) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([length, body, crc]);
}

function encodePng(size, rgba) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // profondeur
  ihdr[9] = 6; // RGBA
  // 10..12 : compression, filtre, entrelacement = 0

  // Une ligne = 1 octet de filtre (0 = aucun) + les pixels.
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y += 1) {
    const rowStart = y * (size * 4 + 1);
    raw[rowStart] = 0;
    rgba.copy(raw, rowStart + 1, y * size * 4, (y + 1) * size * 4);
  }

  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ---------- dessin ----------

function roundedSquareCoverage(u, v, radius) {
  // Distance signee a un carre plein aux coins arrondis, dans [0,1].
  const dx = Math.max(Math.abs(u - 0.5) - (0.5 - radius), 0);
  const dy = Math.max(Math.abs(v - 0.5) - (0.5 - radius), 0);
  return Math.hypot(dx, dy) <= radius ? 1 : 0;
}

function reticle(u, v, scale) {
  // Ramene le point dans le repere du motif, puis teste les formes.
  const x = (u - 0.5) / scale;
  const y = (v - 0.5) / scale;
  const d = Math.hypot(x, y);

  if (Math.abs(d - 0.3) <= 0.036) return true; // anneau
  if (d <= 0.058) return true; // point central

  const arm = 0.024;
  const inner = 0.13;
  const outer = 0.44;
  if (Math.abs(x) <= arm && Math.abs(y) >= inner && Math.abs(y) <= outer) return true;
  if (Math.abs(y) <= arm && Math.abs(x) >= inner && Math.abs(x) <= outer) return true;

  return false;
}

function render(size, { maskable }) {
  const rgba = Buffer.alloc(size * size * 4);
  const samples = 4; // supersampling : lisse les bords sans lib graphique
  const artScale = maskable ? 0.62 : 1;

  for (let py = 0; py < size; py += 1) {
    for (let px = 0; px < size; px += 1) {
      let bgHits = 0;
      let artHits = 0;

      for (let sy = 0; sy < samples; sy += 1) {
        for (let sx = 0; sx < samples; sx += 1) {
          const u = (px + (sx + 0.5) / samples) / size;
          const v = (py + (sy + 0.5) / samples) / size;
          const inBg = maskable ? 1 : roundedSquareCoverage(u, v, 0.22);
          bgHits += inBg;
          if (inBg && reticle(u, v, artScale)) artHits += 1;
        }
      }

      const total = samples * samples;
      const alpha = bgHits / total;
      const art = artHits / total;
      const offset = (py * size + px) * 4;

      for (let c = 0; c < 3; c += 1) {
        rgba[offset + c] = Math.round(BG[c] * (1 - art) + ACCENT[c] * art);
      }
      rgba[offset + 3] = Math.round(alpha * 255);
    }
  }

  return encodePng(size, rgba);
}

function write(path, buffer) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, buffer);
  console.log(`${path} (${(buffer.length / 1024).toFixed(1)} ko)`);
}

write('public/icon-192.png', render(192, { maskable: false }));
write('public/icon-512.png', render(512, { maskable: false }));
write('public/icon-maskable-512.png', render(512, { maskable: true }));
write('build/icon.png', render(512, { maskable: false }));
