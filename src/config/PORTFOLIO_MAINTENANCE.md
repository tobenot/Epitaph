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

### 心灵世界（上架但不推荐，完成度低）

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

---

## 6. 与详情页、卡片样式的关系

- 角标「可体验」、卡片高亮边框：由 `isHighCompleteness()` 决定，规则与「完成度高」筛选相同。
- 详情页 `status` 徽章：仍显示 config 里的原始 `status` 文案（已归档、开发中等），与筛选分类独立。

---

## 7. 新增 / 修改作品 checklist

1. 写 `status`（必填，详情页展示用）
2. 课程作业 → 加 `portfolioKind: "study"`
3. status 和实际完成度不一致 → 加 `completeness`
4. 打开首页，切换三个按钮，确认归类符合预期

---

## 8. 代码位置

| 文件 | 作用 |
|------|------|
| `src/utils/portfolio.js` | 归类逻辑 |
| `src/views/Home.vue` | 三个按钮 UI、列表过滤 |
| `src/i18n/locales/zh.js` | 按钮文案（`common.filter.portfolioKinds`） |

改规则只动 `portfolio.js`；改按钮文字只动 i18n。
