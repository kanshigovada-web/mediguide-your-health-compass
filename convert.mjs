import { transformSync } from 'esbuild';
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { execSync } from 'child_process';

const files = execSync('find src -name "*.ts" -o -name "*.tsx"', { encoding: 'utf8' })
  .trim().split('\n').filter(Boolean);

for (const file of files) {
  // Skip declaration files
  if (file.endsWith('.d.ts')) {
    unlinkSync(file);
    console.log(`Deleted: ${file}`);
    continue;
  }

  const code = readFileSync(file, 'utf8');
  const isTsx = file.endsWith('.tsx');
  const loader = isTsx ? 'tsx' : 'ts';
  const newExt = isTsx ? '.jsx' : '.js';
  const newFile = file.replace(/\.tsx?$/, newExt);

  try {
    const result = transformSync(code, {
      loader,
      jsx: 'preserve',
      target: 'esnext',
    });

    // Fix imports: remove .tsx/.ts extensions from import paths
    let output = result.code;
    // Remove .tsx and .ts from relative imports
    output = output.replace(/(from\s+["'])(\.\.?\/[^"']*?)\.tsx(["'])/g, '$1$2$3');
    output = output.replace(/(from\s+["'])(\.\.?\/[^"']*?)\.ts(["'])/g, '$1$2$3');

    writeFileSync(newFile, output);
    if (newFile !== file) unlinkSync(file);
    console.log(`Converted: ${file} → ${newFile}`);
  } catch (e) {
    console.error(`Failed: ${file}`, e.message);
  }
}
