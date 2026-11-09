// Builds dist/index.html from src/ (shell + pages + journey.yaml + styles + logic).
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const root = path.dirname(new URL(import.meta.url).pathname);
const src = (...p) => path.join(root, 'src', ...p);
const read = (...p) => fs.readFileSync(src(...p), 'utf8');
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (t) => esc(t).replace(/"/g, '&quot;');

// ---------- Journey: data jobs from src/journey.yaml ----------
const GROUPS = ['Languages & Core', 'Frameworks & Libraries', 'Tools & Infrastructure', 'AI & LLM'];

function cardHtml(j) {
  const c = j.card;
  const sub = `${esc(c.role)}${c.one_line ? '&nbsp; ' : ' <br>'}${esc(c.company)}, <i>${esc(c.city)}</i>`;
  const badges = (c.badges || []).map((b) => `<span class="jbadge">${esc(b)}</span>`).join('');
  return `<div class="gcard gsel" data-jk="${j.key}" data-on="{{g.jon_${j.key}}}"><button type="button" class="hcb" onClick="{{jp_${j.key}}}" aria-label="Show ${attr(j.name)} details"></button>` +
    `<p class="gdt">${esc(j.dates)}</p>` +
    `<p class="gtt"><a class="glk" href="${attr(j.url)}" target="_blank" rel="noopener noreferrer" aria-label="${attr(j.name)}, opens in a new tab">${esc(j.name)}<span class="gx" aria-hidden="true"> ↗</span></a></p>` +
    `<p class="gsb">${sub}</p><div class="jbadges jbd">${badges}</div></div>`;
}

function stackHtml(stack) {
  let h = '';
  const groups = GROUPS.filter((g) => (stack[g] || []).length);
  const tools = groups.flatMap((g) => stack[g].map((t) => [t, g]));
  const hh = Math.round(6.95 * Math.max(...tools.map(([t]) => t.length)));
  h += `<div class="jtb" style="--n:${tools.length};--hh:${hh}px" role="img" aria-label="Stack: tools by group"><span></span>`;
  h += tools.map(([t]) => `<span class="jth">${esc(t)}</span>`).join('');
  for (const g of groups) {
    h += `<span class="jtl">${esc(g)}</span>`;
    for (const [t, tg] of tools) h += `<span class="jc${tg === g ? ' on' : ''}" title="${attr(t + (tg === g ? ': ' + g : ''))}"></span>`;
  }
  return h + '</div>';
}

function detailHtml(j) {
  const d = j.details;
  let h = `<div class="jp" style="--c:var(--k1)" data-on="{{g.jon_${j.key}}}"><p class="gdt">${esc(j.dates)}</p>` +
    `<h3 class="jpt"><a class="glk" href="${attr(j.url)}" target="_blank" rel="noopener noreferrer" aria-label="${attr(j.name)}, opens in a new tab">${esc(j.name)}<span class="gx" aria-hidden="true"> ↗</span></a></h3><div class="jfacts">`;
  for (const [l, v] of [['Company', d.company], ['Role', d.role], ['Location', d.location], ['Work mode', d.work_mode]]) {
    h += `<div class="jf"><span class="jfl">${l}</span><span>${esc(v)}</span></div>`;
  }
  h += '</div><p class="jh">Projects</p><div class="tiles t3">';
  for (const p of d.projects) {
    h += `<div class="tile"><div class="top"><svg class="ti" aria-hidden="true"><use href="#i-${p.icon}"></use></svg><h4>${esc(p.title)}</h4></div><p>${esc(p.text)}</p><div class="pills"><span class="pill pu">${esc(p.tag)}</span></div></div>`;
  }
  h += '</div><p class="jh">Stack</p>';
  h += stackHtml(d.stack);
  return h + '</div>';
}

const data = parse(read('journey.yaml'));
const jobs = data.jobs;
let journey = read('pages', 'journey.html');
for (const j of jobs) {
  journey = journey.replace(`<!--@card:${j.key}-->`, cardHtml(j)).replace(`<!--@detail:${j.key}-->`, detailHtml(j));
}
const paws = read('pages', 'paws.html').replace('<!--@stack:paws-->', stackHtml(data.pawspal.stack));
if (journey.includes('<!--@')) throw new Error('Unreplaced placeholder in journey.html');

// ---------- Assemble ----------
const order = ['home', 'journey', 'paws', 'anna', 'sag', 'titanic'];
const pages = order.map((n) => (n === 'journey' ? journey : n === 'paws' ? paws : read('pages', n + '.html'))).join('\n');
const shell = read('shell.html').replace('<!--@pages-->', pages);
const css = read('styles.css') + '\nsc-if{display:contents}sc-if[hidden]{display:none!important}x-dc{display:block;visibility:hidden}';
const desc = 'Vero Agnolutto, AI/ML engineer in Barcelona. From buildings to algorithms: ML and AI systems that turn complex data into practical solutions.';
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vero Agnolutto, Portfolio</title>
<meta name="description" content="${desc}">
<meta property="og:title" content="Vero Agnolutto, Portfolio">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<link rel="icon" href="favicon.ico?v=3">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<x-dc>
${shell}
</x-dc>
<noscript><p style="font:16px/1.5 system-ui;padding:24px">Vero Agnolutto, AI/ML engineer in Barcelona. This portfolio needs JavaScript. <a href="https://www.linkedin.com/in/veroagnolutto/">LinkedIn</a> · <a href="https://github.com/cucu-o0">GitHub</a></p></noscript>
<script>${read('dc-lite.js')}</script>
<script>${read('component.js')}
dcBoot(Component, { theme: 'light' });</script>
</body>
</html>
`;

const out = path.join(root, 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'index.html'), html);
fs.cpSync(path.join(root, 'public'), out, { recursive: true });
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log('dist/index.html', (html.length / 1024).toFixed(0) + ' KB');
