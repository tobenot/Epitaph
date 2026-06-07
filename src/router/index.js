import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Project from '../views/Project.vue'
import About from '../views/About.vue'
import Experience from '../views/Experience.vue'
import Gallery from '../views/Gallery.vue'
import Sounds from '../views/Sounds.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/project/:id',
    name: 'Project',
    component: Project
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/experience',
    name: 'Experience',
    component: Experience
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/paintings',
    name: 'Paintings',
    component: Gallery,
    props: { defaultGalleryType: 'paintings' }
  },
  {
    path: '/photographs',
    name: 'Photographs',
    component: Gallery,
    props: { defaultGalleryType: 'photographs' }
  },
  {
    path: '/sounds',
    name: 'Sounds',
    component: Sounds
  }
]

import config from '../config'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to) => {
  // Update meta tags for SEO
  let title = "Epitaph | 墓志铭 - tobenot的作品与思想集"
  let description = "希望每个人都可以找到自己的理想并为之劳动。tobenot的作品集、游戏、小说与画作。"
  
  if (to.name === 'Project') {
    const id = parseInt(to.params.id)
    const project = config.projects.find(p => p.id === id)
    if (project) {
      // 英文环境可能拿不到准确判断，默认用中文做兜底
      title = `${project.titleKey.zh} | Epitaph`
      description = project.descriptionKey.zh
    }
  } else if (to.name === 'About') {
    title = "墓志铭 | Epitaph"
    description = "如果我完成了我的全部作品，那么我已经完成了我的使命。"
  }
  
  // Set title
  document.title = title
  
  // Set or update description
  let metaDesc = document.querySelector('meta[name="description"]')
  if (!metaDesc) {
    metaDesc = document.createElement('meta')
    metaDesc.name = 'description'
    document.head.appendChild(metaDesc)
  }
  metaDesc.content = description

  // Set or update Open Graph tags
  let ogTitle = document.querySelector('meta[property="og:title"]')
  if (!ogTitle) {
    ogTitle = document.createElement('meta')
    ogTitle.setAttribute('property', 'og:title')
    document.head.appendChild(ogTitle)
  }
  ogTitle.content = title

  let ogDesc = document.querySelector('meta[property="og:description"]')
  if (!ogDesc) {
    ogDesc = document.createElement('meta')
    ogDesc.setAttribute('property', 'og:description')
    document.head.appendChild(ogDesc)
  }
  ogDesc.content = description
})

export default router
