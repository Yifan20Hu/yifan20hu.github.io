import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('docs');
const pages = fs.readdirSync(root).filter(f => f.endsWith('.html'));
let errors = [];
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  if (page === 'service.html') {
    if (!html.includes('about.html#awards-services')) errors.push('Old service URL must point to About');
    continue;
  }
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = match[1].replaceAll('&amp;', '&');
    if (/^(?:https?:|mailto:|data:)/.test(raw)) continue;
    const [relative, fragment] = raw.split('#');
    const filename = relative.split('?')[0];
    const target = filename ? path.resolve(root, filename) : path.join(root, page);
    if (!fs.existsSync(target)) errors.push(`${page}: missing ${raw}`);
    if (fragment && filename.endsWith('.html') && fs.existsSync(target)) {
      const targetHtml = fs.readFileSync(target, 'utf8');
      if (!targetHtml.includes(`id="${fragment}"`)) errors.push(`${page}: missing anchor ${raw}`);
    }
  }
  if (html.includes('mailto:') || html.includes('yifan.hu@rutgers.edu')) errors.push(`${page}: raw contact address`);
  if (html.includes('sites.google.com/view/yifan-hu/teaching')) errors.push(`${page}: old Google course link`);
  if (!html.includes('>About</a>') || !html.includes('Working With Us')) errors.push(`${page}: navigation incomplete`);
  if (html.includes('>Home</a>')) errors.push(`${page}: redundant Home navigation`);
}
const people = fs.readFileSync(path.join(root, 'people.html'), 'utf8');
if ((people.match(/class="person-photo"/g) || []).length !== 9) errors.push('Expected 9 current and collaborative portraits');
const research = fs.readFileSync(path.join(root, 'research.html'), 'utf8');
if ((research.match(/class="research-pub-title"/g) || []).length !== 26) errors.push('Expected 26 entries across the research areas');
if (research.includes('Missing publication')) errors.push('Unmatched publication key');
console.log(`Checked ${pages.length} pages, 9 portraits, and 26 research-area entries.`);
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
