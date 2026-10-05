# 舞龙篇默认展示修正

## 当前入口与目标

- 来源：WebUI `40e2b9dd4d74`，用户2026-10-05 22:29要求把舞龙篇加入 `https://e.tobenot.top/`。
- 任务权威：看板 T-00207，项目 beyond-books。
- 已发布提交：`4b71c3471f96f685c422bdd3cc7bf39488eaed44`，已合并并推送main。候选分支`content/dragon-dance-completed-20261005`保留。
- 最小结果：让既有舞龙篇条目出现在默认「完成度高」列表，并清除过时的初稿标记。
- 保护范围：小说原文、现有封面、pride排序、日期、开发者手记、系列、其他作品不变。不开新服务或预览公网入口。

## Roadmap

1. 已核实公开博客完成稿、既有配置及线上详情。
2. 已完成单配置文件修正、生产构建与本地浏览器首页及中英文详情检查。
3. 作者2026-10-05 22:39明确回复「上线」，批准下列完整候选。标准生产构建、main推送、Pages部署和精确线上验证已完成。

## 因果与事实

- 首轮页面提取未列出舞龙篇，曾暂误判不存在。随后精确配置与详情页面证实条目一直存在。
- 初始生产状态是 `concept`，UI显示「草稿 / Draft」。`src/utils/portfolio.js`仅把released/archived默认归入完成度高，因此该条目被默认筛选隐藏。
- 博客 `https://tobenot.top/p/story-bb-dragon-dance/` 返回HTTP200，标题为「不止于纸上的故事：舞龙篇（完成稿）」，正文也标「完成稿」。仅抽读前言和开篇，没有全书精读。
- 原有五方会战与力量选择介绍保留，仅替换初稿状态，不新增剧情或字数。

## 完整已批准并上线改动

- `status`: `concept` → `released`，UI「草稿 / Draft」→「已发布 / Released」。
- `descriptionKey.zh`: 完成稿，五方异能者会战，力量与选择主题。
- `descriptionKey.en`: Completed novel. A five-way esper battle, themed around power and choice.
- `scale.zh`: 完成稿
- `scale.en`: Completed manuscript
- 阅读按钮中文：博客阅读
- 阅读按钮英文：Read on Blog
- 阅读链接（不变）：`https://tobenot.top/p/story-bb-dragon-dance/`
- 目标页面：`https://e.tobenot.top/project/beyond-books-dragon-dance/`，同步影响首页卡片与同系列卡片。

## 验证与限制

- `npm run build -- --dest /root/workspace/projects/Epitaph/.hermes-builds/dragon-dance-review-20261005` 成功。已有资产大小告警，B站封面API412使用既有缓存，与本条目现有本地封面无关。
- 项目的postbuild脚本硬编码dist，不能把custom dest视为完整SEO/SW发布产物。本轮候选目录仅用于SPA浏览器检查，正式发布须标准build。
- 本地服务器仅绑定127.0.0.1:38765，已检查listener。临时服务在检查后停止。
- 真实浏览器1280×577：默认首页中英文都有卡片，点击进入精确舞龙篇详情，中英文状态、摘要、规模及阅读链接正确，封面complete/naturalWidth正常，详情无横向溢出。
- 没有布局修改。首轮候选检查时尚无作者最终确认、push、CI或线上新版本验证。后续发布证据见下节。没有手机设备真人体验验证。

## 发布与线上验证

- 用户批准：2026-10-05 22:39的「上线」，未更改获准文案。
- `npm run build`标准生产构建成功，OG与SW完整生成。已有bundle大小警告，B站封面API412使用缓存，不阻断舞龙篇本地封面。
- `git push origin main`成功，`git ls-remote origin refs/heads/main`精确确认发布提交。
- CI：[Build and Deploy](https://github.com/tobenot/Epitaph/actions/runs/37326831826)，headSha与发布提交一致，build及deploy均success。
- HTTP回读：首页、精确详情、sitemap和sw均200。详情原始HTML摘要正确，sitemap含既有无末尾斜线的规范URL，SW预缓存实际新app资源。
- 线上JS：`/js/app.ea9d548a.js`，SHA-256 `54acbce8ca858a315176c08697926b992a19cc3712d5dea9827db8283bb4284f`。精确条目保留pride44032、原slug/series并为released，包含获准中英文摘要和规模，旧五方会战初稿摘要不再存在。CI产物app文件名与本地build不同，以实际线上模块字段和批准文案核验，不声称整包字节一致。
- 真实浏览器：最初普通首页导航短暂返回GitHub Unicorn错误页，不将其算作作品页面。下一次带发布查询参数打开正常，随后普通无查询参数首页也正常且展示卡片。
- 默认首页中英文卡片均已展示。点击舞龙篇卡片进入详情，页面过渡后中英文状态、摘要、规模、阅读按钮与精确链接均正确，主封面已加载。下方同系列懒加载封面未全部滚动测试。
- 阅读目标`https://tobenot.top/p/story-bb-dragon-dance/`HTTP200且标题为完成稿。
- 不扩大为GSC提交、公开分享卡片实发或真人手机验收。本次是既有作品状态修正，无新服务、其他作品改动或小说正文改动。

## 当前状态与下一步

发布与线上核验完成，无需用户操作。若用户旧标签页仍有草稿字样，可刷新或接受站内新版本提示。看板T-00207同步完成，具体事件回执保留在任务权威源。
