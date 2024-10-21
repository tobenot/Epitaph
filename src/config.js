export default {
  siteTitle: "我的作品集",
  navItems: [
    { name: "首页", path: "/" },
    { name: "关于我", path: "/about" }
  ],
  projects: [
    {
      id: 1,
      title: "项目1",
      image: "/images/project1.jpg",
      description: "这是项目1的描述",
      link: "https://project1.com"
    },
    {
      id: 2,
      title: "项目2",
      image: "/images/project2.jpg",
      description: "这是项目2的描述",
      link: "https://project2.com"
    }
    // 您可以在这里添加更多项目
  ],
  about: {
    title: "关于我",
    content: "这里是您的个人介绍...",
    personalWorks: [
      { title: "作品1", image: "/images/work1.jpg" },
      { title: "作品2", image: "/images/work2.jpg" }
    ]
  }
}
