# 庆典游园维护指南 (Celebration / Garden Fair)

限时或专题性的「游园会」页面：**一篇可排版的 Markdown 文章**，中间随意插入立绘与作品卡片。第一届为**第 82 届心界大会**；以后可并列多届，每届独立配置。

**本文档为庆典功能的维护参考**；配置字段名若有调整应同步改本文档。

---

## 1. 庆典是什么

| 维度 | 说明 |
|------|------|
| 用途 | 在一段时间或主题下策展一批作品，用文章叙述 + 立绘 + 作品卡片串联 |
| 与 `series` 的区别 | `series` 是作品页底部被动列表；庆典有独立入口页与策展文案 |
| 与首页筛选的区别 | 首页按 pride/标签/filter；庆典按 `body[]` 块顺序自由排版，展品可跨系列 |
| 交互 | 滚动阅读；无 Galgame 式点按推进 |

---

## 2. 路由与导航

| 项 | 值 |
|----|-----|
| 路径 | `/celebration/:id` |
| 第一届 id | `heart-world-conference-82` |
| 顶栏 | `siteConfig.navItems` 链到当前活跃届 |
| 作品详情 | 仍用 `/project/:slug`；嵌入卡点击跳转作品页 |

---

## 3. 页面结构（文章式）

页眉（`titleKey` / `subtitleKey` / `descriptionKey`）+ 正文 `body[]`。

正文由三种块交替组成，**顺序即排版顺序**：

```
┌─ 页眉（标题、副标题、SEO 描述）────────┐
├─ prose（Markdown 段落）────────────────┤
├─ portrait（2:3 立绘，可左/右/居中）────┤
├─ prose ────────────────────────────────┤
├─ project（紧凑作品卡 + 可选策展介绍）──┤
├─ portrait ─────────────────────────────┤
├─ project … ────────────────────────────┤
└─ prose（散场等）───────────────────────┘
```

立绘可 `float` 到段落两侧，正文环绕；移动端自动居中。

---

## 4. 视觉气质

**基底：黑石海滩**（Heart World 世界观场景）

- 主背景：深色、偏冷的海滩/礁石基调
- 正文区 max-width 680px，类似阅读文章

**点缀：彩色庆祝式**

- 顶栏彩旗、立绘边框、作品卡左侧色条等局部高饱和点缀

---

## 5. 配置文件

### 5.1 文件位置

| 文件 | 作用 |
|------|------|
| `src/config/celebrationsConfig.js` | 各届庆典数据 |
| `src/config.js` | merge `celebrations` |
| `src/views/Celebration.vue` | 文章主页面 |
| `src/components/CelebrationProse.vue` | Markdown 段落渲染 |
| `src/components/CelebrationPortrait.vue` | 2:3 立绘槽 |
| `src/components/CelebrationProjectEmbed.vue` | 紧凑作品嵌入卡 |
| `src/utils/celebrationMarkdown.js` | 轻量 Markdown → HTML |
| `src/utils/celebration.js` | 庆典查询、body 解析 |
| `src/router/index.js` | 路由 + `updatePageMeta` |
| `src/config/siteConfig.js` | 顶栏入口 |

### 5.2 顶层结构

```javascript
export default {
  "heart-world-conference-82": {
    id: "heart-world-conference-82",
    hidden: false,
    active: true,

    titleKey: { zh: "…", en: "…" },
    subtitleKey: { zh: "…", en: "…" },
    descriptionKey: { zh: "…", en: "…" },

    period: { start: "2025-09", end: "2026-03" },
    theme: { id: "blackstone-beach" },

    characters: { /* §5.3 */ },
    body: [ /* §5.4 */ ]
  }
}
```

`hidden: true` 的届不在顶栏展示，路由仍可访问。

### 5.3 `characters`（立绘角色）

```javascript
characters: {
  luobei: {
    nameKey: { zh: "萝北", en: "Luobei" },
    roleKey: { zh: "参展者", en: "Exhibitor" },
    portrait: require("@/assets/celebrations/hw82/luobei.webp")
  }
}
```

| 字段 | 说明 |
|------|------|
| `nameKey` | 立绘下方姓名 |
| `roleKey` | 可选，身份小字 |
| `portrait` | 立绘素材；**2:3 竖图**，在 2:3 槽内 `object-fit: cover`，`object-position: top center` |

无 `portrait` 时显示占位渐变，不影响排版。

### 5.4 `body[]`（文章块）

| `type` | 含义 | 字段 |
|--------|------|------|
| `prose` | Markdown 段落 | `textKey: { zh, en }` |
| `portrait` | 立绘 | `character`（characters id）；`align`: `left` \| `right` \| `center`（默认 `left`） |
| `project` | 作品嵌入 | `slug`；可选 `introKey: { zh, en }` 策展语（显示在卡片下方） |

```javascript
body: [
  {
    type: "prose",
    textKey: {
      zh: "## 入园\n\n欢迎来到黑石海滩……",
      en: "## Entrance\n\nWelcome to Blackstone Beach…"
    }
  },
  { type: "portrait", character: "luobei", align: "left" },
  {
    type: "prose",
    textKey: { zh: "我先带你看心界展区。", en: "Let me show you the Heart World booth." }
  },
  {
    type: "project",
    slug: "heart-world",
    introKey: {
      zh: "这是心界系列的入口。本届我想把它放在最前面……",
      en: "This is the gateway to the Heart World series…"
    }
  },
  { type: "project", slug: "some-other-project" }
]
```

**展品范围**：`slug` 可指向任意 `config.projects` 中的项目。同一 slug 可在同一届 `body` 中多次出现。

### 5.5 Markdown 子集（`prose` 内）

| 语法 | 效果 |
|------|------|
| `#` / `##` / `###` | 标题 |
| 空行 | 段落分隔 |
| `**粗体**` / `*斜体*` | 行内强调 |
| `> 引用` | 块引用 |
| `[文字](url)` | 链接 |

不支持表格、代码块、图片语法（图片请用 `portrait` 块或后续扩展）。

---

## 6. 作品嵌入卡

- 横向紧凑布局：96×54 缩略图 + 标题 + 项目简介（各最多 2 行）+「访问项目」
- 数据从 `config.projects` 按 `slug` 解析，不在庆典配置重复 `titleKey` / `image`
- `introKey` 为**本届策展语**，显示在卡片下方，支持 Markdown
- 点击卡片 → `/project/:slug`
- 边框色与首页卡片逻辑一致（习作 / 完成度）

---

## 7. 与 Project 页的回链

若某 `slug` 出现在活跃届的 `body` 中（`type: "project"`），Project 详情页显示：

> 参展于 [第 82 届心界大会](/celebration/heart-world-conference-82)

由庆典配置单向引用 slug 推导，不必给 project 加字段。

---

## 8. i18n

- 庆典文案一律 `*Key: { zh, en }` 写在 `celebrationsConfig.js`
- 顶栏：`common.nav.celebration`

---

## 9. 顶栏与多届

**第一届**：顶栏链 `/celebration/heart-world-conference-82`。

**多届之后**（二选一）：

1. 顶栏只链 `active: true` 的届
2. 顶栏链 `/celebrations` 索引页（尚未实现）

旧届：`hidden: true` 退出顶栏，URL 保留。

---

## 10. SEO

- `updatePageMeta`：`Celebration` 路由用 `titleKey` / `descriptionKey`
- 可选：`generate-og-pages.js` 扩展 `/celebration/:id` 静态 OG

---

## 11. 第一届 checklist

1. 定 `id`: `heart-world-conference-82`
2. 写页眉 `titleKey` / `subtitleKey` / `descriptionKey`
3. 在 `characters` 登记角色，准备 **2:3 立绘** 素材路径
4. 排 `body`：prose ↔ portrait ↔ project 交替
5. 每个 `project.slug` 确认在 `projects` 中存在；需要的话写 `introKey`
6. 本地打开 `/celebration/heart-world-conference-82` 检查排版（尤其立绘左/右浮动）

---

## 12. 代码位置速查

| 文件 | 作用 |
|------|------|
| `src/config/celebrationsConfig.js` | 庆典数据 |
| `src/config/CELEBRATION_MAINTENANCE.md` | 本文档 |
| `src/views/Celebration.vue` | 文章页 |
| `src/components/CelebrationProse.vue` | Markdown 块 |
| `src/components/CelebrationPortrait.vue` | 立绘块 |
| `src/components/CelebrationProjectEmbed.vue` | 作品嵌入块 |
| `src/utils/celebrationMarkdown.js` | Markdown 解析 |
| `src/utils/celebration.js` | 工具函数 |
| `src/config/seriesConfig.js` | 系列（与庆典独立） |
