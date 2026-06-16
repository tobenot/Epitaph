export default {
  id: 4,
  pride: 75,
  slug: "night-silent-killer",
  category: "game",
  status: "released",
  experienceable: true,
  titleKey: {
    zh: "夜酱：沉默杀手",
    en: "Night: Silent Killer"
  },
  image: require('@/assets/images/nbsk_header.webp'),
  descriptionKey: {
    zh: "第三人称动作游戏，大一下学期开发，我与音乐师制作，外援建模。",
    en: "A third-person action game, developed during freshman spring semester with a musician and external modeling support."
  },
  date: { year: 2021, month: 7, day: 8 },
  genres: ["动作", "第三人称"],
  themes: ["冲蝗行动"],
  engine: "虚幻引擎 4.26",
  platform: ["PC"],
  scale: {
    zh: "全流程 2.5 小时",
    en: "2.5 hours full playthrough"
  },
  roles: {
    zh: "主创 (合作音乐/外援建模)",
    en: "Lead Creator (Co-op Music/Outsourced Modeling)"
  },
  achievements: [
    { zh: "Steam 销量 264 份", en: "264 copies sold on Steam" },
    { zh: "贡献了主要的销售额", en: "Contributed the main sales revenue" }
  ],
  developerNotesKey: {
    zh: "大一下的作品。受某一现实事件启发，采用隐喻叙事。很多人购买支持，但实际游玩较少。玩法偏实验性，部分玩家不熟悉这类设计。售价4刀，销量264份。中位游玩时长16分钟。全游戏流程2个半小时。贡献了主要的销售额，全部Steam游戏加起来销售额$753。",
    en: "Freshman project. Inspired by a real-world event, using metaphorical storytelling. Many bought it to show support but played little. Experimental in design; some players were unfamiliar with the approach. Priced at $4, sold 264 copies. Median playtime 16 minutes. Full playthrough about 2.5 hours. Contributed the main sales revenue out of the $753 total Steam revenue."
  },
  longDescriptionKey: {
    zh: "",
    en: ""
  },
  links: [
    { type: "steam", url: "https://store.steampowered.com/app/1494180/Night_Silent_Killer/", textKey: { zh: "Steam 商店", en: "Steam Store" } },
    { type: "bilibili", url: "https://www.bilibili.com/video/BV1vV411W7c6/", textKey: { zh: "首发宣传片", en: "Launch Trailer" } },
    { type: "bilibili", url: "https://www.bilibili.com/video/BV1xr4y1T7xX/", textKey: { zh: "先遣宣传片", en: "Pre-launch Trailer" } }
  ]
};
