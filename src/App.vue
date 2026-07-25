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
          <button
            class="mobile-nav-toggle"
            :class="{ active: mobileNavActive }"
            :aria-expanded="mobileNavActive"
            aria-controls="nav-items"
            :aria-label="mobileNavActive ? '关闭导航菜单' : '打开导航菜单'"
            @click="toggleMobileNav">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <transition name="nav-fade">
            <div v-if="mobileNavActive" class="nav-overlay" @click="closeMobileNav"></div>
          </transition>
          <div id="nav-items" class="nav-items" :class="{ 'active': mobileNavActive }">
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
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <keep-alive include="Home">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
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

    <transition name="nav-fade">
      <button
        v-show="showBackToTop"
        class="back-to-top"
        :aria-label="$t('common.actions.backToTop')"
        :title="$t('common.actions.backToTop')"
        @click="scrollToTop">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"></polyline></svg>
      </button>
    </transition>
  </div>
</template>

<script>
import config from './config'
import { useI18n } from 'vue-i18n'
import { setLocale } from './i18n'
import { updatePageMeta } from './router'

export default {
  name: 'App',
  setup() {
    const { t, locale } = useI18n()
    return { t, locale }
  },
  data() {
    return {
      siteTitle: this.$t('common.siteTitle'),
      mobileNavActive: false,
      showBackToTop: false
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
    '$route'(to) {
      updatePageMeta(to)
      this.mobileNavActive = false
    },
    currentLocale: {
      immediate: true,
      handler(locale) {
        this.siteTitle = this.$t('common.siteTitle')
        document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
        updatePageMeta(this.$route)
      }
    },
    mobileNavActive(active) {
      // 抽屉打开时锁定背景滚动
      document.body.style.overflow = active ? 'hidden' : ''
    }
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale
      setLocale(locale)
    },
    toggleMobileNav() {
      this.mobileNavActive = !this.mobileNavActive
    },
    closeMobileNav() {
      this.mobileNavActive = false
    },
    handleScroll() {
      this.showBackToTop = window.scrollY > 500
    },
    scrollToTop() {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
    this.$nextTick(() => {
      this.siteTitle = this.$t('common.siteTitle')
      updatePageMeta(this.$route)
      document.dispatchEvent(new Event('custom-render-trigger'))
    })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    document.body.style.overflow = ''
  }
}
</script>

<style scoped lang="scss">
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
      font-family: var(--font-display);
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
      padding: 0;
      background: none;
      border: none;
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

      &.active {
        span:nth-child(1) {
          transform: translateY(9px) rotate(45deg);
        }

        span:nth-child(2) {
          opacity: 0;
        }

        span:nth-child(3) {
          transform: translateY(-9px) rotate(-45deg);
        }
      }
    }
    
    .nav-items {
      display: flex;
      align-items: center;
      
      a {
        color: var(--secondary-color);
        text-decoration: none;
        margin-left: 2rem;
        font-family: var(--font-body);
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

.nav-overlay {
  display: none;
}

main {
  flex-grow: 1;
  width: 100%;
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
      font-family: var(--font-display);
      font-style: italic;
      font-size: 1.2rem;
      margin-bottom: 1rem;
      letter-spacing: 0.5px;
    }
  }
  
  .copyright {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
  }
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
    font-family: var(--font-body);
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

.back-to-top {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 90;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--accent-color);
  background-color: var(--card-bg);
  color: var(--accent-color);
  box-shadow: 0 2px 8px var(--shadow-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--duration-normal, 0.3s) ease;

  &:hover {
    background-color: var(--accent-color);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow-color);
  }
}

.nav-fade-enter-active,
.nav-fade-leave-active {
  transition: opacity 0.3s ease;
}

.nav-fade-enter-from,
.nav-fade-leave-to {
  opacity: 0;
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

  .nav-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.35);
    z-index: 998;
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

  .back-to-top {
    right: 1rem;
    bottom: 1rem;
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
