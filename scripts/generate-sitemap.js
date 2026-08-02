const fs = require('fs');
const path = require('path');

const baseUrl = 'https://e.tobenot.top';
const cfgDir = path.join(__dirname, '../src/config');

// 格式化 date: {year[, month[, day]]} → YYYY-MM-DD，缺省补 1
function fmtDate(dateObj) {
  if (!dateObj) return null;
  const pad = n => String(n || 1).padStart(2, '0');
  return `${dateObj.year}-${pad(dateObj.month)}-${pad(dateObj.day)}`;
}

// 按 id 把配置切成一段段，每段内找 date（嵌套对象不越界，避免错配到下一个条目）
function segmentByIds(content, idRe) {
  const matches = [];
  let m;
  while ((m = idRe.exec(content)) !== null) {
    matches.push({ index: m.index, id: m[1] });
  }
  return matches.map((mt, i) => ({
    id: mt.id,
    text: content.slice(mt.index, i + 1 < matches.length ? matches[i + 1].index : content.length)
  }));
}

function extractDate(segmentText) {
  const m = segmentText.match(/date:\s*\{([^}]*)\}/);
  if (!m) return null;
  const kv = {};
  m[1].split(',').forEach(pair => {
    const [k, v] = pair.split(':').map(s => s.trim());
    if (v !== undefined) kv[k] = parseInt(v, 10);
  });
  return fmtDate(kv);
}

// 递归收集 src/config/projects 下所有项目文件（含 videos 子目录）
function scanProjectFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? scanProjectFiles(full) : (e.name.endsWith('.js') ? [full] : []);
  });
}

// 项目 slug → lastmod（取自每个项目文件自身的 date 字段）。
// 用 slug（与 generate-og-pages.js 一致）：数字 id 的老项目和新 slug 项目都按站点真实 URL 输出。
const projectLastmods = {};
scanProjectFiles(path.join(cfgDir, 'projects')).forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const slugMatch = content.match(/slug:\s*['"]([^'"]+)['"]/);
  const idMatch = content.match(/id:\s*(\d+)/);
  const key = slugMatch ? slugMatch[1] : (idMatch ? idMatch[1] : null);
  if (key) projectLastmods[key] = extractDate(content);
});

// 留声 id → lastmod
const soundsLastmods = {};
segmentByIds(fs.readFileSync(path.join(cfgDir, 'soundsConfig.js'), 'utf8'), /id:\s*['"]([\w-]+)['"]/g)
  .forEach(seg => { soundsLastmods[seg.id] = extractDate(seg.text); });

// 绘画/摄影条目 id → lastmod（排除画廊级 id，两类分开存）
const itemLastmods = { paintings: {}, photographs: {} };
['paintings', 'photographs'].forEach(base => {
  const file = path.join(cfgDir, `${base}Config.js`);
  segmentByIds(fs.readFileSync(file, 'utf8'), /id:\s*['"]([\w-]+)['"]/g)
    .filter(seg => seg.id !== 'paintings' && seg.id !== 'photographs')
    .forEach(seg => { itemLastmods[base][seg.id] = extractDate(seg.text); });
});

// 组装路由。lastmod 只有该 URL 有真实日期时才输出，静态页省略。
const projectIds = Object.keys(projectLastmods);
const soundIds = Object.keys(soundsLastmods);
const paintingIds = Object.keys(itemLastmods.paintings);
const photographIds = Object.keys(itemLastmods.photographs);

const routes = [
  ['/'],
  ['/about'],
  ['/gallery'],
  ['/paintings'],
  ['/photographs'],
  ['/sounds'],
  ['/celebration'],
  ...projectIds.map(id => [`/project/${id}`, projectLastmods[id]]),
  ...soundIds.map(id => [`/sound/${id}`, soundsLastmods[id]]),
  ...paintingIds.map(id => [`/painting/${id}`, itemLastmods.paintings[id]]),
  ...photographIds.map(id => [`/photograph/${id}`, itemLastmods.photographs[id]])
];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

routes.forEach(([route, lastmod]) => {
  sitemap += `  <url>
    <loc>${baseUrl}${route}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
  </url>
`;
});

sitemap += `</urlset>`;

const outputPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf8');
console.log('sitemap.xml generated successfully.');
