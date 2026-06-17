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

const baseUrl = 'https://e.tobenot.top';
const routes = [
  '/',
  '/about',
  '/gallery',
  '/paintings',
  '/photographs',
  '/sounds',
  ...projectIds.map(id => `/project/${id}`),
  ...soundIds.map(id => `/sound/${id}`)
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
