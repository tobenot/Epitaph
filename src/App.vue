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
          <router-link v-for="item in navItems" :key="item.path" :to="item.path">
            {{ item.name }}
          </router-link>
          <a href="https://tobenot.top/" target="_blank" rel="noopener noreferrer" class="external-link">
            <span>博客</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
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
          <p class="quote">"生如夏花之绚烂，死如秋叶之静美"</p>
          <div class="decorative-line"></div>
        </div>
        <p class="copyright">&copy; {{ new Date().getFullYear() }} {{ siteTitle }}. 保留所有权利。</p>
      </div>
    </footer>
  </div>
</template>

<script>
import config from './config'

export default {
  name: 'App',
  data() {
    return {
      navItems: config.navItems,
      siteTitle: config.siteTitle
    }
  },
  watch: {
    '$route' (to, from) {
      // 根据路由更新标题
      document.title = this.getPageTitle(to)
    }
  },
  methods: {
    getPageTitle(route) {
      const baseTitle = this.siteTitle
      if (route.name === 'Home') {
        return baseTitle
      } else if (route.name === 'Project') {
        const projectId = parseInt(route.params.id)
        const project = config.projects.find(p => p.id === projectId)
        return project ? `${project.title} | ${baseTitle}` : baseTitle
      } else if (route.name === 'About') {
        return `关于我 | ${baseTitle}`
      }
      return baseTitle
    }
  },
  mounted() {
    // 设置初始标题
    document.title = this.getPageTitle(this.$route)
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

main {
  flex-grow: 1;
  max-width: 1200px;
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
</style>
