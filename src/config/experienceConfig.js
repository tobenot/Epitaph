export default {
  introKey: {
    zh: "欢迎来到我的作品体验指南。因为涉猎广泛，这里我为您准备了不同领域的传送门。请根据您的兴趣，选择最适合的体验路线。",
    en: "Welcome to my works experience guide. Because of my wide range of interests, I have prepared portals for different fields here. Please choose the experience route that best suits your interests."
  },
  conclusionKey: {
    zh: "感谢您花时间体验我的作品。无论您选择了哪条路线，都希望这段旅程能让您感受到我的创作理念。如果您有任何想法或反馈，欢迎随时与我分享。",
    en: "Thank you for taking the time to experience my works. Whichever route you chose, I hope this journey has given you insight into my creative philosophy. If you have any thoughts or feedback, please feel free to share them with me."
  },
  pathways: [
    {
      id: "author",
      titleKey: { zh: "认识作者", en: "Know the Author" },
      descriptionKey: {
        zh: "如果你想了解我是谁、我怎么思考、以及我留下了什么痕迹。",
        en: "If you want to know who I am, how I think, and what traces I've left behind."
      },
      steps: [
        {
          slug: "sanctuary-of-writers",
          titleKey: { zh: "《作家之屋》博客", en: "Sanctuary Of Writers Blog" },
          image: require('@/assets/images/teacat.webp'),
          descriptionKey: {
            zh: "这是了解我的思想和最新动态的最佳起点。在这里，我分享日常、哲学、创作相关的思考。",
            en: "This is the best starting point to understand my thoughts and latest updates. Here, I share my thoughts on daily life, philosophy, and creation."
          }
        }
      ]
    },
    {
      id: "vrchat",
      titleKey: { zh: "VRChat世界", en: "VRChat Worlds" },
      descriptionKey: {
        zh: "我在 VRChat 中构建的社交、阅读与实验性空间。",
        en: "Social, reading, and experimental spaces I've built in VRChat."
      },
      steps: [
        {
          slug: "deep-talk-cards",
          titleKey: { zh: "Deep Talk Cards 话题世界", en: "Deep Talk Cards" },
          image: require('@/assets/images/vrc_deep_talk_cards.webp'),
          descriptionKey: {
            zh: "真心话不冒险。四类话题卡片，806 个问题，支持多种语言。适合朋友寻找真实连结，或情侣加深了解。",
            en: "All the deep talk, none of the dares. Four decks, 806 questions. For friends seeking real connection, or couples looking to grow closer."
          }
        },
        {
          slug: "book-of-betrayal",
          titleKey: { zh: "背叛书", en: "Book of Betrayal" },
          image: require('@/assets/images/vrc_book_of_betrayal.webp'),
          descriptionKey: {
            zh: "在 VRChat 中沉浸式阅读纪实悬疑小说。「不要找砂糖」，体会单元剧中的人性与背叛。",
            en: "Immersive reading of a suspense novel in VRChat. \"Don't Look for Sugar\", experience humanity and betrayal."
          }
        }
      ]
    },
    {
      id: "ai",
      titleKey: { zh: "AI探索", en: "AI Exploration" },
      descriptionKey: {
        zh: "体验我利用大语言模型开发的互动体验与创作工具。",
        en: "Experience interactive experiences and creation tools I developed using LLMs."
      },
      steps: [
        {
          slug: "bedtime-stories-with-ai",
          titleKey: { zh: "与AI的睡前故事", en: "Bedtime Stories with AI" },
          image: require('@/assets/images/bedtime_stories.webp'),
          descriptionKey: {
            zh: "这个工具是专用于与 deepseek 大模型进行互动的故事创作工具。支持使用模板剧本。",
            en: "This tool is specifically designed for interacting with the deepseek LLM for story creation. Supports preset scripts."
          }
        }
      ]
    },
    {
      id: "reading",
      titleKey: { zh: "小说", en: "Stories & Reading" },
      descriptionKey: {
        zh: "沉下心来，阅读我构建的文字宇宙与故事。",
        en: "Calm your mind and read the text universes and stories I've built."
      },
      steps: [
        {
          slug: "beyond-books-silver-moon",
          titleKey: { zh: "不止于纸上的故事：银月篇", en: "Beyond Books: Silver Moon" },
          image: require('@/assets/images/bbs.webp'),
          descriptionKey: {
            zh: "定稿小说（约2万字），一个关于信息差、谎言和异能者会战的悬疑故事。",
            en: "Finalized novel (~20k words). A suspense story about information gaps, lies, and esper battles."
          }
        }
      ]
    },
    {
      id: "games",
      titleKey: { zh: "独立游戏体验", en: "Indie Games" },
      descriptionKey: {
        zh: "体验我制作的独立游戏，从传统的动作射击到前沿的AI跑团。",
        en: "Experience the indie games I've made, from traditional action shooters to cutting-edge AI TRPGs."
      },
      steps: [
        {
          slug: "beyond-books",
          titleKey: { zh: "《不止于纸上的故事》", en: "Beyond Books" },
          image: require('@/assets/images/bbw.webp'),
          descriptionKey: {
            zh: "这是我最爱的作品，融合了AI大模型与传统角色扮演游戏(TRPG)的创新尝试。作品花了许多时间打磨细节，包括UI、剧本、机制、音乐、美术等。是细糠！",
            en: "This is my favorite work, an innovative attempt combining AI LLMs with traditional TRPGs. Spent a lot of time polishing UI, script, mechanics, music, and art. It's a masterpiece!"
          }
        },
        {
          slug: "locust-hunter",
          titleKey: { zh: "《猎蝗人》", en: "Locust Hunter" },
          image: require('@/assets/images/lh_header_schinese.webp'),
          descriptionKey: {
            zh: "这款太空射击游戏代表了我在传统游戏开发领域的能力。包括无UI设计，以及对游戏机制、BOSS设计、音乐、美术的思考。非常好玩！",
            en: "This space shooter represents my capabilities in traditional game development. Includes no UI design, mechanics, boss design, music, and art. Very enjoyable!"
          }
        },
        {
          slug: "omnivista-magic-academy",
          titleKey: { zh: "《万象魔法学院》(OMA)", en: "Omnivista Magic Academy (OMA)" },
          image: require('@/assets/images/magic_academy.webp'),
          descriptionKey: {
            zh: "【开发中】这是我对AI与游戏结合的最新探索，融合了MUD文本游戏传统与现代AI技术，创造沉浸式魔法学院体验。",
            en: "【In Development】My latest exploration combining AI and games, merging MUD traditions with modern AI for an immersive magic academy experience."
          }
        }
      ]
    },
    {
      id: "tools",
      titleKey: { zh: "网页工具", en: "Web Tools" },
      descriptionKey: {
        zh: "体验我为解决实际需求而开发的实用网页工具。",
        en: "Experience practical web tools I developed to solve actual needs."
      },
      steps: [
        {
          slug: "abnormal-emotion-self-check",
          titleKey: { zh: "异常情绪自检 SOP", en: "Abnormal Emotion Self-Check SOP" },
          image: require('@/assets/images/MoodCheckSOP.webp'),
          descriptionKey: {
            zh: "一套帮助你在陷入情绪泥潭时进行自我诊断和脱困的流程工具。",
            en: "A process tool to help you self-diagnose and escape when stuck in an emotional quagmire."
          }
        }
      ]
    }
  ]
}
