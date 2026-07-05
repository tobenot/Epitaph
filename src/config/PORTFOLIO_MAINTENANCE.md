# 作品类型筛选维护指南 (Portfolio Filter)

首页「作品类型」三个按钮（完成度高 / 习作 / 进行中）如何归类，由项目 config 里的字段决定。逻辑在 `src/utils/portfolio.js`。

---

## 1. 三个按钮是什么

| 按钮 | 内部 id | 默认 |
|------|---------|------|
| 完成度高 | `complete` | 开 |
| 习作 | `study` | 关 |
| 进行中 | `ongoing` | 关 |

可多选。至少保留一个按钮为开。

---

## 2. 归类顺序（优先级从高到低）

```
1. portfolioKind === 'study'  → 习作
2. 满足「完成度高」条件        → 完成度高
3. 其余                       → 进行中
```

习作优先于完成度高。课程作业即使 `status: released`，也在习作里。

---

## 3. 相关字段

### `portfolioKind`（可选）

| 值 | 含义 |
|----|------|
| `study` | 课程作业、练习性质条目 |

只写需要归进「习作」的项目。

### `completeness`（可选，覆盖 status 的默认推断）

| 值 | 效果 |
|----|------|
| `high` / `complete` | 强制归入「完成度高」 |
| `partial` / `low` | 强制不归入「完成度高」（落入「进行中」） |
| 不写 | 看 `status` |

用于 status 和实际完成度不一致时手动纠正。

### `status`（多数项目已有）

未写 `completeness` 时：

| status | 默认归入 |
|--------|----------|
| `released` | 完成度高 |
| `archived` | 完成度高 |
| `development` / `halted` / `concept` / 其他 | 进行中 |

`archived` 表示「做完搁起来」，默认算完成度高（如星辉落 demo、归档游戏）。

---

## 4. 判断流程

```
portfolioKind === 'study'?
  是 → 习作
  否 → completeness 是 partial 或 low?
         是 → 进行中
         否 → completeness 是 high 或 complete?
                是 → 完成度高
                否 → status 是 released 或 archived?
                       是 → 完成度高
                       否 → 进行中
```

---

## 5. 示例

### 星辉落（归档但有 demo，完成度高）

```javascript
status: "archived"
// 无 completeness、无 portfolioKind
// → 完成度高
```

### 心界（上架但不推荐，完成度低）

```javascript
completeness: "partial",
status: "released"
// → 进行中（completeness 优先）
```

### C++ 课程作业

```javascript
portfolioKind: "study",
status: "released"
// → 习作
```

### 开发中的小说

```javascript
status: "development"
// → 进行中
```

### 归档但不想进「完成度高」

```javascript
status: "archived",
completeness: "low"
// → 进行中
```

### 做完但暂不可体验（璀璨群星）

```javascript
status: "archived",
experienceable: false
// → 完成度高，页脚无「可体验」
```

### 开发中但可体验（不止于纸上跑团）

```javascript
status: "development",
experienceable: true
// → 进行中，页脚「可体验」
```

---

## 6. 与详情页、卡片样式的关系

三个维度彼此独立：

| 维度 | 字段 / 函数 | 作用 |
|------|-------------|------|
| 完成度高筛选 | `isHighCompleteness()` | 首页「完成度高」按钮、卡片 accent 左边框 |
| 可体验注脚 | `experienceable` + `isExperienceable()` | 卡片页脚「· 可体验」，不遮挡头图 |
| 习作装帧 | `portfolioKind: "study"` | 褐灰色左边框、浅底色、页脚「习作」 |

- **完成度高 ≠ 可体验**。例：璀璨群星做完但入口失效 → `experienceable: false`；不止于纸上跑团仍在开发 → `experienceable: true`。
- **可体验**须手写 `experienceable: true`；不写则默认无注脚。明确不可体验时写 `experienceable: false`（详情页会显示「暂不可体验」）。
- 习作卡片不用 accent 色条，改用褐灰装帧，与完成作品区分。
- 详情页 metadata：写了 `experienceable` 时显示体验入口；`status` 仍显示原始状态文案。

### `experienceable`（可选）

| 值 | 效果 |
|----|------|
| `true` | 页脚注脚「可体验」 |
| `false` | 无注脚；详情页显示「暂不可体验」 |
| 不写 | 无注脚；详情页不显示体验入口行 |

---

## 7. 新增 / 修改作品 checklist

1. 写 `status`（必填，详情页展示用）
2. 课程作业 → 加 `portfolioKind: "study"`
3. status 和实际完成度不一致 → 加 `completeness`
4. 有可用体验入口（游玩 / 阅读 / 观看等）→ 加 `experienceable: true`；做完但入口失效 → `experienceable: false`
5. 演示 PV、无实际入口的习作等 → 不写，保持无注脚
6. 打开首页，切换三个按钮，确认归类符合预期

---

## 8. 代码位置

| 文件 | 作用 |
|------|------|
| `src/utils/portfolio.js` | 归类逻辑、`isExperienceable()` |
| `src/views/Home.vue` | 三个按钮 UI、列表过滤、页脚注脚 |
| `src/i18n/locales/zh.js` | 按钮文案（`common.filter.portfolioKinds`） |

改规则只动 `portfolio.js`；改按钮文字只动 i18n。
