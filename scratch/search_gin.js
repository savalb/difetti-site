const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    if (file === 'node_modules' || file === '.git' || file === '.next') return;
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      if (file.endsWith('.md') || file.endsWith('.txt') || file.endsWith('.json') || file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(fullPath);
      }
    }
  });
  return results;
};

const files = walk('c:\\Users\\alber\\Desktop\\difetti_ai');
files.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    if (content.toLowerCase().includes('gin')) {
      console.log('Mention of GIN found in:', file);
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (line.toLowerCase().includes('gin')) {
          console.log(`  Line ${idx + 1}: ${line.trim()}`);
        }
      });
    }
  } catch (e) {
    // Ignore read errors
  }
});
console.log('Search complete.');
