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
const templatePath = path.join(__dirname, '../dist/index.html');
if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found. Please run build first.');
  process.exit(1);
}
const templateHtml = fs.readFileSync(templatePath, 'utf8');

// 2. 准备默认的分享图
const defaultOgImage = 'https://e.tobenot.top/img/og/vrc_aftergrass.webp'; 
const baseUrl = 'https://e.tobenot.top';

// 3. 读取所有项目配置
const projectsDir = path.join(__dirname, '../src/config/projects');
const videoProjectsDir = path.join(__dirname, '../src/config/projects/videos');

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

const allProjectFiles = [
  ...getProjectFiles(projectsDir),
  ...getProjectFiles(videoProjectsDir)
];

console.log(`Found ${allProjectFiles.length} projects. Generating static HTML for OG tags...`);

allProjectFiles.forEach(filePath => {
  try {
    // 读取文件内容并使用正则提取我们需要的信息
    // 因为项目配置是 ES6 模块，不能直接 require，我们用正则提取
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 提取 slug 或 id (如果 slug 不存在)
    const slugMatch = content.match(/slug:\s*['"]([^'"]+)['"]/);
    const idMatch = content.match(/id:\s*['"]?([^'",\s]+)['"]?/);
    const slug = slugMatch ? slugMatch[1] : (idMatch ? idMatch[1] : null);
    
    if (!slug) return; // 跳过没有标识符的项目

    // 提取标题 (中文)
    let title = 'Epitaph';
    const titleZhMatch = content.match(/zh:\s*['"]([^'"]+)['"]/);
    if (titleZhMatch) {
      title = `${titleZhMatch[1]} | Epitaph`;
    }

    // 提取描述 (中文)
    let description = '希望每个人都可以找到自己的理想并为之劳动。萝北来信的作品集、游戏、小说与画作。';
    // 简单匹配 descriptionKey 下的 zh
    const descRegex = /descriptionKey:\s*\{[\s\S]*?zh:\s*['"]([^'"]+)['"]/;
    const descMatch = content.match(descRegex);
    if (descMatch) {
      description = descMatch[1];
    }

    // 提取图片
    let ogImage = defaultOgImage;
    const imageMatch = content.match(/image:\s*(?:require\(['"]([^'"]+)['"]\)|['"]([^'"]+)['"])/);
    if (imageMatch) {
      if (imageMatch[1]) {
        const imgName = path.basename(imageMatch[1]);
        if (copyOgImage(imageMatch[1])) {
          ogImage = `${baseUrl}/img/og/${imgName}`;
        }
      } else if (imageMatch[2]) {
        // 外部图片链接
        ogImage = imageMatch[2];
      }
    } else {
      const bvMatch = content.match(/bilibiliVideoId:\s*['"]([^'"]+)['"]/);
      if (bvMatch && bilibiliCovers[bvMatch[1]]) {
        ogImage = bilibiliCovers[bvMatch[1]];
      }
    }

    // 4. 替换 HTML 中的 meta 标签
    let projectHtml = templateHtml
      .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
      .replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${title}">`)
      .replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${description}">`)
      .replace(/<meta property="og:description" content=".*?">/, `<meta property="og:description" content="${description}">`);

    // 插入 og:image
    if (!projectHtml.includes('property="og:image"')) {
      projectHtml = projectHtml.replace(
        /<meta property="og:type" content="website">/,
        `<meta property="og:type" content="website">\n    <meta property="og:image" content="${ogImage}">\n    <meta name="twitter:card" content="summary_large_image">`
      );
    }

    // 5. 写入到 dist/project/slug/index.html
    const targetDir = path.join(__dirname, `../dist/project/${slug}`);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(path.join(targetDir, 'index.html'), projectHtml, 'utf8');

  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
  }
});

console.log('OG pages generation completed.');
