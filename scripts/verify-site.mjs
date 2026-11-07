import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';

const routes = ['', 'services', 'services/wedding-dj', 'services/party-dj', 'services/corporate-entertainment', 'services/music-bingo', 'services/speed-quizzing', 'services/led-wristbands', 'services/karaoke', 'about', 'contact', 'service-areas', 'privacy', 'booking-information'];
const titles = new Set();
const root = resolve('dist');
for (const route of routes) {
  const file = resolve(root, route, 'index.html');
  const html = await readFile(file, 'utf8');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: one H1`);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert(title && !titles.has(title), `${route}: unique title`); titles.add(title);
  assert.match(html, /<meta[^>]+name="description"[^>]+content="[^"]+/);
  assert(html.includes(`https://theledjs.ie/${route}`), `${route}: canonical`);
  if(process.argv.includes('--production')) assert(!/name="robots" content="noindex/.test(html), `${route}: indexable production`);
  else assert(/name="robots" content="noindex/.test(html), `${route}: noindex preview`);
  assert(!/smile|music-bingo\.jpg|One More Tune|The Big Singalong|emailjs|gigbook/i.test(html), `${route}: no legacy/demo code`);
  for (const json of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) JSON.parse(json[1]);
  for (const [, ref] of html.matchAll(/(?:href|src)="([^"?#]+)(?:[?#][^"]*)?"/g)) {
    if (/^(?:https?:|mailto:|tel:|data:)/.test(ref)) continue;
    let target = ref.startsWith('/') ? resolve(root, '.' + ref) : resolve(dirname(file), ref);
    if (!/\.[a-z\d]+$/i.test(target)) target = resolve(target, 'index.html');
    await access(target);
  }
}
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
for (const route of routes) assert(sitemap.includes(`https://theledjs.ie/${route}`), `sitemap ${route}`);
assert(!/questionnaire|thank-you|events|ticket|areas\//.test(sitemap));
const questionnaire = await readFile('dist/wedding-questionnaire/index.html', 'utf8');
assert.match(questionnaire, /noindex/);
assert.match(await readFile('dist/thank-you/index.html', 'utf8'), /noindex/);
await access('dist/404.html');
const coverage = await readFile('dist/service-areas/index.html', 'utf8');
for (const county of ['Cavan','Leitrim','Westmeath','Longford','Meath','Mayo','Galway','Dublin','Offaly']) assert(coverage.includes(county));
assert(!(await readdir('dist')).includes('events'));
assert(!(await readFile('netlify.toml','utf8')).includes('to = "/index.html"'));
console.log(`PASS: ${routes.length} public pages, HTML metadata, links/assets, county coverage, sitemap, utility noindex and hidden ticketing`);
