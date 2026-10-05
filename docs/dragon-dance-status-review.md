# 舞龙篇默认展示修正

## 当前入口与目标

- 来源：WebUI `40e2b9dd4d74`，用户2026-10-05 22:29要求把舞龙篇加入 `https://e.tobenot.top/`。
- 任务权威：看板 T-00207，项目 beyond-books。
- 候选分支：`content/dragon-dance-completed-20261005`。未推送、未发布。
- 最小结果：让既有舞龙篇条目出现在默认「完成度高」列表，并清除过时的初稿标记。
- 保护范围：小说原文、现有封面、pride排序、日期、开发者手记、系列、其他作品不变。不开新服务或预览公网入口。

## Roadmap

1. 已核实公开博客完成稿、既有配置及线上详情。
2. 已完成单配置文件修正、生产构建与本地浏览器首页及中英文详情检查。
3. 等作者确认以下完整改动字段，随后提交到main并经既有Pages部署，回读CI和精确线上资源，执行线上首页→详情→阅读入口验证。

## 因果与事实

- 首轮页面提取未列出舞龙篇，曾暂误判不存在。随后精确配置与详情页面证实条目一直存在。
- 初始生产状态是 `concept`，UI显示「草稿 / Draft」。`src/utils/portfolio.js`仅把released/archived默认归入完成度高，因此该条目被默认筛选隐藏。
- 博客 `https://tobenot.top/p/story-bb-dragon-dance/` 返回HTTP200，标题为「不止于纸上的故事：舞龙篇（完成稿）」，正文也标「完成稿」。仅抽读前言和开篇，没有全书精读。
- 原有五方会战与力量选择介绍保留，仅替换初稿状态，不新增剧情或字数。

## 完整待批准改动

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
- 没有布局修改。本轮没有手机设备体验验证、作者最终确认、push、CI或线上新版本验证。

## 下一步

作者确认以上精确候选后，由Hermes按既有流程发布与核验。未获确认前保留本地候选，不触发部署。
