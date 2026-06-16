const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\alber\\Desktop\\difetti_ai\\eventi\\14-06 aperitivo in vigna';
const destDir = path.join(__dirname, '..', 'public', 'images', 'eventi', 'aperitivo-in-vigna');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log('Created destination folder:', destDir);
}

try {
  const files = fs.readdirSync(srcDir);
  console.log(`Found ${files.length} files in source directory.`);

  files.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const stat = fs.statSync(srcPath);

    if (stat.isFile()) {
      // Clean up file names for URLs
      let destFileName = file
        .replace(/\s+/g, '_')
        .replace(/[\(\)]/g, '')
        .toLowerCase();
      
      // Let's keep specific images/videos that are useful
      const ext = path.extname(file).toLowerCase();
      const isImg = ['.png', '.jpg', '.jpeg', '.webp'].includes(ext);
      const isVid = ['.mp4', '.mov'].includes(ext);

      if (isImg || isVid) {
        const destPath = path.join(destDir, destFileName);
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${file} -> ${destFileName} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
      }
    }
  });

  console.log('Media copy complete!');
} catch (err) {
  console.error('Error during media copy:', err);
}
