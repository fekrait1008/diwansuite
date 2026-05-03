import archiver from 'archiver';
import { createWriteStream, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const distDir = resolve(projectRoot, 'dist');
const outputPath = resolve(projectRoot, 'cpanel-deploy.zip');

if (!existsSync(distDir)) {
  console.error('Error: dist folder not found. Run "pnpm build" first.');
  process.exit(1);
}

const output = createWriteStream(outputPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  const sizeKB = (archive.pointer() / 1024).toFixed(2);
  console.log(`Created cpanel-deploy.zip (${sizeKB} KB)`);
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// Add all files from dist, excluding source maps
archive.glob('**/*', {
  cwd: distDir,
  ignore: ['**/*.map', 'server/**'],
});

archive.finalize();
