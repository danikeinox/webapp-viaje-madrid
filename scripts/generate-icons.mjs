/**
 * Genera iconos PNG para la PWA desde el SVG
 * Ejecutar: node scripts/generate-icons.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '..', 'public', 'icons');

mkdirSync(iconsDir, { recursive: true });

// PNG mínimo válido 1x1 rojo — fallback si no hay sharp
function createSimplePng(size) {
  // Generamos un PNG sólido con color #12263F usando sharp si está disponible
  return null;
}

async function main() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.log('sharp no instalado, creando iconos básicos...');
    await createBasicIcons();
    return;
  }

  const svgPath = join(iconsDir, 'icon.svg');
  const svg = readFileSync(svgPath);

  for (const size of [192, 512]) {
    const buffer = await sharp(svg).resize(size, size).png().toBuffer();
    writeFileSync(join(iconsDir, `icon-${size}.png`), buffer);
    console.log(`Creado icon-${size}.png`);
  }
}

async function createBasicIcons() {
  // SVG embebido como PNG via sharp alternative - crear SVG rasterizado manualmente
  const sizes = [192, 512];
  for (const size of sizes) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
      <rect width="512" height="512" rx="96" fill="#12263F"/>
      <circle cx="256" cy="180" r="80" fill="#C4A35A"/>
      <rect x="176" y="260" width="160" height="120" rx="8" fill="#C4A35A"/>
      <rect x="216" y="200" width="80" height="80" fill="#12263F"/>
      <text x="256" y="430" text-anchor="middle" font-family="Arial,sans-serif" font-size="48" font-weight="bold" fill="white">Madrid</text>
    </svg>`;
    try {
      const sharp = (await import('sharp')).default;
      const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
      writeFileSync(join(iconsDir, `icon-${size}.png`), buffer);
    } catch (e) {
      console.error('No se pudieron generar iconos:', e.message);
    }
  }
}

main();
