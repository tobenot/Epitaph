import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Project from '../views/Project.vue'
import About from '../views/About.vue'
import Gallery from '../views/Gallery.vue'
import Sounds from '../views/Sounds.vue'
import Sound from '../views/Sound.vue'
import GalleryItem from '../views/GalleryItem.vue'
import Celebration from '../views/Celebration.vue'
import { peekCelebrationScroll } from '../utils/celebration'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/project/:slug',
    name: 'Project',
    component: Project
  },
  {
    path: '/about',
    name: 'About',
    component: About
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
    path: '/painting/:itemId',
    name: 'Painting',
    component: GalleryItem,
    meta: { type: 'paintings' }
  },
  {
    path: '/photograph/:itemId',
    name: 'Photograph',
    component: GalleryItem,
    meta: { type: 'photographs' }
  },
  {
    path: '/sounds',
    name: 'Sounds',
    component: Sounds
  },
  {
    path: '/sound/:id',
    name: 'Sound',
    component: Sound
  },
  {
    path: '/celebration/:id',
    name: 'Celebration',
    component: Celebration
  }
]

import config from '../config'
import i18n from '../i18n'
import aboutConfig from '../config/aboutConfig'

function pickLocalized(keyObj, locale) {
  return keyObj[locale] || keyObj.zh
}

function pickProjectMetaTitle(project, locale) {
  if (project.metaTitleKey) {
    return pickLocalized(project.metaTitleKey, locale)
  }
  return `${pickLocalized(project.titleKey, locale)} | Epitaph`
}

function pickProjectMetaDescription(project, locale) {
  if (project.metaDescriptionKey) {
    return pickLocalized(project.metaDescriptionKey, locale)
  }
  return pickLocalized(project.descriptionKey, locale)
}

function setMetaContent(selector, attr, attrValue, content) {
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    if (attr === 'name') {
      el.name = attrValue
    } else {
      el.setAttribute(attr, attrValue)
    }
    document.head.appendChild(el)
  }
  el.content = content
}

export function updatePageMeta(to) {
  const locale = i18n.global.locale.value
  const t = i18n.global.t

  let title = `${t('common.siteTitle')} | Epitaph`
  let description = t('common.siteDescription')

  if (to.name === 'Project') {
    const slug = to.params.slug
    const project = config.projects.find(p => p.slug === slug || p.id === parseInt(slug))
    if (project) {
      title = pickProjectMetaTitle(project, locale)
      description = pickProjectMetaDescription(project, locale)
    }
  } else if (to.name === 'About') {
    title = `${t('about.title')} | Epitaph`
    description = pickLocalized(aboutConfig.contentKey, locale).split('\n')[0]
  } else if (to.name === 'Sound') {
    const sound = config.sounds?.find(s => s.id === to.params.id)
    if (sound) {
      title = `${pickLocalized(sound.titleKey, locale)} | Epitaph`
      description = pickLocalized(sound.descriptionKey, locale)
    }
  } else if (to.name === 'Painting' || to.name === 'Photograph') {
    const gallery = config.galleries?.find(g => g.id === to.meta?.type)
    const item = gallery?.items.find(i => i.id === to.params.itemId)
    if (item) {
      title = `${pickLocalized(item.titleKey, locale)} | Epitaph`
      description = pickLocalized(item.descriptionKey, locale)
    }
  } else if (to.name === 'Celebration') {
    const celebration = config.celebrations?.[to.params.id]
    if (celebration) {
      title = `${pickLocalized(celebration.titleKey, locale)} | Epitaph`
      description = pickLocalized(celebration.descriptionKey, locale)
    }
  }

  document.title = title
  setMetaContent('meta[name="description"]', 'name', 'description', description)
  setMetaContent('meta[property="og:title"]', 'property', 'og:title', title)
  setMetaContent('meta[property="og:description"]', 'property', 'og:description', description)
  setMetaContent('meta[property="og:site_name"]', 'property', 'og:site_name', 'Epitaph')
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.name === 'Celebration' && to.query.restore === '1') {
      const y = peekCelebrationScroll(to.params.id)
      if (y != null) {
        return { left: 0, top: y }
      }
      return false
    }
    if (to.name === 'Celebration' && from.name === 'Celebration' && to.path === from.path) {
      return false
    }
    return { top: 0 }
  }
})

router.afterEach(updatePageMeta)

export default router
