export default {
  id: 2,
  pride: 90,
  slug: "locust-hunter",
  category: "game",
  status: "released",
  experienceable: true,
  titleKey: {
    zh: "猎蝗人",
    en: "Locust Hunter"
  },
  image: require('@/assets/images/lh_header_schinese.webp'),
  descriptionKey: {
    zh: "第三人称关卡制清版太空射击游戏，敌人采用分部件破坏机制。2022年大二年级起开发，我与音乐师制作，外援建模。",
    en: "A third-person level-based space shooter with destructible enemy parts. Development started in sophomore year (2022), created with a musician and external modeling support."
  },
  date: { year: 2024, month: 10, day: 21 },
  genres: ["太空射击", "第三人称射击", "清版射击"],
  themes: ["太空战斗"],
  engine: "虚幻引擎 4.26",
  platform: ["PC"],
  scale: {
    zh: "全流程 2 小时",
    en: "2 hours full playthrough"
  },
  roles: {
    zh: "主创 (合作音乐/外援建模)",
    en: "Lead Creator (Co-op Music/Outsourced Modeling)"
  },
  achievements: [
    { zh: "上架 Steam 新品节", en: "Featured in Steam Next Fest" },
    { zh: "Steam 销量 9 份", en: "9 copies sold on Steam" }
  ],
  developerNotesKey: {
    zh: "大二个人作品。这一部里面强烈探索了【有什么素材就做什么】的概念，学会了利用素材做出统一的良好的视觉效果。打磨一年，用满了素材卖相好，自己也觉得挺好玩的，拿得出手。这里受挫之后看到弹幕互动游戏品类火起来了，就去追热点了，但没有抛弃手上的UE，硬是要拿UE去那个全是Unity的赛道。",
    en: "Sophomore personal project. Strongly explored the concept of 'making do with whatever assets are available', learning to use assets to create a unified and good visual effect. Polished for a year, used assets to the fullest for a good look, and I think it's quite fun and presentable. After feeling frustrated here and seeing the interactive bullet-hell genre getting popular, I went to chase the trend, but didn't abandon UE, stubbornly taking UE into a track dominated by Unity."
  },
  longDescriptionKey: {
    zh: "",
    en: ""
  },
  links: [
    { type: "steam", url: "https://store.steampowered.com/app/3008350/", textKey: { zh: "Steam 商店", en: "Steam Store" } },
    { type: "bilibili", url: "https://www.bilibili.com/video/BV1Ga411S7ge/", textKey: { zh: "实机演示视频", en: "Gameplay Demo" } }
  ]
};
