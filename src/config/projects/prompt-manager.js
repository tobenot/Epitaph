export default {
  id: 19,
  pride: 5,
  slug: "prompt-manager",
  category: "tool",
  status: "released",
  experienceable: true,
  titleKey: {
    zh: "提示词管理器",
    en: "Prompt Manager"
  },
  image: require('@/assets/images/prompt_manager.webp'),
  descriptionKey: {
    zh: "一个轻量级的浏览器端提示词管理工具，帮助用户创建、编辑、分类和导出提示词模板。数据存储在浏览器本地，无需后端服务器。",
    en: "A lightweight browser-side prompt management tool that helps users create, edit, categorize and export prompt templates. Data is stored locally in the browser without the need for a backend server."
  },
  date: { year: 2025, month: 3 },
  genres: ["AI工具", "效率工具"],
  themes: ["提示词", "本地存储"],
  engine: "Web",
  platform: ["Web"],
  tags: ["自用工具"],
  longDescriptionKey: {
    zh: "",
    en: ""
  },
  links: [
    { type: "web", url: "https://tobenot.top/prompt-manager/", textKey: { zh: "在线使用", en: "Use Online" } }
  ]
};
