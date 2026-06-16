# 喜好度排序维护指南 (pride)

首页「按本人喜好度」排序，以及 `projectsConfig.js` 的默认顺序，都由各项目 config 里的 `pride` 字段决定。数值越大越靠前。

---

## 1. 字段位置

每个 `src/config/projects/**/*.js` 顶部：

```js
export default {
  id: "example-project",
  pride: 49152,
  // ...
}
```

`id` 与文件名（不含 `.js`）一致，脚本命令用这个 id。

---

## 2. 编号规则

| 项 | 值 |
|----|-----|
| 步长 | `1024`（`2^10`） |
| 全量编号 | 第 1 名 = `项目数 × 1024`，每名递减 `1024` |
| 插入 | `(上邻 pride + 下邻 pride) >> 1` |
| 并列 | `pride` 相同时按 `id` 字母序 |

步长取 2 的幂，多次中点插入时尽量保持整数；同一缝隙插满（两邻相差 1）后需全量重编号。

---

## 3. 脚本

维护脚本：`scripts/pride-sort.js`

```bash
# 按当前顺序，用步长 1024 重新编号（会改全部项目）
npm run pride-sort -- renumber

# 把 item 移到 anchor 正后方（通常只改 1 个文件）
npm run pride-sort -- move-after <item-id> <anchor-id>

# 一组项目依次紧跟 anchor 后
npm run pride-sort -- move-group-after <anchor-id> <item-id> [item-id...]

# 查看当前前 N 名
npm run pride-sort -- top 20
```

示例：

```bash
npm run pride-sort -- move-after gaokao-comeback-story book-of-betrayal
npm run pride-sort -- move-group-after playground-tower-space-elevator vrc-became-eku gaokao-aftermath
```

---

## 4. 比较式改序怎么读

「A 移动到 B 后面」= 在【全部】列表里，A 紧跟在 B 下方。

对应命令：`move-after A的id B的id`

「A 带着 B 一起移动到 C 后面」= `move-group-after C的id A的id B的id`（A 贴 C，B 贴 A）

---

## 5. 何时手动改 pride

- 日常改序：用脚本，不要手填数字
- 全量重编号：缝隙用尽、或大批量调整后
- 改步长：编辑 `scripts/pride-sort.js` 里的 `PRIDE_STEP`，再执行 `renumber`

---

## 6. 相关代码

| 文件 | 作用 |
|------|------|
| `scripts/pride-sort.js` | 编号与移动 |
| `src/config/projectsConfig.js` | 加载后按 `pride` 降序 |
| `src/views/Home.vue` | 首页「按本人喜好度」排序 |

`pride` 不在页面上显示，只参与排序。
