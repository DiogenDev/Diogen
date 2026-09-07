import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function makePng(width, height, getPixel) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8-bit
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);

  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[n] = c;
  }
  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const t = Buffer.from(type, 'ascii');
    const c = Buffer.alloc(4);
    c.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
    return Buffer.concat([len, t, data, c]);
  }

  const rowSize = 1 + width * 4;
  const raw = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const offset = y * rowSize;
    raw[offset] = 0; // filter 0
    for (let x = 0; x < width; x++) {
      const p = offset + 1 + x * 4;
      const [r, g, b, a] = getPixel(x, y, width, height);
      raw[p] = r;
      raw[p + 1] = g;
      raw[p + 2] = b;
      raw[p + 3] = a;
    }
  }

  const deflated = zlib.deflateSync(raw);
  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflated),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

// Simple deterministic hash for noise
function hash(x, y) {
  let h = (x * 374761393 + y * 668265263) ^ 0x5bf03635;
  h = (h ^ (h >> 13)) * 1274126177;
  return (h ^ (h >> 16)) & 0xff;
}

// Smooth value noise
function smoothNoise(x, y, size) {
  const x0 = Math.floor(x) % size;
  const y0 = Math.floor(y) % size;
  const x1 = (x0 + 1) % size;
  const y1 = (y0 + 1) % size;

  const fx = x - Math.floor(x);
  const fy = y - Math.floor(y);

  // Smoothstep
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);

  const n00 = hash(x0, y0);
  const n10 = hash(x1, y0);
  const n01 = hash(x0, y1);
  const n11 = hash(x1, y1);

  const nx0 = n00 * (1 - sx) + n10 * sx;
  const nx1 = n01 * (1 - sx) + n11 * sx;
  return nx0 * (1 - sy) + nx1 * sy;
}

// Multi-octave fractal noise for organic stone
function fractalNoise(x, y, size) {
  let v = 0;
  let amp = 1;
  let freq = 1;
  let max = 0;
  for (let i = 0; i < 4; i++) {
    v += smoothNoise(x * freq, y * freq, size * freq) * amp;
    max += 255 * amp;
    amp *= 0.5;
    freq *= 2;
  }
  return v / max;
}

const size = 512;
const granitePng = makePng(size, size, (x, y) => {
  // Base dark charcoal stone
  const n1 = fractalNoise(x / 4, y / 4, size);
  const n2 = fractalNoise(x / 16, y / 16, size);
  const speck = hash((x * 7) % size, (y * 11) % size);

  // Base stone tone: very dark obsidian charcoal (values around 8 to 16)
  let val = 8 + Math.floor(n1 * 10) + Math.floor(n2 * 6);

  // Mineral specks (quartz and mica crystals)
  if (speck > 248) {
    val += 18; // brighter quartz sparkle
  } else if (speck > 230) {
    val += 8; // subtle crystal grain
  } else if (speck < 12) {
    val = Math.max(3, val - 5); // dark mica pit
  }

  // Slight cool mineral tint
  const r = Math.min(255, val);
  const g = Math.min(255, val + 2);
  const b = Math.min(255, val + 3);
  return [r, g, b, 255];
});

fs.mkdirSync('public/textures', { recursive: true });
fs.writeFileSync('public/textures/granite.png', granitePng);
console.log('Granite stone texture generated: public/textures/granite.png');
