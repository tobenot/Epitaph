const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../src/config/projectsConfig.js');
const configContent = fs.readFileSync(configPath, 'utf8');

const idRegex = /id:\s*(\d+)/g;
const projectIds = [];
let match;
while ((match = idRegex.exec(configContent)) !== null) {
  projectIds.push(match[1]);
}

// 扫描留声配置里的音频 id（字符串），生成 /sound/<id> 详情页路由
const soundsConfigPath = path.join(__dirname, '../src/config/soundsConfig.js');
const soundsContent = fs.readFileSync(soundsConfigPath, 'utf8');
const soundIdRegex = /id:\s*['"]([^'"]+)['"]/g;
const soundIds = [];
while ((match = soundIdRegex.exec(soundsContent)) !== null) {
  soundIds.push(match[1]);
}

// 扫描绘画/摄影配置里的作品 id，分别生成详情页路由。
// 两个文件顶层各有一个画廊级 id（'paintings'/'photographs'），需排除。
function collectGalleryItemIds(file) {
  const content = fs.readFileSync(file, 'utf8');
  const ids = [];
  const re = /id:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    if (m[1] !== 'paintings' && m[1] !== 'photographs') ids.push(m[1]);
  }
  return ids;
}
const paintingIds = collectGalleryItemIds(path.join(__dirname, '../src/config/paintingsConfig.js'));
const photographIds = collectGalleryItemIds(path.join(__dirname, '../src/config/photographsConfig.js'));

const baseUrl = 'https://e.tobenot.top';
const routes = [
  '/',
  '/about',
  '/gallery',
  '/paintings',
  '/photographs',
  '/sounds',
  ...projectIds.map(id => `/project/${id}`),
  ...soundIds.map(id => `/sound/${id}`),
  ...paintingIds.map(id => `/painting/${id}`),
  ...photographIds.map(id => `/photograph/${id}`)
];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

const today = new Date().toISOString().split('T')[0];

routes.forEach(route => {
  sitemap += `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>
`;
});

sitemap += `</urlset>`;

const outputPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf8');
console.log('sitemap.xml generated successfully.');
