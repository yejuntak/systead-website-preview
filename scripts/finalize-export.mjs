import fs from 'node:fs';
import path from 'node:path';

// Preserve source page-level body styling before JS, not just after hydration.
// This is a static export step, not a server or request-time HTML injection.
const pages = JSON.parse(fs.readFileSync('content/pages.json', 'utf8'));
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
let count = 0;
for (const page of pages) {
  const file = path.join('out', page.route, 'index.html');
  if (!fs.existsSync(file)) throw new Error('Expected exported page is missing: ' + page.route);
  const attributes = Object.entries(page.bodyAttributes)
    .filter(([name]) => name === 'class' || /^data-[a-z0-9-]+$/.test(name))
    .map(([name, value]) => ` ${name}="${escape(value)}"`).join('');
  const html = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, html.replace(/<body[^>]*>/, '<body' + attributes + '>'));
  count++;
}
console.log('Preserved source body attributes on ' + count + ' exported pages.');

// Project-path hosting (for example GitHub Pages) must preserve local assets and
// native interaction destinations. No hosting account/configuration is changed.
const basePath = process.env.SITE_BASE_PATH || '';
if (basePath) {
  if (!/^\/[a-z0-9-]+$/i.test(basePath)) throw new Error('Invalid static preview base path.');
  const prefixes = '(?:assets|site-assets|products|platform|architecture|solutions|resources|company|deployment|security|integrations|partners|privacy|terms|contact|demo|search|404)';
  const pattern = new RegExp('(["\'\\(])(/' + prefixes + '(?:/|["\']))', 'g');
  function walk(directory) {
    for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (/\.(?:css|js|json)$/.test(file)) {
        const source = fs.readFileSync(file, 'utf8');
        fs.writeFileSync(file, source.replace(pattern, '$1' + basePath + '$2'));
      }
    }
  }
  walk('out/site-assets');
  console.log('Applied static asset/interaction base path ' + basePath + '.');
}

if (fs.existsSync("licenses")) fs.cpSync("licenses", "out/licenses", {recursive: true});
