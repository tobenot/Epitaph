# 庆典游园维护指南 (Celebration / Garden Fair)

限时或专题性的「游园会」页面：竖向路线、海报板台词、作品摊位。第一届为**第 82 届心界大会**；以后可并列多届，每届独立配置。

**本文档为实现前的设计规格**；代码落地时以此为准，配置字段名若有调整应同步改本文档。

---

## 1. 庆典是什么

| 维度 | 说明 |
|------|------|
| 用途 | 在一段时间或主题下策展一批作品，用 in-universe 海报与路线串联 |
| 与 `series` 的区别 | `series` 是作品页底部被动列表；庆典有入口页、路线顺序、海报台词 |
| 与首页筛选的区别 | 首页按 pride/标签/filter；庆典按策展人定义的 `stops` 顺序，展品可跨系列 |
| 交互 | **无**点按推进式 Galgame；海报一次性展示，滚动阅读 |

---

## 2. 路由与导航

| 项 | 值 |
|----|-----|
| 路径 | `/celebration/:id` |
| 第一届 id | `heartsworld-conference-82` |
| 顶栏 | `siteConfig.navItems` 增加一项，链到当前活跃届（或庆典索引，见 §9） |
| 作品详情 | 仍用 `/project/:slug`；摊位卡点击行为与首页 `experience-card` 相同 |

多届示例：

```
/celebration/heartsworld-conference-82   ← 第一届
/celebration/heartsworld-conference-83   ← 未来届次
```

---

## 3. 页面结构（路线式）

整页为**从上到下的游园步道**。每个站点对应 `stops[]` 的一项，按数组顺序渲染。

```
┌─ header（庆典页眉）──────────────────┐
├─ notice · intro（入园海报）──────────┤
├─ booth（海报 + 作品卡）──────────────┤
├─ booth（仅作品卡，无 notice）────────┤
├─ notice · ambient（路边氛围板）──────┤
├─ booth（海报 + 作品卡）──────────────┤
├─ notice · ambient ──────────────────┤
├─ booth … ───────────────────────────┤
└─ notice · closing（出口留言）──────────┘
```

### 海报密度（推荐，可灵活打破）

- **入口** 1 块 `intro` 海报
- **出口** 1 块 `closing` 海报
- **有台词的摊位** 才在作品卡上方挂 `booth` 海报；纯展示摊位可只有卡
- **中间** 约 1～2 块 `ambient` 路边板（不绑作品，纯氛围）

`stops` 顺序即策展顺序，不必严格遵守上述密度；配置层保持灵活。

---

## 4. 视觉气质

**基底：黑石海滩基地**（Heart World 世界观场景）

- 主背景：深色、偏冷的海滩/礁石基调（深灰蓝、黑石质感）
- 正文与结构：保持 Epitaph 可读性，不牺牲 contrast

**点缀：彩色庆祝式**

- 彩旗、灯串、摊位装饰、海报板边框等局部高饱和点缀
- 庆祝色不铺满全页，与深色基底形成对比

实现时：庆典页 scoped 样式或 `celebration` 主题 class；不改动全站 `App.vue` 基调。

---

## 5. 配置文件

### 5.1 文件位置（计划）

| 文件 | 作用 |
|------|------|
| `src/config/celebrationsConfig.js` | 各届庆典数据 |
| `src/config.js` | merge `celebrations` |
| `src/views/Celebration.vue` | 路线主页面 |
| `src/components/FairNotice.vue` | 海报板（静态，非点击推进） |
| `src/router/index.js` | 路由 + `updatePageMeta` |
| `src/config/siteConfig.js` | 顶栏入口 |

### 5.2 顶层结构

```javascript
// celebrationsConfig.js
export default {
  "heartsworld-conference-82": {
    id: "heartsworld-conference-82",
    hidden: false,

    titleKey: { zh: "第 82 届心界大会", en: "82nd Heart World Conference" },
    subtitleKey: { zh: "…", en: "…" },
    descriptionKey: { zh: "…", en: "…" },  // 可选，SEO / 页眉副文案

    period: { start: "2025-09", end: "2026-03" },  // 可选，展示用
    cover: require("@/assets/..."),                 // 可选，页眉图

    theme: {
      id: "blackstone-beach",
      // 实现时可映射到 CSS 变量；配置留扩展位
    },

    characters: { /* §5.3 */ },
    stops: [ /* §5.4 */ ]
  }
}
```

`hidden: true` 的届不在顶栏展示，路由仍可访问（档案页）。

### 5.3 `characters`（in-universe 说话人）

全部由配置定义，站点不写死角色名。海报通过 `speaker` id 引用。

```javascript
characters: {
  luobei: {
    nameKey: { zh: "萝北", en: "Luobei" },
    avatar: require("@/assets/celebrations/hw82/luobei.webp"),  // 或 URL
    // 可选：roleKey 职位/身份小字
    roleKey: { zh: "参展者", en: "Exhibitor" }
  },
  robert: {
    nameKey: { zh: "罗伯特", en: "Robert" },
    avatar: require("..."),
    roleKey: { zh: "银月寺保安队长", en: "Silver Moon Head Guard" }
  }
}
```

立绘、头像、身份文案均在配置中维护，便于按届替换素材。

### 5.4 `stops[]`（路线站点）

| `type` | 含义 | 必填字段 |
|--------|------|----------|
| `header` | 庆典页眉（标题区） | 无额外字段；用庆典级 `titleKey` 等 |
| `notice` | 独立海报板 | `notice` 对象（§5.5） |
| `booth` | 作品摊位 | `slug`（project slug）；`notice` 可选 |

```javascript
stops: [
  { type: "header" },

  {
    type: "notice",
    notice: {
      variant: "intro",
      speaker: "luobei",
      textKey: {
        zh: "欢迎来到黑石海滩，第 82 届心界大会开始了。",
        en: "Welcome to Blackstone Beach. The 82nd Heart World Conference begins."
      },
      boardKey: { zh: "入园口", en: "Fair Entrance" }
    }
  },

  {
    type: "booth",
    slug: "heart-world",
    notice: {
      variant: "booth",
      speaker: "robert",
      textKey: { zh: "…", en: "…" },
      boardKey: { zh: "心灵世界展区", en: "Heart World Booth" }
    }
  },

  {
    type: "booth",
    slug: "some-other-project"
    // 无 notice：仅作品卡
  },

  {
    type: "notice",
    notice: {
      variant: "ambient",
      speaker: "guest-id",
      textKey: { zh: "路边闲聊…", en: "…" }
      // boardKey 可选；ambient 可省略
    }
  },

  {
    type: "notice",
    notice: {
      variant: "closing",
      speaker: "luobei",
      textKey: { zh: "…", en: "…" },
      boardKey: { zh: "出口留言板", en: "Exit Board" }
    }
  }
]
```

**展品范围**：`booth.slug` 可指向任意 `config.projects` 中的项目，不限 `series`。同一作品可参展多届（不同 `stops` 重复引用 slug 即可）。

### 5.5 `notice` 对象（FairNotice）

| 字段 | 说明 |
|------|------|
| `variant` | `intro` \| `booth` \| `ambient` \| `closing`；影响排版与装饰，**不**影响交互 |
| `speaker` | `characters` 中的 id |
| `textKey` | `{ zh, en }` 台词正文 |
| `boardKey` | 可选，`{ zh, en }` 板子标签（如「入园口」「某某展区」） |

**不是** Galgame：`FairNotice` 无「下一句」、无遮罩、无进度存档。整块 DOM 静态展示。

`variant` 视觉倾向：

| variant | 用途 |
|---------|------|
| `intro` | 入园；横幅感，字号略大 |
| `booth` | 摊位招呼；立绘 + 引号正文 + 展区名 |
| `ambient` | 路边氛围；可更紧凑 |
| `closing` | 散场留言 |

---

## 6. 作品卡（摊位）

- 复用首页 `experience-card` 结构与样式（实现时抽 `ProjectCard.vue` 或共用 scss）
- 数据从 `config.projects` 按 `slug` 解析，**不**在庆典配置里重复 `titleKey` / `image`
- 点击 → `router.push({ name: 'Project', params: { slug } })`
- 卡片注解（可体验、习作等）与首页逻辑一致

摊位区块布局：

```
[FairNotice]   ← 仅当 booth 带 notice 时
[ProjectCard]
```

---

## 7. 与 Project 页的回链（可选，实现时）

若某 `slug` 出现在活跃届的 `stops` 中，Project 详情页可显示：

> 参展于 [第 82 届心界大会](/celebration/heartsworld-conference-82)

由庆典配置单向引用 slug 即可推导，不必给 project 加 `celebration` 字段。

---

## 8. i18n

- 庆典文案一律 `*Key: { zh, en }` 写在 `celebrationsConfig.js`
- 顶栏名称：`siteConfig` 用 `nameKey` 指向 i18n，或庆典专用 `common.nav.celebration`

---

## 9. 顶栏与多届

**第一届**：顶栏一项指向 `/celebration/heartsworld-conference-82`。

**多届之后**（二选一，实现时再定）：

1. 顶栏仍只链**当前活跃届**；`celebrationsConfig` 用 `active: true` 标记
2. 顶栏链 `/celebrations` 索引页，列出 `hidden: false` 的各届

旧届：`hidden: true` 退出顶栏，URL 保留作档案。

---

## 10. SEO

- `updatePageMeta`：`Celebration` 路由用 `titleKey` / `descriptionKey`
- 可选：`scripts/generate-og-pages.js` 扩展生成 `/celebration/:id` 静态 OG（优先级低于 project）

---

## 11. 第一届 checklist（内容填写）

1. 定 `id`: `heartsworld-conference-82`
2. 写 `titleKey` / `subtitleKey` / `descriptionKey`
3. 在 `characters` 中登记所有 in-universe 说话人及素材路径
4. 排 `stops`：header → intro → booth… → ambient… → closing
5. 每个 `booth.slug` 确认在 `projects` 中存在
6. 准备黑石海滩基底 + 庆祝点缀的样式资源（页眉图、装饰素材等）
7. 顶栏文案与路由
8. 本地打开 `/celebration/heartsworld-conference-82` 检查路线顺序与海报密度

---

## 12. 实现顺序（建议）

1. `celebrationsConfig.js` 骨架 + 第一届占位 `stops`
2. `FairNotice.vue`（四 variant 静态排版）
3. `Celebration.vue`（遍历 `stops`，booth 解析 project）
4. 抽离或复用 `ProjectCard` / `experience-card` 样式
5. 路由、`config.js` merge、顶栏
6. 庆典页主题 CSS（黑石海滩 + 彩色点缀）
7. `updatePageMeta`；可选 Project 回链、OG 脚本

---

## 13. 代码位置速查（计划）

| 文件 | 作用 |
|------|------|
| `src/config/celebrationsConfig.js` | 庆典数据 |
| `src/config/CELEBRATION_MAINTENANCE.md` | 本文档 |
| `src/views/Celebration.vue` | 路线页 |
| `src/components/FairNotice.vue` | 海报板 |
| `src/views/Home.vue` | `experience-card` 样式来源 |
| `src/config/seriesConfig.js` | 系列（与庆典独立，可交叉引用 slug） |
