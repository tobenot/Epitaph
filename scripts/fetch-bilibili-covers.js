const fs = require('fs');
const path = require('path');

const OUTPUT = path.join(__dirname, '../src/data/bilibili-covers.json');
const PROJECT_DIRS = [
  path.join(__dirname, '../src/config/projects'),
  path.join(__dirname, '../src/config/projects/videos')
];
const REQUEST_DELAY_MS = 200;
const USER_AGENT = 'Mozilla/5.0 (compatible; EpitaphBuild/1.0)';

function getProjectFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.js'))
    .map(file => path.join(dir, file));
}

function collectBvids() {
  const bvids = new Set();
  const files = PROJECT_DIRS.flatMap(getProjectFiles);
  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/bilibiliVideoId:\s*['"]([^'"]+)['"]/);
    if (match) bvids.add(match[1]);
  }
  return [...bvids];
}

function loadExisting() {
  if (!fs.existsSync(OUTPUT)) return {};
  try {
    return JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));
  } catch {
    return {};
  }
}

function normalizePicUrl(url) {
  return url.replace(/^http:\/\//i, 'https://');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchCover(bvid) {
  const res = await fetch(
    `https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(bvid)}`,
    { headers: { 'User-Agent': USER_AGENT } }
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.code !== 0 || !json.data?.pic) {
    throw new Error(json.message || `Bilibili code ${json.code}`);
  }
  return normalizePicUrl(json.data.pic);
}

async function main() {
  const bvids = collectBvids();
  const existing = loadExisting();
  const result = { ...existing };
  let updated = 0;
  const missing = [];

  for (const bvid of bvids) {
    if (REQUEST_DELAY_MS > 0) await sleep(REQUEST_DELAY_MS);
    try {
      const pic = await fetchCover(bvid);
      if (result[bvid] !== pic) {
        result[bvid] = pic;
        updated++;
      }
    } catch (err) {
      if (result[bvid]) {
        console.warn(`[bilibili-covers] ${bvid}: ${err.message}, using cached`);
      } else {
        console.warn(`[bilibili-covers] ${bvid}: ${err.message}, no cached cover`);
        missing.push(bvid);
      }
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, `${JSON.stringify(result, null, 2)}\n`, 'utf8');

  console.log(
    `[bilibili-covers] ${bvids.length} BV IDs, ${updated} updated, ${missing.length} without cover`
  );

  if (missing.length) {
    console.warn(`[bilibili-covers] missing: ${missing.join(', ')}`);
  }
}

main().catch(err => {
  console.error('[bilibili-covers] fatal:', err.message);
  process.exit(1);
});
