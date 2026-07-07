# Epitaph（墓志铭）项目资源文档

供无技术背景的 Review 人员、合作方或新维护者快速了解本站的设计、内容与实现方式。

**在线地址：** https://e.tobenot.top  
**仓库：** GitHub 托管，推送 `main`/`master` 后自动部署至 GitHub Pages  
**作者：** 萝北来信（LuobeiLetters，曾用名 tobenot）

---

## 1. 这是什么

Epitaph（墓志铭）是萝北来信的**个人作品集网站**。名字来自「作家书写作品，作家需要读者」——站点既是作品陈列处，也是作者与读者之间的媒介。

站点收录并展示多种创作形态：

| 类型 | 说明 | 站内入口 |
|------|------|----------|
| 游戏 | 独立游戏、Game Jam、课程作业等 | 首页 → 分类「游戏」 |
| 小说 / 世界观 | 长篇、短篇、互动叙事 | 首页 → 「小说」 |
| VRChat 世界 | 虚拟社交空间中的场景与体验 | 首页 → 「VRChat」 |
| 视频 | B 站投稿、OC 动画等 | 首页 → 「视频」 |
| AI / 工具 | 大模型相关实验、自用工具 | 首页 → 「AI」「工具」 |
| 绘画 / 摄影 | 视觉创作与生活记录 | 顶栏「绘画」「摄影」 |
| 音乐（留声） | 原创曲目与角色曲 | 顶栏「留声」 |
| 博客类条目 | 个人叙述、纪实类内容 | 首页 → 「博客」 |

截至文档编写时，首页作品库共 **57 个条目**（含 `videos/` 子目录中的视频项目）。另有绘画 1 幅、摄影若干张、音乐曲目若干首。

站点支持**中文 / 英文**双语切换，语言偏好保存在浏览器本地。

---

## 2. 理念与气质

### 2.1 内容立场

- 作品按作者个人「喜好度」排序，而非单纯按时间或热度。
- 「完成度高 / 习作 / 进行中」三个维度帮助读者区分成熟作品、课程练习与仍在推进的项目。
- 「可体验」单独标注：有公开入口（游玩、阅读、观看等）的作品会在卡片上注明，与完成度无关。
- About 页（顶栏「墓志铭」）保留了两版「墓志铭」原文——金同学版（2025）与萝北来信版（2026），阐述作者对创作与身后事的看法。

### 2.2 视觉设计

| 元素 | 描述 |
|------|------|
| 字体 | Playfair Display（标题）+ Lora（正文），衬线体，偏文学/古典气质 |
| 配色 | 米白纸纹背景（`#f0efe9`）、暖灰文字、金色点缀（`#bca979`） |
| 卡片 | 首页作品卡带装饰性画框角、左侧色条区分习作/完成作品 |
| 响应式 | 768px 以下折叠为移动端侧滑导航 |
| 庆典页 | 独立视觉：黑石海滩深色背景、粗野主义硬边框、无圆角，与主站纸纹风格区分 |

主站整体意象：**像翻阅一本装帧考究的作品目录**，而非典型科技产品落地页。

---

## 3. 站点地图

```
e.tobenot.top
├── /                          首页（作品库 + 筛选）
├── /project/:slug             单个作品详情
├── /celebration/:id           庆典游园（策展文章页）
├── /paintings                 绘画列表
├── /painting/:itemId        单幅绘画详情
├── /photographs               摄影列表
├── /photograph/:itemId      单张摄影详情
├── /sounds                    音乐列表（仅预览卡，不预加载音频）
├── /sound/:id                 单曲详情（含播放器与歌词）
├── /about                     墓志铭 / 关于
└── tobenot.top（外链）        作者博客「思想集」
```

**系列关联：** 部分作品属于同一系列（如「不止于纸上」「心界」「高考纪事」「星辉落」），详情页底部会列出同系列其他作品。系列定义在 `src/config/seriesConfig.js`。

**庆典：** 当前活跃届为「黑石海滩游园会」（`blackstone-beach-fair-82`），以文章 + 立绘 + 嵌入作品卡的形式策展一批代表作，顶栏「庆典」直达。

---

## 4. 首页如何使用（读者视角）

### 4.1 分类 Pathway

顶部九宫格按创作类型筛选：`全部` / `博客` / `VRChat` / `小说` / `AI` / `游戏` / `工具` / `视频` / `其他`。一个作品可属于多个分类（如某条目同时是「视频」和「VRChat」）。

### 4.2 技术栈 Facet

「技术栈」一行按钮把分散在各作品 `tags` 里的词聚合为可点选的筛选项，例如：LLM、VRChat、UE5、C++、Game Jam、高考、开源等。没有任何作品匹配时，该按钮自动隐藏。

### 4.3 作品类型三按钮

| 按钮 | 含义 |
|------|------|
| 完成度高 | 成熟、可代表水平的作品（默认开启） |
| 习作 | 课程作业、练习性质 |
| 进行中 | 仍在开发或完成度较低 |

可多选，至少保留一个开启。

### 4.4 排序

- **按本人喜好度**（默认）：作者主观排序，数值不展示给读者。
- **按时间**：按作品 `date` 字段。

### 4.5 搜索与 URL

搜索框匹配标题、描述、标签、引擎、类型等。筛选状态会写入 URL（如 `/?category=game&facet=ue5&q=射击`），可分享、刷新后保持。

---

## 5. 作品条目里有什么（内容模型）

每个作品是一个 JavaScript 配置文件（`src/config/projects/<slug>.js`），典型字段：

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 与文件名一致 |
| `slug` | 是 | URL 路径 `/project/<slug>` |
| `pride` | 是 | 喜好度排序值（越大越靠前） |
| `category` | 是 | 分类，字符串或数组 |
| `status` | 是 | `released` / `development` / `archived` / `halted` / `concept` 等 |
| `titleKey` | 是 | `{ zh, en }` 标题 |
| `descriptionKey` | 是 | 卡片简介 |
| `date` | 建议 | `{ year, month? }` |
| `image` | 建议 | 本地封面图 |
| `bilibiliVideoId` | 可选 | B 站 BV 号，构建时拉取封面（与本地 `image` 二选一，勿同时设） |
| `tags` | 可选 | 0–3 个短标签，供筛选 |
| `portfolioKind` | 可选 | `"study"` → 习作 |
| `completeness` | 可选 | 覆盖 status 对「完成度高」的推断 |
| `experienceable` | 可选 | `true` / `false`，控制「可体验」注脚 |
| `longDescriptionKey` | 可选 | 详情页长文 |
| `developerNotesKey` | 可选 | 开发者备注 |
| `links` | 可选 | 外链（VRChat、GitHub、B 站等） |
| `series` | 可选 | 关联系列 id |
| `engine` / `platform` / `genres` / `themes` | 可选 | 元数据 |
| `achievements` | 可选 | 成绩列表 |
| `hidden` | 可选 | `true` 时不进入作品库 |

视频类作品放在 `src/config/projects/videos/` 子目录，规则相同。

---

## 6. 技术概览

### 6.1 技术栈

| 层级 | 选型 |
|------|------|
| 框架 | Vue 3（Composition API） |
| 路由 | Vue Router 4（History 模式） |
| 国际化 | vue-i18n 11 |
| 样式 | SCSS + CSS 变量 |
| 构建 | Vue CLI 5（`@vue/cli-service`） |
| 部署 | GitHub Actions → GitHub Pages |
| 域名 | `public/CNAME` 指向 `e.tobenot.top` |

无后端、无数据库、无测试套件。全部内容为构建时打包进静态站。

### 6.2 核心架构：配置驱动

```
src/config/          ← 几乎全部内容在这里
    ├── siteConfig.js       站点标题、导航
    ├── projects/           每个作品一个 .js（自动加载）
    ├── projectsConfig.js   require.context 聚合 + pride 排序
    ├── seriesConfig.js     系列分组
    ├── celebrationsConfig.js  庆典数据
    ├── galleriesConfig.js  绘画 + 摄影
    ├── soundsConfig.js     音乐
    ├── aboutConfig.js      关于页
    └── tagFacets.js        技术栈聚合规则

src/views/           ← 薄视图层，读 config 渲染
src/components/      ← 可复用 UI（分页、庆典块等）
src/utils/           ← 筛选、归类、日期等纯逻辑
src/i18n/locales/    ← 界面文案（非作品内容）
```

**设计原则：** 加一个新作品 = 新建一个 config 文件，无需改路由或注册表。视图只负责展示，业务规则集中在 `utils/` 与 config。

### 6.3 构建流水线

```
npm run build
  │
  ├─ prebuild
  │    ├─ generate-sitemap.js      重写 public/sitemap.xml
  │    └─ fetch-bilibili-covers.js 拉取 B 站封面 → bilibili-covers.json
  │
  ├─ vue-cli-service build        打包 Vue → dist/
  │
  └─ postbuild
       └─ generate-og-pages.js     为每个作品生成 dist/project/<slug>/index.html
                                    （解决 SPA 在社交平台分享时 OG 预览缺失）
```

### 6.4 SEO 与分享

- 路由切换时 `updatePageMeta` 动态设置 `<title>`、description、Open Graph 标签。
- 因 GitHub Pages 是纯静态 SPA，社交平台爬虫抓不到客户端渲染的 meta；故构建后为每个作品额外生成带正确 OG 标签的静态 HTML。
- `public/404.html` 含 SPA 回退脚本，支持直接访问深层链接。

### 6.5 性能相关设计

| 场景 | 做法 |
|------|------|
| 音乐列表 | 只显示卡片，不嵌入 `<audio>`，避免一次请求全部音频 |
| 音乐详情 | 进入 `/sound/:id` 才加载对应文件 |
| 绘画/摄影 | 列表轻量，详情页独立路由（曾用 lightbox，已改为路由） |
| 首页 | `keep-alive` 缓存 Home 组件，返回时保留筛选状态 |

---

## 7. 关键机制说明

### 7.1 喜好度排序（pride）

- 每个作品有数字 `pride`，**越大越靠前**。
- 步长 1024，插入新作时用上下邻的中点，避免改全部文件。
- **禁止手改数字推顺序**，使用脚本：

```bash
npm run pride-sort -- list              # 查看完整排名
npm run pride-sort -- find <关键词>      # 查某作品名次
npm run pride-sort -- move-after <新id> <锚点id>  # 把作品移到锚点后面
npm run pride-sort -- renumber          # 缝隙用尽时全量重编号
```

详见 `src/config/PRIDE_SORT_MAINTENANCE.md`。

### 7.2 作品类型归类（portfolio）

优先级：`portfolioKind: study` → `completeness` → `status`。

逻辑在 `src/utils/portfolio.js`。`experienceable` 与完成度独立。

详见 `src/config/PORTFOLIO_MAINTENANCE.md`。

### 7.3 标签与 Facet

- **tags**：作品上的自由短词。
- **facets**：`tagFacets.js` 里用 `match` 规则把 tags 归并为首页按钮。

详见 `src/config/TAGS_MAINTENANCE.md`。

### 7.4 系列（series）

`seriesConfig.js` 定义系列标题、描述与同系列 `slug` 列表。详情页底部展示关联系列，与首页筛选无关。

### 7.5 庆典（celebration）

独立策展页：`body[]` 由 `prose`（Markdown）、`portrait`（立绘）、`project`（嵌入作品卡）三种块按顺序组成。从庆典点进作品会带返回链与滚动位置恢复。

详见 `src/config/CELEBRATION_MAINTENANCE.md`。

---

## 8. 目录结构速查

```
Epitaph/
├── public/                 静态资源（CNAME、404、sitemap、庆典背景图）
├── src/
│   ├── assets/             图片、音频（webpack 处理）
│   ├── components/         Vue 组件
│   ├── config/             ★ 内容配置（核心）
│   ├── data/               构建缓存（bilibili-covers.json）
│   ├── i18n/               界面翻译
│   ├── router/             路由 + SEO meta
│   ├── utils/              工具函数
│   ├── views/              页面视图
│   ├── App.vue             壳（顶栏、底栏、语言切换）
│   ├── config.js           配置 barrel 导出
│   └── main.js             入口
├── scripts/                构建与维护脚本
├── .github/workflows/      CI 部署
├── package.json
├── vue.config.js           publicPath: '/'
├── CLAUDE.md               开发者速查（AI / 维护者用）
└── PROJECT_RESOURCE.md     本文档
```

---

## 9. 本地开发与部署

### 9.1 开发

```bash
npm install
npm run dev        # 本地开发服务器
```

### 9.2 构建与预览

```bash
npm run build      # 产出 dist/
```

### 9.3 部署

- **自动（推荐）：** 推送到 `main`/`master`，GitHub Actions 构建并发布到 GitHub Pages。
- **手动：** `npm run deploy`（构建 + `gh-pages` 推分支）。

---

## 10. 内容维护速查

| 任务 | 操作 |
|------|------|
| 新增作品 | 新建 `src/config/projects/<slug>.js` → 设字段 → `pride-sort move-after` 定位 |
| 隐藏作品 | 设 `hidden: true` |
| 改排序 | `npm run pride-sort -- move-after ...` |
| 加技术栈按钮 | 编辑 `src/config/tagFacets.js` 的 `match` |
| 新系列 | 编辑 `src/config/seriesConfig.js` |
| 新庆典届 | 编辑 `src/config/celebrationsConfig.js` |
| 新曲目 | 编辑 `src/config/soundsConfig.js`，音频放 `src/assets/audio/` |
| 新画作/照片 | 编辑 `paintingsConfig.js` / `photographsConfig.js` |
| 界面文案 | `src/i18n/locales/zh.js` 与 `en.js` |

---

## 11. Review 检查清单

供外部 Review 或上线前自检：

### 11.1 内容与呈现

- [ ] 首页默认排序（喜好度）是否符合当前策展意图
- [ ] 新作品 `titleKey` / `descriptionKey` 中英文是否齐全、无误
- [ ] 封面图是否正常（本地图 vs B 站封面逻辑）
- [ ] `experienceable` 是否与实际可访问入口一致
- [ ] `status` / `completeness` / `portfolioKind` 归类是否符合预期（切换三按钮验证）
- [ ] 外链（VRChat、GitHub、B 站）是否有效
- [ ] 系列页底部关联是否正确

### 11.2 多语言

- [ ] 切换中/En 后标题、描述、按钮文案是否正常
- [ ] 分享链接 `?lang=en` / `?lang=zh` 是否生效

### 11.3 专题页

- [ ] 庆典页排版（立绘左/右浮动、移动端）
- [ ] 从庆典进入作品再返回，滚动位置是否恢复
- [ ] 绘画/摄影/音乐详情页是否正常加载

### 11.4 技术与 SEO

- [ ] `npm run build` 无报错
- [ ] 构建后 `dist/project/<slug>/index.html` 是否生成
- [ ] 社交平台分享预览（标题、描述、图）是否正确
- [ ] 直接访问 `/project/<slug>` 等深层链接是否正常（404 回退）
- [ ] 移动端导航与卡片布局

### 11.5 性能与体验

- [ ] `/sounds` 列表页不应预加载全部音频
- [ ] 首页筛选 URL 可分享、刷新保持

---

## 12. 作品规模参考（按喜好度 Top 15）

| 排名 | ID | 中文标题 |
|------|-----|----------|
| 1 | book-of-betrayal | 背叛书·上 |
| 2 | gaokao-comeback-story | 从二本到全省1200名，我高三一年的逆袭故事 |
| 3 | sanctuary-of-writers | 作家之屋 |
| 4 | deep-talk-cards | Deep Talk Cards 话题世界 |
| 5 | beyond-books | 不止于纸上的故事 |
| 6 | beyond-books-silver-moon | 不止于纸上的故事：银月篇 |
| 7 | beyond-books-childhood-trailer | 【OC动画】不止于纸上的故事：童年篇 预告 |
| 8 | beyond-books-dragon-dance | 不止于纸上的故事：舞龙篇 |
| 9 | beyond-books-rule | 不止于纸上的故事：鸿律篇 |
| 10 | locust-hunter | 猎蝗人 |
| 11 | playground-tower-space-elevator | 操场·高楼·太空电梯 |
| 12 | vrc-became-eku | 【VRChat】现在我成了Eku，免费鸡蛋的毁灭者 |
| 13 | gaokao-aftermath | 高考后日谈：16个人生终极拷问 |
| 14 | aftergrass | Aftergrass 残响草地 |
| 15 | bedtime-stories-with-ai | 与AI的睡前故事 |

完整列表：`npm run pride-sort -- list`

---

## 13. 相关文档索引

| 文档 | 用途 |
|------|------|
| `README.md` | 仓库一句话说明 |
| `CLAUDE.md` | 开发者 / AI 助手的完整技术备忘 |
| `src/config/PORTFOLIO_MAINTENANCE.md` | 完成度高 / 习作 / 进行中 归类规则 |
| `src/config/TAGS_MAINTENANCE.md` | 标签与 Facet 维护 |
| `src/config/PRIDE_SORT_MAINTENANCE.md` | 喜好度排序脚本 |
| `src/config/CELEBRATION_MAINTENANCE.md` | 庆典游园配置 |
| `LICENSE` | 开源协议 |

---

## 14. 常见问答

**Q: 这是博客吗？**  
A: 不完全是。主站是作品集目录；深度文章在独立博客 tobenot.top。站内「博客」分类收录的是个人叙述类条目（如高考纪实视频）。

**Q: 作品数据存在数据库吗？**  
A: 否。全部是 `src/config/` 下的 JS 文件，构建时打进静态包。

**Q: 为什么有些项目 pride 相同？**  
A: 排名并列时按 `id` 字母序；可用 `renumber` 重新拉开间距。

**Q: B 站封面什么时候更新？**  
A: 每次 `npm run build` 的 prebuild 阶段请求 B 站 API（200ms 间隔），失败则用缓存 `bilibili-covers.json`。

**Q: 如何临时下线整个庆典？**  
A: 在 `celebrationsConfig.js` 设 `hidden: true` 或 `active: false`，并视情况调整 `siteConfig.navItems`。

---

*文档随仓库更新；作品数量与排名以运行 `npm run pride-sort -- list` 为准。*
