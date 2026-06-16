export default {
	id: 24,
	pride: 86,
	slug: "online-image-generation",
	category: "tool",
  status: "released",
  experienceable: true,
	titleKey: {
		zh: "在线图片生成",
		en: "Online Image Generation"
	},
	image: require('@/assets/images/online_image_gen.webp'),
	descriptionKey: {
		zh: "兼容 OpenAI API 的在线生图工具，用于想使用前沿生图模型来生成几张图的需求。",
		en: "OpenAI API-compatible online image generation tool for generating a few images with cutting-edge models."
	},
	date: { year: 2026, month: 6 },
	genres: ["AI工具", "工具"],
	themes: ["生图", "OpenAI API"],
	engine: "Web",
	platform: ["Web"],
	tags: ["自用工具"],
	longDescriptionKey: {
		zh: "",
		en: ""
	},
	links: [
		{ type: "web", url: "https://image.tobenot.top/", textKey: { zh: "在线使用", en: "Use Online" } }
	]
};
