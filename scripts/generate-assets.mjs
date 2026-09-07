import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Helper to write a basic uncompressed/deflated valid PNG file
function createPng(width, height, r, g, b, a = 255) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // bit depth 8
  ihdrData.writeUInt8(6, 9); // color type RGBA (6)
  ihdrData.writeUInt8(0, 10); // compression
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // interlace

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crc = crc32(Buffer.concat([typeBuf, data]));
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  // Raw image data with 0 filter byte per scanline
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);
  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // None filter
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      // create subtle emerald dark gradient
      const factor = (x / width) * 0.3 + (y / height) * 0.3;
      rawData[pixelOffset] = Math.min(255, Math.floor(r * (1 - factor * 0.5)));
      rawData[pixelOffset + 1] = Math.min(255, Math.floor(g + (255 - g) * factor * 0.2));
      rawData[pixelOffset + 2] = Math.min(255, Math.floor(b * (1 - factor * 0.5)));
      rawData[pixelOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);

  const ihdrChunk = makeChunk('IHDR', ihdrData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
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

const publicDir = path.resolve('public');

// 1. icon.png (32x32 emerald)
fs.writeFileSync(path.join(publicDir, 'icon.png'), createPng(32, 32, 16, 185, 129));
// 2. apple-icon.png (180x180 emerald)
fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), createPng(180, 180, 16, 185, 129));
// 3. favicon.ico
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), createPng(32, 32, 16, 185, 129));
// 4. og-preview.png (1200x630 dark obsidian with emerald)
fs.writeFileSync(path.join(publicDir, 'og-preview.png'), createPng(1200, 630, 6, 15, 13));

console.log('Public branding assets generated successfully.');
