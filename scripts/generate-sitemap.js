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

const baseUrl = 'https://tobenot.top/Epitaph';
const routes = [
  '/', 
  '/about', 
  '/experience', 
  '/gallery', 
  '/paintings', 
  '/photographs', 
  '/sounds',
  ...projectIds.map(id => `/project/${id}`)
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
