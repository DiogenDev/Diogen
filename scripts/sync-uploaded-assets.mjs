import fs from 'fs';
import path from 'path';

function copyFileSafe(src, dest) {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${src} -> ${dest}`);
  } else {
    console.warn(`Source not found: ${src}`);
  }
}

// 1. Diplomas
copyFileSafe('diplome1.png', 'public/credentials/diploma-1.png');
copyFileSafe('diplome2.png', 'public/credentials/diploma-2.png');

// 2. General Li
copyFileSafe('cars1 (1).jpg', 'public/projects/general-li/1.jpg');
copyFileSafe('cars1 (2).jpg', 'public/projects/general-li/2.jpg');
copyFileSafe('cars1 (3).jpg', 'public/projects/general-li/3.jpg');

// 3. Aura Coffee
if (fs.existsSync('coffee')) {
  const files = fs.readdirSync('coffee').filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  if (files[0]) copyFileSafe(path.join('coffee', files[0]), 'public/projects/aura-coffee/preview.jpg');
  if (files[1]) copyFileSafe(path.join('coffee', files[1]), 'public/projects/aura-coffee/interior.jpg');
  if (files[2]) copyFileSafe(path.join('coffee', files[2]), 'public/projects/aura-coffee/interior-2.jpg');
}

// 4. Flowers (Wild Peony / Дикий Пион)
if (fs.existsSync('flowers')) {
  const files = fs.readdirSync('flowers').filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  if (files[0]) copyFileSafe(path.join('flowers', files[0]), 'public/projects/wild-peony/bouquet.jpg');
  if (files[1]) copyFileSafe(path.join('flowers', files[1]), 'public/projects/wild-peony/catalog.jpg');
  if (files[2]) copyFileSafe(path.join('flowers', files[2]), 'public/projects/wild-peony/details.jpg');
}

// 5. MaterStroy
if (fs.existsSync('materstroy')) {
  const files = fs.readdirSync('materstroy').filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  if (files[0]) copyFileSafe(path.join('materstroy', files[0]), 'public/projects/materstroy/1.jpg');
  if (files[1]) copyFileSafe(path.join('materstroy', files[1]), 'public/projects/materstroy/3d-demo.jpg');
  if (files[2]) copyFileSafe(path.join('materstroy', files[2]), 'public/projects/materstroy/3.jpg');
  if (files[3]) copyFileSafe(path.join('materstroy', files[3]), 'public/projects/materstroy/4.jpg');
}

// 6. SoundCloud Bot
if (fs.existsSync('scbot')) {
  const files = fs.readdirSync('scbot').filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  if (files[0]) copyFileSafe(path.join('scbot', files[0]), 'public/projects/soundcloud-bot/bot-preview.jpg');
  if (files[1]) copyFileSafe(path.join('scbot', files[1]), 'public/projects/soundcloud-bot/miniapp-screen.jpg');
  if (files[2]) copyFileSafe(path.join('scbot', files[2]), 'public/projects/soundcloud-bot/screen-3.jpg');
  if (files[3]) copyFileSafe(path.join('scbot', files[3]), 'public/projects/soundcloud-bot/screen-4.jpg');
  if (files[4]) copyFileSafe(path.join('scbot', files[4]), 'public/projects/soundcloud-bot/screen-5.jpg');
}

// 7. Seconder for Windows (seconderpc)
if (fs.existsSync('seconderpc')) {
  const files = fs.readdirSync('seconderpc').filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  if (files[0]) copyFileSafe(path.join('seconderpc', files[0]), 'public/projects/seconder-pc/dashboard.jpg');
  if (files[1]) copyFileSafe(path.join('seconderpc', files[1]), 'public/projects/seconder-pc/themes.jpg');
  if (files[2]) copyFileSafe(path.join('seconderpc', files[2]), 'public/projects/seconder-pc/screen-3.jpg');
  if (files[3]) copyFileSafe(path.join('seconderpc', files[3]), 'public/projects/seconder-pc/screen-4.jpg');
}

// 8. Seconder for Android (seconderandroid)
if (fs.existsSync('seconderandroid')) {
  const files = fs.readdirSync('seconderandroid').filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  if (files[0]) copyFileSafe(path.join('seconderandroid', files[0]), 'public/projects/seconder-android/mobile-main.jpg');
  if (files[1]) copyFileSafe(path.join('seconderandroid', files[1]), 'public/projects/seconder-android/statistics.jpg');
  if (files[2]) copyFileSafe(path.join('seconderandroid', files[2]), 'public/projects/seconder-android/screen-3.jpg');
}

// 9. Parista
if (fs.existsSync('parista')) {
  const files = fs.readdirSync('parista').filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  if (files[0]) copyFileSafe(path.join('parista', files[0]), 'public/projects/parista/showcase.jpg');
}

// 10. Tooth King (toothking)
if (fs.existsSync('toothking')) {
  const files = fs.readdirSync('toothking').filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  if (files[0]) copyFileSafe(path.join('toothking', files[0]), 'public/projects/tooth-king/dental-home.jpg');
}

// 11. ZaParom & MrBread
if (fs.existsSync('zaparom')) {
  const files = fs.readdirSync('zaparom').filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  if (files[0]) copyFileSafe(path.join('zaparom', files[0]), 'public/projects/zaparom/vape-shop.jpg');
}
if (fs.existsSync('mrbread')) {
  const files = fs.readdirSync('mrbread').filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  if (files[0]) copyFileSafe(path.join('mrbread', files[0]), 'public/projects/zaparom/mrbread.jpg');
}

console.log('All uploaded assets synchronized into public/');
