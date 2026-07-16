import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src', 'assets', 'images');
const destDir = path.join(__dirname, 'public', 'images');

console.log('--- Kolhapuri Paul Image Repair Tool ---');
console.log(`Source directory: ${srcDir}`);
console.log(`Destination directory: ${destDir}`);

if (!fs.existsSync(srcDir)) {
  console.error('Error: Source directory does not exist! Please ensure you have src/assets/images in your repository.');
  process.exit(1);
}

if (!fs.existsSync(destDir)) {
  console.log('Destination directory does not exist. Creating it...');
  fs.mkdirSync(destDir, { recursive: true });
}

try {
  const files = fs.readdirSync(srcDir);
  let count = 0;

  files.forEach((file) => {
    if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.png')) {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);
      
      console.log(`Copying pristine binary: ${file}...`);
      fs.copyFileSync(srcFile, destFile);
      count++;
    }
  });

  console.log(`\nSuccess! Successfully copied ${count} uncorrupted binary images to public/images/.`);
  console.log('Please stage, commit, and push these changes to your GitHub repository.');
  console.log('Command: git add public/images/ && git commit -m "fix: restore uncorrupted binary images" && git push');
} catch (err) {
  console.error('An error occurred while copying files:', err.message);
  process.exit(1);
}
