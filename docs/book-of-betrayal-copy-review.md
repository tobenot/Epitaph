# 《背叛书·上》作品页介绍候选

更新：2026-10-03 01:01，作者已批准00:50完整展示的朴实英文主介绍、摘要与开发者说明。中文和其他作品资料保持不变，英文规模单位修正为Chinese characters。中英文均已发布，英文构建、CI及正式页面逐字段读回通过。任务权威T-00158。以下旧发布记录按时间保留。

## 初稿目标与边界（历史，现行发布范围见开头）

把e.tobenot.top/project/book-of-betrayal从篇数、字数与人物标签简介改成读者能够理解的作品介绍。同步中英文摘要、正文、开发者的话，英文规模改为Chinese characters。保留现有数据、日期、分类、平台、链接与图片，不改小说、Unity工程、博客宣发页或网站通用布局。不声称日语版已经上线，不引入旧设计中未采用的搜索、随机选篇或光路功能。

## 当前入口与路线

- 配置与完整拟发布原文：[`src/config/projects/book-of-betrayal.js`](../src/config/projects/book-of-betrayal.js)。含中英文摘要、规模、主介绍、开发者的话及VRChat/宣发页链接。
- 可连续阅读的完整候选：[`book-of-betrayal-copy-candidate.md`](book-of-betrayal-copy-candidate.md)。由配置导出，避免另行手抄失配。
- 原目标：https://e.tobenot.top/project/book-of-betrayal
- 网站仓库：https://github.com/tobenot/Epitaph
- 原稿仓库：本机`/root/workspace/projects/vrc-Book-of-Betrayals`，只读。

| 阶段 | 状态 | 下一步 |
|---|---|---|
| 原文依据与改稿 | 本地候选已写 | 只按作者反馈调整，不加虚构设定 |
| 工程与浏览器检查 | 已执行 | 修改后重建并重测对应内容 |
| 作者声音与措辞 | 中文和本次英文均已认可 | 严格按批准稿发布 |
| 对外发布 | 中英文均已发布并核对 | 本轮完成 |

## 原文依据

原稿路径均相对`vrc-Book-of-Betrayals`：

- `Docs/book/book-of-betrayals-Preface-origin.md`：副标题、被背叛与背叛、经文体、乱序与顺序阅读、上篇五章、内容提示。
- `Docs/book/book-of-betrayals-Text-origin.md`：本轮针对介绍抽读，不宣称全书精读。
  - 1–14篇：孤独、来到星铭世界、合照与宿舍、砂糖称呼。
  - 27–38篇：帮助朋友分析感情、霜白出场、追求清野、油灯契约。
  - 84–93篇：多人关系、占有、嫉妒、替别人决定，以及自我解释。
  - 170–172篇：争取名分与关系协商。
  - 末段与《绷带》：校验没有把上篇介绍写成圆满结局或下篇梗概。
- `Docs/project-status.md`：正式版功能边界，219块StonePageController序列化证据。原场景同时可检索到NightSky_Particles与System_GrassManager。
- 开发者的话沿用原作品配置关于转自视觉小说企划、读者反馈与作者疗愈的陈述，不把这些历史自述当本轮重新采集的读者统计。
- 访问量、收藏量原样保留，不宣称本轮更新过实时数字。

## 验证与限制

- 起始`main...origin/main`，工作树干净。只读fetch核对无上游待合并提交。
- `git diff --check`通过。
- 已实际执行`node scripts/generate-sitemap.js && ./node_modules/.bin/vue-cli-service build && node scripts/generate-og-pages.js && node scripts/generate-sw.js`，退出0。构建有资源/入口体积警告，未把无关性能优化纳入本轮。
- 有意不触发prebuild中的全站B站封面抓取，使用仓库已有封面缓存，避免介绍改稿引入不相关网络写入。
- 生产产物在127.0.0.1:4187临时提供，仅回环监听。HTTP读取成功。
- 浏览器首次Runtime.evaluate超时，后续在同一页面成功读取，不归因为网站故障。一次自写检查脚本因换行转义报语法错误，修正检查脚本后通过，没有为此修改网站代码。
- 中英文分别测试390×844和1280×577。通过真实语言按钮切换，正文七段、computed white-space为pre-wrap，文档没有横向溢出，VRChat入口保留。证据：[`reviews/book-of-betrayal-2026-10-02-browser.json`](reviews/book-of-betrayal-2026-10-02-browser.json)。这是浏览器DOM/排版测量，不是作者或真人阅读体验接受。
- 手机正文沿用现有较窄版心，本轮未改全站CSS，不把无横向溢出等同于排版最佳。
- 线上尚未变更。作者是否喜欢声音、英文是否作为正式译名采用及是否发布，均保留作者判断。

## 2026-10-03 发布结果

作者00:09授权后，发布提交`f0f0db5410e4fbf7aab81d2b3cfd81dcb5b16ae1`。 [Actions](https://github.com/tobenot/Epitaph/actions/runs/37032484247)成功。正式页https://e.tobenot.top/project/book-of-betrayal/引用`app.3e3bcd7c.js`，已核对认可文本存在、被替代初稿排比不存在。真实浏览器切中文并以390px宽度核对主介绍，换行正常、无横向溢出。证据：[资源读回](reviews/book-of-betrayal-2026-10-03-published.json)、[浏览器读回](reviews/book-of-betrayal-2026-10-03-live-browser.json)。英文与开发者说明保留发布前版本，本轮不发布未经新一轮确认的译稿。

## 2026-10-03 01:01授权的英文发布

提交`a08d010bc1f2724a15887282c0eaae983c084697`，[Actions 37038332588](https://github.com/tobenot/Epitaph/actions/runs/37038332588)成功。正式页实际加载`app.306ecf60.js`。浏览器点击En后，在390与1440宽度将完整主介绍、meta摘要、开发者说明和规模单位与批准JSON逐字段对照通过，无横向溢出。中文及其他项目字段未改，旧人物标签已不显示。证据：[批准稿](reviews/book-of-betrayal-en-approved-2026-10-03.json)、[正式页读回](reviews/book-of-betrayal-en-live-2026-10-03.json)。发布的是00:50展示的英文原文，不是最初被替代的草稿。
