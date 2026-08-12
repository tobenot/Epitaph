// 生成 PWA service worker（workbox-build generateSW）
// 在 postbuild 阶段对 dist/ 进行预缓存，产物为 dist/sw.js + dist/workbox-*.js
// 等价于 VitePWA 的 registerType:'autoUpdate'（skipWaiting + clientsClaim）
const path = require('path')
const { generateSW } = require('workbox-build')

const root = path.join(__dirname, '..')
const distDir = path.join(root, 'dist')

generateSW({
  globDirectory: distDir,
  globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
  // 避免把自身与 workbox 运行时重复纳入预缓存
  globIgnores: ['sw.js', 'workbox-*.js'],
  // 主 chunk 或 OG 静态页可能超过 2MiB，放宽到 4MiB
  maximumFileSizeToCacheInBytes: 4194304,
  // SPA 导航回退
  navigateFallback: 'index.html',
  navigateFallbackDenylist: [/^\/api/],
  cleanupOutdatedCaches: true,
  // autoUpdate：新 SW 就绪后立即接管
  skipWaiting: true,
  clientsClaim: true,
  swDest: path.join(distDir, 'sw.js'),
  sourcemap: false
})
  .then(({ count, size, warnings }) => {
    if (warnings && warnings.length) {
      console.warn('[sw] workbox warnings:')
      warnings.forEach(w => console.warn('  -', w))
    }
    console.log(`[sw] generated dist/sw.js — ${count} files precached, ${(size / 1024).toFixed(1)} KiB`)
  })
  .catch(err => {
    console.error('[sw] fatal:', err && err.message ? err.message : err)
    process.exit(1)
  })
