# 标签与技术栈分类系统维护指南 (Tags & Facets Maintenance)

本文档说明了 Epitaph 作品集中「标签系统」的设计逻辑，以及后续如何维护和增加新的标签与聚合分类。

## 1. 架构说明

系统采用**双轨制**设计：

- **自由标签 (Tags)**：位于 `src/config/projects/*.js` 的 `tags` 字段。只保留可筛选、可聚合的短词；玩法细节、设计说明写进 `descriptionKey` / `developerNotesKey`。
- **聚合分类 (Facets)**：位于 `src/config/tagFacets.js`。通过 `match` 规则把分散标签归拢为首页「技术栈」筛选按钮。
- **匹配逻辑**：位于 `src/utils/tagFacets.js`。`Home.vue` 与 `Project.vue` 共用，改规则只改这一处。

```
项目 tags → tagFacets.match 规则 → 首页 Facet 按钮
         → 搜索框全文匹配
         → 详情页 / 卡片点击跳转 ?facet= 或 ?tag=
```

---

## 2. 标签写法原则

**适合写进 tags 的：**

- 技术栈：`UE5`、`C++`、`LLM`、`VRChat`
- 可跨分类聚合的主题：`高考`、`弹幕互动`、`开源`
- 系列名：`不止于纸上`、`星铭世界`

**不适合写进 tags 的（写进描述即可）：**

- 玩法机制细节：如「组件化敌人」「分部件破坏」
- 过长的说明句
- 与 `category`、`status`、`series` 重复的信息
- 一次性事件细节：如 `GGJ 2019`、`2020广东`（年份可写在 `date` 或正文）

**示例：**

```javascript
// 不好
tags: ["吃素材", "组件化敌人分部件破坏以及影响行动"]

// 好：机制写进 descriptionKey，tags 留空或只留可筛选词
descriptionKey: {
  zh: "…敌人采用分部件破坏机制。…"
}
// tags 字段可省略
```

---

## 3. 如何维护聚合分类 (Facets)

修改 `src/config/tagFacets.js`：

```javascript
export default [
  {
    id: 'llm',        // URL: /?facet=llm
    label: 'LLM',     // 首页按钮文字
    match: ['LLM', 'Deepseek', 'AI大世界']
  }
]
```

### match 规则

- 双向包含：`tag.includes(rule) || rule.includes(tag)`
- `LLM` 可匹配 `LLM客户端`；`AI大世界` 可匹配 `AI大世界范式Ⅰ`
- 计数为 0 的 Facet 在首页自动隐藏

### 当前 Facet 列表

| id | label | 主要 match |
|----|-------|-----------|
| llm | LLM | LLM, Deepseek, AI大世界 |
| vrchat | VRChat | VRChat |
| ue5 | UE5 | UE5 |
| cpp | C++ | C++ |
| gamejam | Game Jam | Game Jam |
| story | 世界观 | 世界观核心, 世界观 |
| gaokao | 高考 | 高考 |
| tool | 自用工具 | 自用工具 |
| danmaku | 弹幕互动 | 弹幕互动 |
| ai-anim | AI动画 | AI动画 |
| opensource | 开源 | 开源 |
| multiplayer | 联机 | 联机, 网络联机 |
| beyond-books | 不止于纸上 | 不止于纸上, 星铭世界 |
| visual-novel | 视觉小说 | 视觉小说 |

---

## 4. 工具函数 (src/utils/tagFacets.js)

| 函数 | 用途 |
|------|------|
| `tagMatchesFacet(tag, facet)` | 单个标签是否命中 Facet |
| `projectMatchesFacet(project, facet)` | 项目是否属于某 Facet |
| `resolveTagFilter(tag, facets)` | 点击标签时决定跳 `?facet=` 还是 `?tag=` |
| `buildFacetCounts(projects, facets)` | 首页 Facet 计数 |
| `prioritizeTagsForDisplay(project, facets, activeFacetId)` | 卡片优先展示 Facet 相关标签 |

---

## 5. 搜索逻辑

搜索框匹配：

1. `titleKey` / `descriptionKey`
2. `tags`
3. `engine`
4. `genres` / `themes`

标签精简后，机制类关键词仍可通过描述被搜到。

---

## 6. 新增作品 checklist

1. 在 `src/config/projects/` 新建配置文件
2. `tags` 只写 0–3 个短词；细节放描述
3. 若需要新 Facet，改 `tagFacets.js` 的 `match`，不必改 `utils`
4. 本地打开首页，确认对应 Facet 计数 +1
