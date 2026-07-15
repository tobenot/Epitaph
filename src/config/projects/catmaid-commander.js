export default {
	id: "catmaid-commander",
	pride: 8192,
	slug: "catmaid-commander",
	category: "tool",
	status: "released",
	titleKey: {
		zh: "猫娘女仆指挥官"
	},
	descriptionKey: {
		zh: "majordomo（代号：指挥官）——旁观你手边一群原生 Claude Code 窗口的人设管家中枢。"
	},
	longDescriptionKey: {
		zh: "你手边同时开着 N 个原生 Claude Code 窗口在干活。majordomo 不驱动它们，而是站在旁边：每个窗口经 Bifrost 插件把工作报告推给中枢，中枢维护三张表（谁在做什么 / 全局待办 / 待验收），用人设口吻合成一句管家汇报，并在你离场时用 Bark 推手机。core daemon + 多前端，WebSocket 通信，可跑在无桌面服务器。"
	},
	date: { year: 2026, month: 6 },
	genres: ["工具", "自动化"],
	tags: ["基建", "开源"],
	links: [
		{ type: "github", url: "https://github.com/tobenot/majordomo", textKey: { zh: "GitHub 源码" } }
	]
};
