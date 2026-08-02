const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const ogDistDir = path.join(rootDir, 'dist/img/og');

const bilibiliCoversPath = path.join(__dirname, '../src/data/bilibili-covers.json');
let bilibiliCovers = {};
if (fs.existsSync(bilibiliCoversPath)) {
  try {
    bilibiliCovers = JSON.parse(fs.readFileSync(bilibiliCoversPath, 'utf8'));
  } catch {}
}

// 1. 读取 dist/index.html 作为模板
const templatePath = path.join(rootDir, 'dist/index.html');
if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found. Please run build first.');
  process.exit(1);
}
const templateHtml = fs.readFileSync(templatePath, 'utf8');

// 2. 准备默认的分享图与文案
const defaultOgImage = 'https://e.tobenot.top/img/og/vrc_aftergrass.webp';
const defaultDescription = '希望每个人都可以找到自己的理想并为之劳动。萝北来信的作品集、游戏、小说与画作。';
const baseUrl = 'https://e.tobenot.top';

// 3. 读取所有项目配置
const projectsDir = path.join(rootDir, 'src/config/projects');
const videoProjectsDir = path.join(rootDir, 'src/config/projects/videos');

function getProjectFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.js'))
    .map(file => path.join(dir, file));
}

function resolveAssetImagePath(requirePath) {
  const relative = requirePath.replace(/^@\/assets\//, 'src/assets/');
  return path.join(rootDir, relative);
}

function copyOgImage(requirePath) {
  const src = resolveAssetImagePath(requirePath);
  const imgName = path.basename(requirePath);
  if (!fs.existsSync(src)) {
    console.warn(`OG image source not found: ${src}`);
    return false;
  }
  if (!fs.existsSync(ogDistDir)) {
    fs.mkdirSync(ogDistDir, { recursive: true });
  }
  fs.copyFileSync(src, path.join(ogDistDir, imgName));
  return true;
}

function extractLocalizedKey(content, keyName, locale = 'zh') {
  const blockRegex = new RegExp(`${keyName}:\\s*\\{[\\s\\S]*?${locale}:\\s*['"]([^'"]+)['"]`);
  const match = content.match(blockRegex);
  return match ? match[1] : null;
}

function pickTitle(metaZh, titleZh) {
  if (metaZh) return metaZh;
  if (titleZh) return `${titleZh} | Epitaph`;
  return 'Epitaph';
}

// 按 id 把配置切成一段段，每段是单个条目的文本（嵌套对象不越界）
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

function toOgImageUrl(requirePath) {
  const imgName = path.basename(requirePath);
  if (copyOgImage(requirePath)) {
    return `${baseUrl}/img/og/${imgName}`;
  }
  return defaultOgImage;
}

// 4. 通用写入器：克隆 dist/index.html 并替换 meta 标签
function writeStaticPage(route, { title, description, ogImage }) {
  let html = templateHtml
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${title}">`)
    .replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${description}">`)
    .replace(/<meta property="og:description" content=".*?">/, `<meta property="og:description" content="${description}">`);

  // 替换/插入 og:image（基础模板自带默认图，有专属图则替换）
  if (html.includes('property="og:image"')) {
    html = html.replace(/<meta property="og:image" content=".*?">/, `<meta property="og:image" content="${ogImage}">`);
  } else {
    html = html.replace(
      /<meta property="og:type" content="website">/,
      `<meta property="og:type" content="website">\n    <meta property="og:image" content="${ogImage}">`
    );
  }

  const targetDir = path.join(rootDir, 'dist', route);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
  console.log(`Generated static page: /${route}/`);
}

// === 项目页 ===
const allProjectFiles = [
  ...getProjectFiles(projectsDir),
  ...getProjectFiles(videoProjectsDir)
];

console.log(`Found ${allProjectFiles.length} projects. Generating static HTML for OG tags...`);

allProjectFiles.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    const slugMatch = content.match(/slug:\s*['"]([^'"]+)['"]/);
    const idMatch = content.match(/id:\s*['"]?([^'",\s]+)['"]?/);
    const slug = slugMatch ? slugMatch[1] : (idMatch ? idMatch[1] : null);
    if (!slug) return; // 跳过没有标识符的项目

    const title = pickTitle(
      extractLocalizedKey(content, 'metaTitleKey'),
      extractLocalizedKey(content, 'titleKey')
    );
    const description =
      extractLocalizedKey(content, 'metaDescriptionKey') ||
      extractLocalizedKey(content, 'descriptionKey') ||
      defaultDescription;

    let ogImage = defaultOgImage;
    const imageMatch = content.match(/image:\s*(?:require\(['"]([^'"]+)['"]\)|['"]([^'"]+)['"])/);
    if (imageMatch) {
      ogImage = imageMatch[1]
        ? toOgImageUrl(imageMatch[1])
        : imageMatch[2]; // 外部图片链接
    } else {
      const bvMatch = content.match(/bilibiliVideoId:\s*['"]([^'"]+)['"]/);
      if (bvMatch && bilibiliCovers[bvMatch[1]]) {
        ogImage = bilibiliCovers[bvMatch[1]];
      }
    }

    writeStaticPage(`project/${slug}`, { title, description, ogImage });
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
  }
});

// === 留声详情页 ===
const soundsContent = fs.readFileSync(path.join(rootDir, 'src/config/soundsConfig.js'), 'utf8');
segmentByIds(soundsContent, /id:\s*['"]([\w-]+)['"]/g).forEach(seg => {
  const titleZh = extractLocalizedKey(seg.text, 'titleKey');
  const descZh = extractLocalizedKey(seg.text, 'descriptionKey');
  if (!titleZh) return;
  writeStaticPage(`sound/${seg.id}`, {
    title: pickTitle(null, titleZh),
    description: descZh || defaultDescription,
    ogImage: defaultOgImage
  });
});

// === 绘画 / 摄影详情页 ===
[['paintings', 'painting'], ['photographs', 'photograph']].forEach(([configBase, routePrefix]) => {
  const file = path.join(rootDir, `src/config/${configBase}Config.js`);
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  segmentByIds(content, /id:\s*['"]([\w-]+)['"]/g)
    .filter(seg => seg.id !== 'paintings' && seg.id !== 'photographs') // 排除画廊级 id
    .forEach(seg => {
      const titleZh = extractLocalizedKey(seg.text, 'titleKey');
      if (!titleZh) return;
      const descZh = extractLocalizedKey(seg.text, 'descriptionKey');
      const imgMatch = seg.text.match(/image:\s*require\(['"]([^'"]+)['"]\)/);
      writeStaticPage(`${routePrefix}/${seg.id}`, {
        title: pickTitle(null, titleZh),
        description: descZh || defaultDescription,
        ogImage: imgMatch ? toOgImageUrl(imgMatch[1]) : defaultOgImage
      });
    });
});

console.log('OG pages generation completed.');
