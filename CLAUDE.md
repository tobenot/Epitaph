# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Epitaph（墓志铭）is the personal portfolio site of 萝北来信 (tobenot) — a Vue 3 SPA showcasing games, novels, VRChat worlds, tools, videos, paintings, photographs, and sound works. It is bilingual (zh/en) and deployed to GitHub Pages at the custom domain `e.tobenot.top`.

## Commands

```bash
npm run dev                 # dev server (vue-cli-service serve)
npm run build               # production build (runs prebuild hooks first)
npm run deploy              # build + push dist/ to gh-pages branch

# Build-time generation scripts (run automatically by prebuild/postbuild, but invokable directly):
node scripts/generate-sitemap.js        # prebuild: rewrites public/sitemap.xml
node scripts/fetch-bilibili-covers.js   # prebuild: pulls B站 video covers → src/data/bilibili-covers.json
node scripts/generate-og-pages.js       # postbuild: writes per-project dist/project/<slug>/index.html for OG previews

# Project ordering — see "Pride ordering" below. ALWAYS use the script, never hand-edit pride numbers.
npm run pride-sort -- list [n]                          # full ranking (rank, id, pride, zh title) or top n
npm run pride-sort -- find <keyword>                    # rank of a project by title/id
npm run pride-sort -- move-after <item-id> <anchor-id>  # place item directly after anchor
npm run pride-sort -- move-group-after <anchor-id> <item-id> [item-id...]  # move a block
npm run pride-sort -- renumber                          # re-stamp all pride values with step 1024 (gaps exhausted / bulk changes)
```

There is no test suite or linter configured.

## Architecture

### Config-driven content, not code-driven

Almost all site content lives in `src/config/`. The app reads these at runtime; views are thin renderers.

- **`src/config.js`** — barrel that merges `siteConfig`, `projectsConfig`, `galleriesConfig`, `soundsConfig`, `aboutConfig`, `seriesConfig` into one default export consumed app-wide.
- **`src/config/projects/`** — one file per project (e.g. `aftergrass.js`). `projectsConfig.js` uses webpack `require.context` to **auto-load every `.js` file recursively**, drops `hidden: true` entries, then sorts by `pride` descending. New subfolders are picked up automatically — no registry to update.
- Video projects live in `src/config/projects/videos/`. Build scripts that scan projects hardcode both the root and the `videos/` subdir, so a new third subfolder would need updates in `fetch-bilibili-covers.js` and `generate-og-pages.js`.

### Pride ordering (the central sorting mechanism)

Each project's display order on the home page (and the default config order) is governed by a numeric `pride` field — **higher = earlier**. Numbers are spaced with step `1024` (`2^10`) so insertions can use midpoint `(upper + lower) >> 1` without disturbing neighbors. When a gap is exhausted (neighbors differ by 1), run `renumber`.

- Never read rank from the `pride` number — use `pride-sort list` / `find`.
- The `move-after` / `move-group-after` commands read `id` (must match the filename without `.js`).
- Logic: `scripts/pride-sort.js` (numbering), `src/config/projectsConfig.js` (load + sort), `src/views/Home.vue` (render).

### Portfolio classification (three home-page filter buttons)

Home page has three toggles: 完成度高 (complete) / 习作 (study) / 进行中 (ongoing). Classification priority (highest first), implemented in `src/utils/portfolio.js`:

1. `portfolioKind === 'study'` → 习作 (coursework/practice; beats "complete" even if `status: released`)
2. `completeness: 'high'|'complete'` → 完成度高; `completeness: 'partial'|'low'` → 进行中 (overrides `status`)
3. else by `status`: `released`/`archived` → 完成度高; anything else → 进行中

`experienceable` (true/false/unset) is an **independent** dimension controlling the "可体验" footnote, NOT the same as completeness. See `src/config/PORTFOLIO_MAINTENANCE.md` for the full decision flow and examples.

### Tags & facets (dual system)

- **Free `tags`** on each project — short, filterable words only (tech stack, series, aggregatable themes). Gameplay mechanics belong in `descriptionKey`/`developerNotesKey`, not tags.
- **Facets** in `src/config/tagFacets.js` — `match` rules that group scattered tags into home-page "技术栈" filter buttons. Matching is bidirectional substring (`tag.includes(rule) || rule.includes(tag)`); zero-count facets auto-hide.
- Shared matching logic lives in `src/utils/tagFacets.js` (used by both `Home.vue` and `Project.vue`). Add a facet by editing `tagFacets.js` — no util changes needed.

See `src/config/TAGS_MAINTENANCE.md` for the facet list and `src/config/PRIDE_SORT_MAINTENANCE.md` for full pride docs. **These three `*_MAINTENANCE.md` files are the authoritative reference** — read them before touching classification, tags, or ordering.

### i18n

`src/i18n/` with `vue-i18n` (composition mode, `legacy: false`). Locales in `src/i18n/locales/{zh,en}.js`, fallback `zh`. Locale chosen from `localStorage('locale')` else browser language. Localized project fields use the `*Key: { zh, en }` pattern (e.g. `titleKey`, `descriptionKey`); a `pickLocalized` helper falls back to `zh` when a locale is missing.

### Routing & SEO

`src/router/index.js` defines routes: `/`, `/project/:slug`, `/about`, `/gallery`, `/paintings`, `/photographs`, `/sounds`. `router.afterEach` runs `updatePageMeta` which sets `<title>`, description, and OG tags per route (project pages prefer `metaTitleKey`/`metaDescriptionKey`, falling back to `titleKey`/`descriptionKey`).

Because this is an SPA on GitHub Pages, per-project OG previews are generated **statically at build time** by `generate-og-pages.js`, which regex-extracts slug/title/description/image from each project file and writes a `dist/project/<slug>/index.html` (cloned from the built `dist/index.html` with meta tags swapped). It copies local cover images into `dist/img/og/` and falls back to cached bilibili covers. The sitemap is similarly regenerated each build.

### Bilibili covers

Setting `bilibiliVideoId: "BV..."` on a project pulls the cover from the B站 API at build time (cached in `src/data/bilibili-covers.json`, 200ms between requests, falls back to cached on failure). If a project already has a local `image`, do **not** also set `bilibiliVideoId` — the bilibili cover takes precedence at render time.

## Adding a new project

1. Create `src/config/projects/<slug>.js` (or `.../videos/<slug>.js` for video projects). `id` must equal the filename. Full field template is in the project memory at `C:\Users\L\.claude\projects\D--GitRep-Epitaph\memory\project-adding-guide.md`.
2. Set `status` (required), and optionally `portfolioKind`, `completeness`, `experienceable`, `tags`. Run through the checklist in `PORTFOLIO_MAINTENANCE.md`.
3. Placement in the pride order: run `npm run pride-sort -- move-after <new-id> <anchor-id>` to position it; only `renumber` if a gap is exhausted.
4. `publicPath` is `/` (custom domain root), so asset paths are absolute from site root.

## Deployment

Two paths exist (both produce `dist/`):
- `.github/workflows/deploy.yml` — CI builds on push to main/master and deploys `./dist` to GitHub Pages (the active path).
- `npm run deploy` — local `gh-pages -d dist` alternative.

`public/CNAME` pins the custom domain `e.tobenot.top`.
