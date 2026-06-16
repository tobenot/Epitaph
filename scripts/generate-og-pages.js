const fs = require('fs');
const path = require('path');

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
        // 本地图片 require('@/assets/images/...')
        // 在打包后，图片会被放到 img/ 目录下，并且带有 hash。
        // 为了简单起见，如果它使用了本地图片，我们这里暂时回退到默认图，
        // 或者我们可以直接指向原始的 assets 路径（如果服务器支持）。
        // 更完美的做法是在 vue.config.js 中配置，但这里我们先用一个简单的映射
        const imgName = path.basename(imageMatch[1]);
        // 假设打包后的图片在 /img/ 目录下，虽然有 hash，但为了 og:image，我们可以直接把原图复制一份到 public
        // 这里我们先用默认图兜底，如果需要精准，可以后续优化
        ogImage = `${baseUrl}/img/og/${imgName}`; 
      } else if (imageMatch[2]) {
        // 外部图片链接
        ogImage = imageMatch[2];
      }
    } else {
      // 检查是否有 B站 视频 ID
      const bvMatch = content.match(/bilibiliVideoId:\s*['"]([^'"]+)['"]/);
      if (bvMatch) {
        // 如果有 B站视频，暂时没法同步获取封面，用默认图
        // (获取B站封面需要发网络请求，在打包脚本里做会比较慢)
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
