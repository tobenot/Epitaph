<template>
  <div id="app">
    <header>
      <div class="header-container">
        <div class="logo">
          <router-link to="/">
            <span class="logo-text">Epitaph</span>
          </router-link>
        </div>
        <nav>
          <div class="mobile-nav-toggle" @click="toggleMobileNav">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="nav-items" :class="{ 'active': mobileNavActive }">
            <router-link v-for="item in navItems" :key="item.path" :to="item.path">
              {{ $t(item.nameKey) }}
            </router-link>
            <a href="https://tobenot.top/" target="_blank" rel="noopener noreferrer" class="external-link">
              <span>{{ $t('common.nav.blog') }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
            <div class="lang-switcher">
              <button 
                @click="changeLocale('zh')" 
                :class="{ active: currentLocale === 'zh' }"
                title="切换到中文">
                中
              </button>
              <span>/</span>
              <button 
                @click="changeLocale('en')" 
                :class="{ active: currentLocale === 'en' }"
                title="Switch to English">
                En
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <main>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </main>

    <footer>
      <div class="footer-content">
        <div class="footer-epitaph">
          <p class="quote">{{ $t('common.footer.quote') }}</p>
          <div class="decorative-line"></div>
        </div>
        <p class="copyright">&copy; {{ new Date().getFullYear() }} {{ $t('common.siteTitle') }}. {{ $t('common.footer.copyright') }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import config from './config'
import { useI18n } from 'vue-i18n'
import { setLocale } from './i18n'

export default {
  name: 'App',
  setup() {
    const { t, locale } = useI18n()
    return { t, locale }
  },
  data() {
    return {
      siteTitle: this.$t('common.siteTitle'),
      mobileNavActive: false
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    },
    navItems() {
      return config.navItems
    }
  },
  watch: {
    '$route'(to, from) {
      document.title = this.getPageTitle(to)
      // 关闭移动导航
      this.mobileNavActive = false
    },
    currentLocale: {
      immediate: true,
      handler() {
        // 只更新标题，不再覆盖导航项
        this.siteTitle = this.$t('common.siteTitle')
        // 更新标题
        document.title = this.getPageTitle(this.$route)
      }
    }
  },
  methods: {
    getPageTitle(route) {
      const baseTitle = this.$t('common.siteTitle')
      if (route.name === 'Home') {
        return baseTitle
      } else if (route.name === 'Project') {
        const projectId = parseInt(route.params.id)
        const project = config.projects.find(p => p.id === projectId)
        return project ? `${project.titleKey[this.currentLocale]} | ${baseTitle}` : baseTitle
      } else if (route.name === 'About') {
        return `${this.$t('about.title')} | ${baseTitle}`
      }
      return baseTitle
    },
    changeLocale(locale) {
      this.$i18n.locale = locale
      setLocale(locale)
    },
    toggleMobileNav() {
      this.mobileNavActive = !this.mobileNavActive
    }
  },
  mounted() {
    // 确保在组件挂载完成后更新标题
    this.$nextTick(() => {
      this.siteTitle = this.$t('common.siteTitle')
      document.title = this.getPageTitle(this.$route)
    })
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:wght@400;700&display=swap');

:root {
  --primary-color: #4a4a4a;
  --secondary-color: #8d8d8d;
  --accent-color: #bca979;
  --text-color: #333;
  --light-text: #f5f5f5;
  --background-color: #f0efe9;
  --card-bg: #f9f8f4;
  --shadow-color: rgba(0, 0, 0, 0.15);
  --footer-bg: #2c2c2c;
  --texture-color: rgba(0, 0, 0, 0.04);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Playfair Display', 'Times New Roman', serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
  position: relative;
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
    repeating-radial-gradient(var(--texture-color) 0, var(--texture-color) 0.5px, transparent 0.5px, transparent 25%),
    linear-gradient(rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.03));
  background-size: 50px 50px, 50px 50px, 300px 300px, 100% 100%;
  z-index: -1;
  opacity: 0.6;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: var(--card-bg);
  box-shadow: 0 2px 4px var(--shadow-color);
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--secondary-color);

  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  }

  .logo {
    a {
      text-decoration: none;
    }

    .logo-text {
      font-family: 'Playfair Display', serif;
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--primary-color);
      letter-spacing: 1px;
    }
  }

  nav {
    display: flex;
    align-items: center;
    
    .mobile-nav-toggle {
      display: none;
      flex-direction: column;
      justify-content: space-between;
      width: 30px;
      height: 21px;
      cursor: pointer;
      z-index: 1000;
      
      span {
        display: block;
        height: 3px;
        width: 100%;
        background-color: var(--primary-color);
        border-radius: 2px;
        transition: all 0.3s ease;
      }
    }
    
    .nav-items {
      display: flex;
      align-items: center;
      
      a {
        color: var(--secondary-color);
        text-decoration: none;
        margin-left: 2rem;
        font-family: 'Lora', serif;
        font-weight: 400;
        font-size: 1rem;
        letter-spacing: 0.5px;
        transition: color 0.3s ease;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--accent-color);
          transition: width 0.3s ease;
        }

        &:hover, &.router-link-active {
          color: var(--primary-color);

          &::after {
            width: 100%;
          }
        }

        svg {
          margin-left: 0.3rem;
          vertical-align: middle;
        }
      }

      .external-link {
        display: flex;
        align-items: center;
        color: var(--accent-color);
        
        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }
}

main {
  flex-grow: 1;
  max-width: 1500px;
  margin: 2rem auto;
  padding: 0 1rem;
}

footer {
  background-color: var(--footer-bg);
  color: var(--light-text);
  text-align: center;
  padding: 2.5rem 0;
  margin-top: 3rem;
  
  .footer-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .footer-epitaph {
    margin-bottom: 2rem;
    
    .quote {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 1.2rem;
      margin-bottom: 1rem;
      letter-spacing: 0.5px;
    }
    
    .decorative-line {
      width: 100px;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
      margin: 0 auto;
    }
  }
  
  .copyright {
    font-family: 'Lora', serif;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
  }
}

h1, h2, h3 {
  margin-bottom: 1rem;
}

img {
  max-width: 100%;
  height: auto;
}

// 添加页面过渡动画
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

// 添加全局动画类
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

.lang-switcher {
  display: flex;
  align-items: center;
  margin-left: 2rem;
  
  button {
    background: none;
    border: none;
    color: var(--secondary-color);
    cursor: pointer;
    font-family: 'Lora', serif;
    font-size: 0.9rem;
    opacity: 0.6;
    transition: all 0.3s ease;
    padding: 0.2rem 0.4rem;
    
    &:hover, &.active {
      opacity: 1;
      color: var(--accent-color);
    }
    
    &.active {
      font-weight: bold;
    }
  }
  
  span {
    color: var(--secondary-color);
    margin: 0 0.2rem;
    opacity: 0.6;
  }
}

/* 响应式样式 */
@media (max-width: 1024px) {
  main {
    margin: 1.5rem auto;
  }
  
  .header-container {
    padding: 0 1.5rem;
  }
}

@media (max-width: 768px) {
  header {
    padding: 1rem 0;
    
    .logo .logo-text {
      font-size: 1.5rem;
    }
    
    nav {
      .mobile-nav-toggle {
        display: flex;
      }
      
      .nav-items {
        position: fixed;
        top: 0;
        right: -100%;
        height: 100vh;
        width: 70%;
        max-width: 300px;
        background-color: var(--card-bg);
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding: 2rem;
        z-index: 999;
        transition: right 0.3s ease;
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
        
        &.active {
          right: 0;
        }
        
        a {
          margin: 1rem 0;
          width: 100%;
          text-align: left;
          font-size: 1.1rem;
          
          &::after {
            bottom: -2px;
          }
        }
        
        .lang-switcher {
          margin: 1.5rem 0 0 0;
          width: 100%;
          justify-content: center;
        }
      }
    }
  }
  
  main {
    margin: 1rem auto;
    padding: 0 1rem;
  }
  
  footer {
    padding: 2rem 0;
    
    .footer-epitaph .quote {
      font-size: 1rem;
      padding: 0 1rem;
    }
  }
}

@media (max-width: 480px) {
  header .logo .logo-text {
    font-size: 1.3rem;
  }
  
  header nav .nav-items {
    width: 80%;
  }
  
  footer .footer-content {
    padding: 0 1.5rem;
  }
}
</style>
