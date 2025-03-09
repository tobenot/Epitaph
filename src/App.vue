<template>
  <div id="app">
    <header>
      <nav>
        <router-link v-for="item in navItems" :key="item.path" :to="item.path">
          {{ item.name }}
        </router-link>
        <a href="https://tobenot.top/" target="_blank" rel="noopener noreferrer" class="external-link">博客</a>
      </nav>
    </header>

    <main>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </main>

    <footer>
      <p>&copy; {{ new Date().getFullYear() }} {{ siteTitle }}. 保留所有权利。</p>
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

:root {
  --primary-color: #3498db;
  --text-color: #333;
  --background-color: #f8f9fa;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;

  nav {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;

    a {
      color: var(--text-color);
      text-decoration: none;
      margin-left: 2rem;
      font-weight: 500;
      transition: color 0.3s ease;

      &:hover, &.router-link-active {
        color: var(--primary-color);
      }
    }

    .external-link {
      color: var(--primary-color);
      
      &:hover {
        text-decoration: underline;
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
  background-color: white;
  text-align: center;
  padding: 1rem 0;
  margin-top: 2rem;
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
