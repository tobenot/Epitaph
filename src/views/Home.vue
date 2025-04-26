<template>
  <div class="home">
    <div class="epitaph-header animate-fade-in-up">
      <div class="frame-decoration">
        <div class="frame-corner top-left"></div>
        <div class="frame-corner top-right"></div>
        <div class="frame-corner bottom-left"></div>
        <div class="frame-corner bottom-right"></div>
      </div>
      <h1 class="site-title">{{ $t('common.siteTitle') }}</h1>
      <p class="site-subtitle">{{ $t('home.subtitle') }}</p>
      <div class="decorative-line"></div>
    </div>
    
    <div class="search-container">
      <div class="search-input-wrapper">
        <input 
          v-model="searchTerm" 
          type="text" 
          :placeholder="$t('common.search.placeholder')" 
          class="search-input"
        />
        <div class="search-icon">
          <i class="fas fa-search"></i>
        </div>
      </div>
    </div>
    
    <div class="sort-controls">
      <span class="sort-title">{{ $t('common.sort.title') }}:</span>
      <button 
        @click="sortBy = 'pride'" 
        :class="{ active: sortBy === 'pride' }"
        class="sort-button">
        {{ $t('common.sort.byPride') }}
      </button>
      <button 
        @click="sortBy = 'date'" 
        :class="{ active: sortBy === 'date' }"
        class="sort-button">
        {{ $t('common.sort.byDate') }}
      </button>
    </div>
    
    <div class="projects-grid">
      <div v-for="(project, index) in filteredProjects" 
           :key="project.id" 
           class="project-card animate-fade-in-up" 
           :style="{ animationDelay: `${index * 0.1}s` }"
           @click="openProjectLink(project.link)">
        <div class="card-frame">
          <img :src="project.image" :alt="project.titleKey[currentLocale]">
          <div class="project-info">
            <h3>{{ project.titleKey[currentLocale] }}</h3>
            <p>{{ project.descriptionKey[currentLocale] }}</p>
            <div class="project-date">{{ $t('common.sort.date') }} {{ project.date.year }}/{{ project.date.month }}</div>
          </div>
          <div class="explore-text">{{ $t("common.actions.explore") }}</div>
        </div>
      </div>
      <div v-if="filteredProjects.length === 0" class="no-results">
        {{ $t('common.search.noResults') }}
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config'
import { useI18n } from 'vue-i18n'

export default {
  name: 'Home',
  setup() {
    const { t, locale } = useI18n()
    return { t, locale }
  },
  data() {
    return {
      siteTitle: this.$t('common.siteTitle'),
      projects: config.projects,
      sortBy: 'pride', // 默认按自豪度排序
      searchTerm: ''
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    },
    sortedProjects() {
      if (this.sortBy === 'pride') {
        // 按照配置文件中的原始顺序（自豪度排序）
        return [...this.projects]
      } else if (this.sortBy === 'date') {
        // 按时间排序（最新的在前面）
        return [...this.projects].sort((a, b) => {
          if (a.date.year !== b.date.year) {
            return b.date.year - a.date.year
          }
          return b.date.month - a.date.month
        })
      }
      return this.projects
    },
    filteredProjects() {
      if (!this.searchTerm.trim()) {
        return this.sortedProjects
      }
      
      const searchTermLower = this.searchTerm.toLowerCase()
      return this.sortedProjects.filter(project => {
        const title = project.titleKey[this.currentLocale].toLowerCase()
        const description = project.descriptionKey[this.currentLocale].toLowerCase()
        return title.includes(searchTermLower) || description.includes(searchTermLower)
      })
    }
  },
  watch: {
    currentLocale: {
      immediate: true,
      handler() {
        this.siteTitle = this.$t('common.siteTitle')
      }
    }
  },
  methods: {
    openProjectLink(link) {
      window.open(link, '_blank')
    }
  },
  mounted() {
    // 确保在组件加载完成后获取正确的标题
    this.$nextTick(() => {
      this.siteTitle = this.$t('common.siteTitle')
    })
  }
}
</script>

<style scoped lang="scss">
.epitaph-header {
  text-align: center;
  margin-bottom: 4rem;
  padding: 2rem 0;
  position: relative;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  
  .frame-decoration {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: calc(100% + 40px);
    z-index: -1;
    
    .frame-corner {
      position: absolute;
      width: 30px;
      height: 30px;
      border-color: var(--accent-color);
      opacity: 0.5;
      
      &.top-left {
        top: 0;
        left: 0;
        border-top: 1px solid;
        border-left: 1px solid;
      }
      
      &.top-right {
        top: 0;
        right: 0;
        border-top: 1px solid;
        border-right: 1px solid;
      }
      
      &.bottom-left {
        bottom: 0;
        left: 0;
        border-bottom: 1px solid;
        border-left: 1px solid;
      }
      
      &.bottom-right {
        bottom: 0;
        right: 0;
        border-bottom: 1px solid;
        border-right: 1px solid;
      }
    }
  }
  
  .site-title {
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
    letter-spacing: 0.05em;
    font-weight: 700;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
  }
  
  .site-subtitle {
    font-family: 'Lora', serif;
    font-size: 1.2rem;
    color: var(--secondary-color);
    font-style: italic;
    margin-bottom: 1.5rem;
  }
  
  .decorative-line {
    width: 150px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
    margin: 0 auto;
  }
}

.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  
  .search-input-wrapper {
    position: relative;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .search-input {
    width: 100%;
    padding: 0.8rem 1rem 0.8rem 2.5rem;
    border: 1px solid var(--accent-color);
    border-radius: 4px;
    font-family: 'Lora', serif;
    font-size: 1rem;
    color: var(--primary-color);
    background-color: transparent;
    transition: all 0.3s ease;
    
    &::placeholder {
      color: var(--secondary-color);
      opacity: 0.7;
    }
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(var(--accent-color-rgb), 0.2);
    }
  }
  
  .search-icon {
    position: absolute;
    left: 0.8rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--accent-color);
    opacity: 0.7;
  }
}

.sort-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  
  .sort-title {
    font-family: 'Lora', serif;
    margin-right: 1rem;
    color: var(--secondary-color);
  }
  
  .sort-button {
    background: transparent;
    border: 1px solid var(--accent-color);
    color: var(--secondary-color);
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    cursor: pointer;
    font-family: 'Lora', serif;
    transition: all 0.3s ease;
    border-radius: 4px;
    
    &:hover {
      background-color: rgba(var(--accent-color-rgb), 0.1);
    }
    
    &.active {
      background-color: var(--accent-color);
      color: white;
    }
  }
}

.projects-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem;
  padding: 0 0.5rem;
  
  .no-results {
    font-family: 'Lora', serif;
    color: var(--secondary-color);
    text-align: center;
    width: 100%;
    padding: 2rem;
    font-style: italic;
  }
}

.project-card {
  position: relative;
  perspective: 1000px;
  cursor: pointer;
  width: 420px;
  height: 420px;
  
  .card-frame {
    background-color: var(--card-bg);
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 4px 15px var(--shadow-color);
    transform-style: preserve-3d;
    transition: transform 0.5s ease, box-shadow 0.5s ease;
    border: 1px solid rgba(0, 0, 0, 0.05);
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    
    .explore-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      opacity: 0;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: 'Lora', serif;
      letter-spacing: 2px;
      z-index: 2;
      backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
      font-size: 1.1rem;
      text-transform: uppercase;
      
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border: 2px solid transparent;
        border-radius: 10px;
        animation: borderAnimation 2s linear infinite;
      }
      
      &::after {
        animation-delay: -1s;
      }
    }
    
    &:hover .explore-text {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.1);
      letter-spacing: 3px;
      background-color: rgba(0, 0, 0, 0.8);
      box-shadow: 0 0 30px rgba(var(--accent-color-rgb), 0.3);
    }
  }

  &:hover {
    z-index: 1;
    
    .card-frame {
      transform: translateY(-10px) rotateX(5deg);
      box-shadow: 0 20px 30px var(--shadow-color);
    }
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: all 0.5s ease;
    filter: grayscale(30%);
    flex-shrink: 0;
    display: block;
  }

  &:hover img {
    transform: scale(1.05);
    filter: grayscale(0%);
  }

  .project-info {
    padding: 1.5rem;
    transition: all 0.3s ease;
    background-color: var(--card-bg);
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 120px;
    overflow: hidden;
    position: relative;

    h3 {
      font-family: 'Playfair Display', serif;
      margin-bottom: 0.8rem;
      color: var(--primary-color);
      font-size: 1.4rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 40px;
    }

    p {
      font-family: 'Lora', serif;
      font-size: 0.95rem;
      color: var(--secondary-color);
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 150px;
    }
    
    .project-date {
      position: absolute;
      bottom: 0.5rem;
      right: 0.5rem;
      font-size: 0.8rem;
      color: var(--secondary-color);
      opacity: 0.7;
      font-style: italic;
      font-family: 'Lora', serif;
    }
  }
}

@keyframes borderAnimation {
  0% {
    border-color: transparent;
    border-top-color: var(--accent-color);
    border-right-color: var(--accent-color);
  }
  25% {
    border-color: transparent;
    border-right-color: var(--accent-color);
    border-bottom-color: var(--accent-color);
  }
  50% {
    border-color: transparent;
    border-bottom-color: var(--accent-color);
    border-left-color: var(--accent-color);
  }
  75% {
    border-color: transparent;
    border-left-color: var(--accent-color);
    border-top-color: var(--accent-color);
  }
  100% {
    border-color: transparent;
    border-top-color: var(--accent-color);
    border-right-color: var(--accent-color);
  }
}

@media (min-width: 1500px) {
  .projects-grid {
    max-width: 1460px;
    margin: 0 auto;
  }
}

@media (max-width: 1100px) {
  .projects-grid {
    max-width: 990px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .epitaph-header {
    padding: 1rem 0;
    
    .site-title {
      font-size: 2.5rem;
    }
  }
  
  .search-container {
    padding: 0 1rem;
    
    .search-input-wrapper {
      max-width: 100%;
    }
  }
  
  .sort-controls {
    flex-direction: column;
    
    .sort-title {
      margin-bottom: 0.5rem;
    }
    
    .sort-button {
      margin-bottom: 0.5rem;
    }
  }
  
  .projects-grid {
    max-width: 320px;
    margin: 0 auto;
  }
}
</style>
