export default [
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
        }
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
        }
      ]
    }
  ]