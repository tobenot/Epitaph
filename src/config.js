export default {
  siteTitle: "Epitaph | 墓志铭 - tobenot的作品与思想集",
  navItems: [
    { name: "首页", path: "/" },
    { name: "绘画", path: "/paintings" },
    { name: "摄影", path: "/photographs" },
    { name: "留声", path: "/sounds" },
    { name: "关于我", path: "/about" },
    { name: "体验指南", path: "/experience" }
  ],
  projects: [
    {
      id: 12,
      titleKey: {
        zh: "不止于纸上的故事",
        en: "Beyond Books"
      },
      image: require('@/assets/images/bbw.png'),
      descriptionKey: {
        zh: "大模型跑团游戏，网页端。",
        en: "LLM-powered TRPG game, web-based."
      },
      date: { year: 2024, month: 4 },
      link: "https://tobenot.itch.io/beyond-books"
    },
    {
      id: 11,
      titleKey: {
        zh: "不止于纸上的故事：鸿律篇",
        en: "Beyond Books: RULES"
      },
      image: require('@/assets/images/bbr_title.png'),
      descriptionKey: {
        zh: "已经完成的作为礼物的小说，已经借助AI动画化了。",
        en: "A completed novel created as a gift, already animated with AI."
      },
      date: { year: 2023, month: 2 },
      link: "https://www.bilibili.com/video/BV1xPFNe1E8T/"
    },
    {
      id: 2,
      titleKey: {
        zh: "猎蝗人",
        en: "Locust Hunter"
      },
      image: require('@/assets/images/lh_header_schinese.jpg'),
      descriptionKey: {
        zh: "第三人称关卡制清版太空射击游戏。大二的作品，我与音乐师制作，外援建模。",
        en: "A third-person level-based space shooter. Sophomore year project, created with a musician and external modeling support."
      },
      date: { year: 2022, month: 4 },
      link: "https://store.steampowered.com/app/3008350/"
    },
    {
      id: 18,
      titleKey: {
        zh: "与AI的睡前故事",
        en: "Bedtime Stories with AI"
      },
      image: require('@/assets/images/bedtime_stories.png'),
      descriptionKey: {
        zh: "一个适合小说作者/剧本/人机恋爱好者的deepseek大模型客户端",
        en: "A Deepseek LLM client for novel writers, screenplay authors, and human-AI relationship enthusiasts"
      },
      date: { year: 2025, month: 2 },
      link: "https://tobenot.top/Bedtime-Stories-with-AI/"
    },
    {
      id: 4,
      titleKey: {
        zh: "夜酱：沉默杀手",
        en: "Night: Silent Killer"
      },
      image: require('@/assets/images/nbsk_header.jpg'),
      descriptionKey: {
        zh: "第三人称动作游戏，大一下的作品，我与音乐师制作，外援建模。",
        en: "A third-person action game, created in freshman year with a musician and external modeling support."
      },
      date: { year: 2021, month: 4 },
      link: "https://store.steampowered.com/app/1494180/Night_Silent_Killer/"
    },
    {
      id: 8,
      titleKey: {
        zh: "璀璨群星",
        en: "Brilliant Stars"
      },
      image: require('@/assets/images/BS.png'),
      descriptionKey: {
        zh: "一款类群星弹幕互动游戏。拿了B站的最佳弹幕游戏第二名。目前不可玩。",
        en: "A Stellaris-like interactive bullet comment game. Won second place for Best Bullet Comment Game on Bilibili. Currently not playable."
      },
      date: { year: 2022, month: 2 },
      link: "https://www.bilibili.com/video/BV1c5411D7Qb/"
    },
    {
      id: 3,
      titleKey: {
        zh: "极北之星",
        en: "North Stars"
      },
      image: require('@/assets/images/ns_header.jpg'),
      descriptionKey: {
        zh: "处女作。2018年高二的作品，与几个同学们一起制作。全是策划。2015年开始断断续续做。",
        en: "Debut work. Created in 2018 during high school with several classmates. All planning. Started in 2015 and continued intermittently."
      },
      date: { year: 2015, month: 2 },
      link: "https://store.steampowered.com/app/843050/North_Stars/"
    },
    {
      id: 7,
      titleKey: {
        zh: "文明史诗",
        en: "Civilization Epic"
      },
      image: require('@/assets/images/civ.png'),
      descriptionKey: {
        zh: "一款弹幕互动联机的AI图文文明发展演化游戏。",
        en: "An AI-powered civilization development game with interactive bullet comments."
      },
      date: { year: 2024, month: 10 },
      link: "https://play-live.bilibili.com/details/1729301917890"
    },
    {
      id: 14,
      titleKey: {
        zh: "UE5大模型游戏插件",
        en: "UE5 LLM Game Plugin"
      },
      image: require('@/assets/images/co_plugin.png'),
      descriptionKey: {
        zh: "毕设用的，其实啥游戏都可以用。后续有个大项目就还想用。",
        en: "Used for graduation project, applicable to any game. Planned for use in a future major project."
      },
      date: { year: 2023, month: 12 },
      link: "https://github.com/tobenot/TobenotLLMGameplay"
    },
    {
      id: 17,
      titleKey: {
        zh: "万象魔法学院（OMA)",
        en: "Omnivista Magic Academy（OMA)"
      },
      image: require('@/assets/images/magic_academy.png'),
      descriptionKey: {
        zh: "AI原生开放世界mud《万象魔法学院》 ✨ 魔法校园冒险世界 × Deepseek🐬 NPC动态叙事实时CG × 无限人生模拟 × 种田钓鱼采集探宝 🔮与挚友书写魔法奇旅！",
        en: "AI-native open-world MUD 'Omnivista Magic Academy' ✨ Magical campus adventure world × Deepseek🐬 NPC dynamic narrative real-time CG × Infinite life simulation × Farming, fishing, gathering, treasure hunting 🔮Write magical adventures with friends!"
      },
      date: { year: 2025, month: 1 },
      link: "http://xhslink.com/a/eKWmczIAd6e5"
    },
    {
      id: 20,
      titleKey: {
        zh: "旅路罗盘",
        en: "Travel Compass"
      },
      image: require('@/assets/images/travel_compass.png'),
      descriptionKey: {
        zh: "个人导航站。一个纯静态、预设导航链接的导航站。",
        en: "Personal navigation site. A purely static navigation site with preset navigation links."
      },
      date: { year: 2025, month: 2 },
      link: "https://tobenot.top/travel-compass/"
    },
    {
      id: 9,
      titleKey: {
        zh: "舰队激斗",
        en: "Fleet Battle"
      },
      image: require('@/assets/images/fb.png'),
      descriptionKey: {
        zh: "一款召唤战舰对战的弹幕互动游戏。赚了4k和五个舰长。目前不可玩。",
        en: "A bullet comment interactive game featuring battleship summoning combat. Earned 4k and five captains. Currently not playable."
      },
      date: { year: 2022, month: 4 },
      link: "https://www.bilibili.com/video/BV1k34y1e7Ew/"
    },
    {
      id: 1,
      titleKey: {
        zh: "作家之屋",
        en: "Sanctuary Of Writers"
      },
      image: require('@/assets/images/teacat.webp'),
      descriptionKey: {
        zh: "博客，【成为人类】事件的主要促进者。",
        en: "Blog, the main promoter of the 'Becoming Human' event."
      },
      date: { year: 2023, month: 11 },
      link: "https://tobenot.top/"
    },
    {
      id: 21,
      titleKey: {
        zh: "时间拳",
        en: "Tempus Pugnus"
      },
      image: require('@/assets/images/tempus_pugnus.png'),
      descriptionKey: {
        zh: "灵感来自\"共鸣之武器\"的极简时间管理工具，具有浮动窗口界面。为任务设置时间限制，跟踪进度并获取提醒 - 帮助您保持专注和高效。",
        en: "Inspired by 'Resonant Weapons', a minimalist time management tool with floating window interface. Set time limits for tasks, track progress, and get reminders - helping you stay focused and productive."
      },
      date: { year: 2025, month: 1 },
      link: "https://github.com/tobenot/TempusPugnus"
    },
    {
      id: 6,
      titleKey: {
        zh: "挑战之旅",
        en: "Challenger's Odyssey"
      },
      image: require('@/assets/images/co_header.png'),
      descriptionKey: {
        zh: "毕设，ARPG+大模型AI游戏，单人制作。不推荐游玩。",
        en: "Graduation project, ARPG + LLM AI game, solo production. Not recommended for play."
      },
      date: { year: 2024, month: 5 },
      link: "https://store.steampowered.com/app/2778690/Challengers_Odyssey/"
    },
    {
      id: 10,
      titleKey: {
        zh: "操场·高楼·太空电梯",
        en: "Playground, Tower, Space Elevator"
      },
      image: require('@/assets/images/playground.webp'),
      descriptionKey: {
        zh: "小说。《不止于纸上的故事》中的一个短篇。",
        en: "Novel. A short story from 'Beyond Books'."
      },
      date: { year: 2021, month: 6 },
      link: "https://www.bilibili.com/read/cv11529157/"
    },
    {
      id: 13,
      titleKey: {
        zh: "在线语音合成",
        en: "Online Text-to-Speech"
      },
      image: require('@/assets/images/tts.png'),
      descriptionKey: {
        zh: "在线语音合成，基于微软Edge。",
        en: "Online text-to-speech synthesis based on Microsoft Edge."
      },
      date: { year: 2024, month: 10 },
      link: "https://tobenot.top/simple-tts-js/"
    },
    {
      id: 15,
      titleKey: {
        zh: "不止于纸上的故事：幻灭篇",
        en: "Beyond Books: Disillusionment"
      },
      image: require('@/assets/images/bbd.png'),
      descriptionKey: {
        zh: "本来想做严肃游戏，讲高中学习方法和心界起源的，但是我还不如直接跟你讲。",
        en: "Originally intended as a serious game about high school study methods and the origin of 'Heart World', but I'd rather just tell you directly."
      },
      date: { year: 2024, month: 7 },
      link: "https://tobenot.top/Beyond-Books-Disillusionment/"
    },
    {
      id: 19,
      titleKey: {
        zh: "提示词管理器",
        en: "Prompt Manager"
      },
      image: require('@/assets/images/prompt_manager.png'),
      descriptionKey: {
        zh: "一个轻量级的浏览器端提示词管理工具，帮助用户创建、编辑、分类和导出提示词模板。数据存储在浏览器本地，无需后端服务器。",
        en: "A lightweight browser-side prompt management tool that helps users create, edit, categorize and export prompt templates. Data is stored locally in the browser without the need for a backend server."
      },
      date: { year: 2025, month: 3 },
      link: "https://tobenot.top/prompt-manager/"
    },
    {
      id: 5,
      titleKey: {
        zh: "心灵世界",
        en: "Heart World"
      },
      image: require('@/assets/images/hw_header_schinese.jpg'),
      descriptionKey: {
        zh: "第一人称砍杀游戏，高考后寒假和大一上的作品。本来想做成代表作，结果效果并不好，很希望能重制。不推荐游玩。",
        en: "First-person hack and slash game, created after college entrance exam and in freshman year. Intended as a masterpiece but didn't turn out well. Hope to remake it. Not recommended for play."
      },
      date: { year: 2020, month: 8 },
      link: "https://store.steampowered.com/app/1415580/Heart_World/"
    },
    {
      id: 16,
      titleKey: {
        zh: "智能荣光",
        en: "Intelligent Glory"
      },
      image: require('@/assets/images/ig.png'),
      descriptionKey: {
        zh: "对战的弹幕互动游戏，因为觉得UE5那个水体插件很好看就做了。目前不可玩。",
        en: "A PvP bullet comment interactive game, created because I liked the UE5 water plugin. Currently not playable."
      },
      date: { year: 2022, month: 5 },
      link: "https://www.bilibili.com/video/BV1o34y1h7Pu/"
    }
  ],
  galleries: [
    {
      id: "paintings",
      titleKey: {
        zh: "绘画作品",
        en: "Paintings"
      },
      descriptionKey: {
        zh: "这里存放我的绘画创作。",
        en: "A collection of my paintings."
      },
      items: [
        {
          id: "p1",
          titleKey: { zh: "《回归》", en: "'Return'" },
          image: require('@/assets/images/paintings/DRAW_20241022_return.png'),
          descriptionKey: { zh: "2024年生日绘，致敬心灵杀手2。", en: "2024 Birthday Drawing, Tribute to Alan Wake 2." },
          date: { year: 2024 },
          medium: { zh: "数字绘画", en: "Digital Painting"}
        },
      ]
    },
    {
      id: "photographs",
      titleKey: {
        zh: "摄影作品",
        en: "Photographs"
      },
      descriptionKey: {
        zh: "捕捉生活中的光影瞬间。",
        en: "Capturing moments of light and shadow."
      },
      items: [
        {
          id: "ph1",
          titleKey: { zh: "街景", en: "Street View" },
          image: require('@/assets/images/photos/IMG_20240817_205326_Tencent.webp'),
          descriptionKey: { zh: "腾讯滨海大厦", en: "Tencent Binhai Tower" },
          date: { year: 2024, month: 8 },
          location: { zh: "深圳", en: "Shenzhen"}
        },
      ]
    }
  ],
  sounds: [
    {
      id: "s1",
      titleKey: { zh: "高望看客", en: "High-Rise Observer" },
      audioFile: require('@/assets/audio/high-rise_observer.mp3'),
      descriptionKey: { zh: "情感比较激烈的后摇", en: "Emotional post-rock" },
      genre: { zh: "后摇", en: "Post-rock"},
      date: { year: 2024, month: 1 },
      lyricsKey: {
         zh: "（无歌词）",
         en: "(No lyrics)"
      }
    },
  ],
  about: {
    contentKey: {
      zh: "看这里不如看博客？",
      en: "Better check out the blog than here?"
    },
    personalWorks: [
    ]
  },
  experience: {
    introKey: {
      zh: "欢迎来到我的作品体验指南。这里我为您精心安排了一系列作品的体验顺序，帮助您更深入地了解我的创作历程和思想演变。每一步都包含详细的说明，引导您获得最佳的体验效果。",
      en: "Welcome to my works experience guide. Here I have carefully arranged a series of works in a specific order to help you better understand my creative journey and the evolution of my thoughts. Each step includes detailed instructions to guide you towards the best experience."
    },
    conclusionKey: {
      zh: "感谢您花时间体验我的作品。希望这段旅程能让您感受到我的创作理念和思想变化。如果您有任何想法或反馈，欢迎随时与我分享。",
      en: "Thank you for taking the time to experience my works. I hope this journey has given you insight into my creative philosophy and thought evolution. If you have any thoughts or feedback, please feel free to share them with me."
    },
    steps: [
      {
        titleKey: {
          zh: "《作家之屋》博客",
          en: "Sanctuary Of Writers Blog"
        },
        image: require('@/assets/images/teacat.webp'),
        descriptionKey: {
          zh: "这是了解我的思想和最新动态的最佳起点。在这里，我分享日常、哲学、创作相关的思考。",
          en: "This is the best starting point to understand my thoughts and latest updates. Here, I share my thoughts on daily life, philosophy, and creation."
        },
        instructionsKey: {
          zh: [
            "先浏览首页",
            "查看\"作者\"页面，查看我的个人介绍",
            "探索\"手稿\"分类下的文章，挑选感兴趣的文章阅读"
          ],
          en: [
            "First browse the homepage",
            "Check the 'Author' page to see my personal introduction",
            "Explore articles under the 'Manuscripts' category, pick the ones you're interested in"
          ]
        },
        duration: "20-40min",
        link: "https://tobenot.top/"
      },
      {
        titleKey: {
          zh: "《不止于纸上的故事》",
          en: "Beyond Books"
        },
        image: require('@/assets/images/bbw.png'),
        descriptionKey: {
          zh: "这是我最爱的作品，融合了AI大模型与传统角色扮演游戏(TRPG)的创新尝试。作品花了许多时间打磨细节，包括UI细节、剧本细节、游戏机制细节、音乐细节、美术细节等。是细糠！",
          en: "This is my favorite work, an innovative attempt combining AI large language models with traditional tabletop role-playing games (TRPG). The work spent a lot of time polishing details, including UI details, script details, game mechanics details, music details, and art details. It's a masterpiece!"
        },
        instructionsKey: {
          zh: [
            "先阅读游戏介绍，了解基本玩法",
            "点击\"Run Game\"按钮，体验AI主持人和NPC与你的互动",
            "尝试沉浸式地体验剧本",
            "尝试对同一个关卡的不同通关方式"
          ],
          en: [
            "First read the game introduction to understand the basic gameplay",
            "Click the \"Run Game\" button to experience how AI acts as a game master to interact with you",
            "Try to immerse yourself in the script",
            "Try different ways to pass the same level"
          ]
        },
        duration: "2-3h",
        link: "https://tobenot.itch.io/beyond-books"
      },
      {
        titleKey: {
          zh: "《猎蝗人》",
          en: "Locust Hunter"
        },
        image: require('@/assets/images/lh_header_schinese.jpg'),
        descriptionKey: {
          zh: "这款太空射击游戏代表了我在传统游戏开发领域的能力，展示了我对游戏设计和美学的理解。包括无UI设计，以及对游戏机制、BOSS设计、音乐、美术的思考。它是基于传统品类设计的，没有像其他项目那样完全创新玩法，因此它非常好玩！",
          en: "This space shooter represents my capabilities in traditional game development, showcasing my understanding of game design and aesthetics. Including no UI design, and my thoughts on game mechanics, boss design, music, and art. It is designed based on traditional genres and does not completely innovate gameplay like other projects, making it very enjoyable!"
        },
        instructionsKey: {
          zh: [
            "安装游戏（Steam平台），购买或游玩试玩版",
            "完成游戏的3个关卡，击败2个BOSS",
            "尝试不同的武器和战术组合",
            "注意游戏中的故事叙述和细节设计（敌方飞船的动态）"
          ],
          en: [
            "Install the game (Steam platform), purchase or play the demo",
            "Complete the 3 levels of the game, defeat 2 bosses",
            "Try different weapon and tactics combinations",
            "Pay attention to the storytelling and details design (dynamic enemy spaceships)"
          ]
        },
        duration: "2-3h",
        link: "https://store.steampowered.com/app/3008350/"
      },
      {
          titleKey: {
            zh: "《夜酱：沉默杀手》",
          en: "Night: Silent Killer"
        },
        image: require('@/assets/images/nbsk_header.jpg'),
        descriptionKey: {
          zh: "这是一款第三人称动作游戏，展示了我对游戏设计和叙事的理解。游戏以真实事件为背景，写出了抽象的剧情，精心设计了动作手感和场景布置，展现了独特的游戏风格和氛围营造。",
          en: "This is a third-person action game that showcases my understanding of game design and storytelling. The game is based on real events, writes abstract stories, carefully designs the action feel and scene layout, and demonstrates a unique game style and atmosphere creation."
        },
        instructionsKey: {
          zh: [
            "安装游戏（Steam平台）",
            "体验游戏的战斗系统和变身机制",
            "关注游戏中的叙事元素",
            "尝试不同的剧情立场"
          ],
          en: [
            "Install the game (Steam platform)",
            "Experience the combat system and transformation mechanism",
            "Pay attention to the narrative elements",
            "Try different story perspectives"
          ]
        },
        duration: "2h",
        link: "https://store.steampowered.com/app/1494180/Night_Silent_Killer/"
      },
      {
        titleKey: {
          zh: "《万象魔法学院》(OMA)",
          en: "Omnivista Magic Academy (OMA)"
        },
        image: require('@/assets/images/magic_academy.png'),
        descriptionKey: {
          zh: "【这个游戏还在开发中，现在还不能游玩，希望能尽快写在这里】这是我对AI与游戏结合的最新探索，融合了MUD文本游戏传统与现代AI技术，创造沉浸式魔法学院体验。",
          en: "【This game is still under development, and is not playable yet. I hope to write about it soon.】This is my latest exploration of combining AI with games, merging MUD text game traditions with modern AI technology to create an immersive magic academy experience."
        },
        instructionsKey: {
          zh: [
            "访问游戏链接并创建角色",
            "探索魔法学院的不同区域",
            "与NPC交流，体验AI驱动的动态叙事",
            "尝试魔法课程和校园活动"
          ],
          en: [
            "Visit the game link and create a character",
            "Explore different areas of the magic academy",
            "Interact with NPCs to experience AI-driven dynamic narrative",
            "Try magic courses and campus activities"
          ]
        },
        duration: "1-5h+",
        link: "http://xhslink.com/a/eKWmczIAd6e5"
      },
      {
        titleKey: {
          zh: "《与AI的睡前故事》",
          en: "Bedtime Stories with AI"
        },
        image: require('@/assets/images/bedtime_stories.png'),
        descriptionKey: {
          zh: "这个工具是专用于与deepseek大模型进行互动的故事创作工具。支持使用模板剧本。",
          en: "This tool is specifically designed for interacting with the deepseek large language model, providing a story creation tool. It supports using preset scripts."
        },
        instructionsKey: {
          zh: [
            "打开应用并做好deepseek模型设置",
            "开始与AI一起创作故事，或者挑选剧本进行游玩。",
            "尝试使用不同的设置，比如隐藏思考过程，比如调整温度，比如使用不同的剧本",
            "体验不同风格的创作"
          ],
          en: [
            "Open the application and set up the deepseek model",
            "Start creating stories with AI, or select a script to play.",
            "Try different settings, such as hiding the thinking process, adjusting the temperature, or using different scripts",
            "Experience different styles of creation"
          ]
        },
        duration: "2-20h+",
        link: "https://tobenot.top/Bedtime-Stories-with-AI/"
      }
    ]
  }
}
