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
      if (file.endsWith('.env') || file.endsWith('.local') || file.endsWith('.json') || file.endsWith('.js') || file.endsWith('.cjs')) {
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
    if (content.includes('postgresql://') || content.includes('postgres://') || content.includes('SUPABASE_SERVICE_KEY') || content.includes('SERVICE_ROLE')) {
      console.log('Found secret in:', file);
      // Print only key names, not actual secret values for safety
      const lines = content.split('\n');
      lines.forEach(line => {
        if (line.includes('KEY') || line.includes('role') || line.includes('postgres') || line.includes('url') || line.includes('URL') || line.includes('db')) {
          console.log('  Line:', line.split('=')[0]);
        }
      });
    }
  } catch (e) {
    // Ignore read errors
  }
});
console.log('Search complete.');
