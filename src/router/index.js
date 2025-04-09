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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
