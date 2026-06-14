<template>
  <div class="home">
    <div class="epitaph-header">
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
    
    <!-- View Mode Toggle -->
    <div class="view-mode-toggle">
      <button :class="['mode-button', { active: viewMode === 'pathway' }]" @click="viewMode = 'pathway'">
        {{ $t('home.viewMode.pathway') }}
      </button>
      <button :class="['mode-button', { active: viewMode === 'all' }]" @click="viewMode = 'all'">
        {{ $t('home.viewMode.all') }}
      </button>
    </div>

    <!-- Pathway View -->
    <div v-if="viewMode === 'pathway'" class="experience-container">
      <div class="experience-intro">
        <p>{{ experience.introKey[currentLocale] }}</p>
      </div>
      
      <!-- Pathways Selector -->
      <div class="pathways-selector">
        <div class="pathways-grid">
          <div v-for="pathway in experience.pathways" 
               :key="pathway.id"
               class="pathway-card"
               :class="{ active: activePathwayId === pathway.id }"
               @click="activePathwayId = pathway.id">
            <div class="pathway-icon">
              <svg v-if="pathway.id === 'author'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <svg v-else-if="pathway.id === 'games'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M6 12h4"></path><path d="M8 10v4"></path><circle cx="15" cy="13" r="1"></circle><circle cx="18" cy="11" r="1"></circle></svg>
              <svg v-else-if="pathway.id === 'vrchat'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12A10 10 0 0 0 2 12c0 2 1.5 3 3 3h1.5a1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 0 3 0 1.5 1.5 0 0 1 1.5-1.5H19c1.5 0 3-1 3-3z"></path></svg>
              <svg v-else-if="pathway.id === 'reading'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              <svg v-else-if="pathway.id === 'ai'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>
              <svg v-else-if="pathway.id === 'tools'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
            <div class="pathway-info">
              <h3>{{ pathway.titleKey[currentLocale] }}</h3>
              <p>{{ pathway.descriptionKey[currentLocale] }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Active Pathway Content -->
      <div class="experience-section" :key="activePathwayId" v-if="activePathway">
        <div class="section-header">
          <h2>{{ activePathway.titleKey[currentLocale] }}</h2>
          <div class="decorative-line"></div>
        </div>
        
        <div class="experience-grid">
          <div v-for="(item, index) in activePathway.steps" 
               :key="index" 
               class="experience-card"
               @click="openItem(item)">
            <div class="card-image" v-if="item.image">
              <img :src="item.image" :alt="item.titleKey[currentLocale]">
              <div class="explore-text">{{ $t('common.actions.explore') }}</div>
            </div>
            <div class="card-content">
              <div class="card-header">
                <h3>{{ item.titleKey[currentLocale] }}</h3>
              </div>
              <p class="card-desc">{{ item.descriptionKey[currentLocale] }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="experience-conclusion">
        <p>{{ experience.conclusionKey[currentLocale] }}</p>
        
        <div class="contact-feedback">
          <a href="mailto:tobenot@qq.com" class="contact-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            {{ $t('experience.feedback') }}
          </a>
        </div>
      </div>
    </div>

    <!-- All Projects View -->
    <div v-else class="all-projects-container">
      <div class="search-container">
        <div class="search-input-wrapper">
          <input 
            v-model="searchTerm" 
            type="text" 
            :placeholder="$t('common.search.placeholder')" 
            class="search-input"
          />
          <div class="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>
      </div>

      <!-- Category Tabs -->
      <div class="category-tabs">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="currentCategory = cat"
          :class="['category-tab', { active: currentCategory === cat }]"
        >
          {{ $t(`project.category.${cat}`) }}
        </button>
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
        <div v-for="project in paginatedProjects" 
             :key="project.id" 
             class="project-card"
             @click="openProjectDetails(project.slug)">
          <div class="card-frame">
            <img :src="project.image" :alt="project.titleKey[currentLocale]">
            <div class="project-info">
              <div class="title-row">
                <h3>{{ project.titleKey[currentLocale] }}</h3>
                <span v-if="project.status" :class="['status-badge', project.status]" :title="$t(`project.status.${project.status}`)"></span>
              </div>
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
      
      <Pagination 
        :totalPages="totalPages" 
        :currentPage="currentPage" 
        @page-changed="handlePageChange"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import config from '../config'
import { useI18n } from 'vue-i18n'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Home',
  components: {
    Pagination
  },
  setup() {
    const { t, locale } = useI18n()
    return { t, locale }
  },
  data() {
    return {
      siteTitle: this.$t('common.siteTitle'),
      viewMode: 'pathway', // 'pathway' or 'all'
      experience: config.experience,
      activePathwayId: '',
      projects: config.projects,
      sortBy: 'pride', // 默认按自豪度排序
      searchTerm: '',
      currentCategory: 'all',
      categories: ['all', 'game', 'novel', 'vrchat', 'tool', 'video'],
      currentPage: 1,
      itemsPerPage: 15
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    },
    activePathway() {
      return this.experience.pathways.find(p => p.id === this.activePathwayId)
    },
    sortedProjects() {
      // 先过滤分类
      let filteredByCategory = this.projects;
      if (this.currentCategory !== 'all') {
        filteredByCategory = this.projects.filter(p => {
          if (Array.isArray(p.category)) {
            return p.category.includes(this.currentCategory);
          }
          return p.category === this.currentCategory;
        });
      }

      if (this.sortBy === 'pride') {
        // 按照配置文件中的原始顺序（自豪度排序）
        return [...filteredByCategory]
      } else if (this.sortBy === 'date') {
        // 按时间排序（最新的在前面）
        return [...filteredByCategory].sort((a, b) => {
          if (a.date.year !== b.date.year) {
            return b.date.year - a.date.year
          }
          return b.date.month - a.date.month
        })
      }
      return filteredByCategory
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
    },
    totalPages() {
      return Math.ceil(this.filteredProjects.length / this.itemsPerPage);
    },
    paginatedProjects() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProjects.slice(start, end);
    }
  },
  watch: {
    currentLocale: {
      immediate: true,
      handler() {
        this.siteTitle = this.$t('common.siteTitle')
      }
    },
    searchTerm() {
        this.currentPage = 1;
    },
    currentCategory() {
        this.currentPage = 1;
    },
    sortBy() {
        this.currentPage = 1;
    }
  },
  created() {
    if (this.experience.pathways && this.experience.pathways.length > 0) {
      this.activePathwayId = this.experience.pathways[0].id
    }
  },
  methods: {
    openItem(item) {
      if (item.slug) {
        this.$router.push({ name: 'Project', params: { slug: item.slug } })
      } else if (item.route) {
        this.$router.push(item.route)
      }
    },
    openProjectDetails(slug) {
      this.$router.push({ name: 'Project', params: { slug: slug } })
    },
    handlePageChange(page) {
      this.currentPage = page;
      window.scrollTo(0, 0);
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
@use "sass:color";

.epitaph-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0 0 0;
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
      opacity: 0.8;
      
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

/* --- View Mode Toggle --- */
.view-mode-toggle {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;

  .mode-button {
    background: transparent;
    border: 1px solid var(--accent-color);
    color: var(--secondary-color);
    padding: 0.8rem 2rem;
    cursor: pointer;
    font-family: 'Lora', serif;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    border-radius: 4px;
    letter-spacing: 1px;

    &:hover {
      background-color: rgba(var(--accent-color-rgb), 0.1);
    }

    &.active {
      background-color: var(--accent-color);
      color: white;
      box-shadow: 0 4px 10px rgba(var(--accent-color-rgb), 0.3);
    }
  }
}

/* --- Pathway Styles --- */
.experience-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
}

.experience-intro {
  background-color: var(--card-bg);
  border-radius: 4px;
  padding: 2.5rem;
  box-shadow: 0 5px 15px var(--shadow-color);
  border: 1px solid rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
  position: relative;
  
  p {
    font-family: 'Lora', serif;
    font-size: 1.1rem;
    line-height: 1.9;
    color: var(--secondary-color);
    position: relative;
    z-index: 1;
  }
  
  &::before {
    content: '"';
    position: absolute;
    top: 2rem;
    left: 2rem;
    font-family: 'Playfair Display', serif;
    font-size: 5rem;
    color: rgba(0, 0, 0, 0.05);
    line-height: 0;
  }
}

.pathways-selector {
  margin-bottom: 3rem;
}

.pathways-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.pathway-card {
  background-color: var(--card-bg);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px var(--shadow-color);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px var(--shadow-color);
    border-color: rgba(var(--accent-color-rgb), 0.3);
  }
  
  &.active {
    border-color: var(--accent-color);
    background-color: rgba(var(--accent-color-rgb), 0.05);
    box-shadow: 0 5px 15px rgba(var(--accent-color-rgb), 0.15);
    transform: translateY(-2px);
  }
  
  .pathway-icon {
    font-size: 2.5rem;
    line-height: 1;
  }
  
  .pathway-info {
    h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem;
      color: var(--primary-color);
      margin: 0 0 0.5rem 0;
    }
    
    p {
      font-size: 0.95rem;
      color: var(--secondary-color);
      margin: 0;
      line-height: 1.5;
    }
  }
}

.experience-section {
  margin-bottom: 3rem;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
  
  h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }
  
  .decorative-line {
    width: 80px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
    margin: 0 auto;
  }
}

.experience-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
}

.experience-card {
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 5px 15px var(--shadow-color);
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px var(--shadow-color);
    
    .explore-text {
      opacity: 1;
    }
  }
}

.experience-conclusion {
  background-color: var(--card-bg);
  border-radius: 4px;
  padding: 2.5rem;
  box-shadow: 0 5px 15px var(--shadow-color);
  margin-top: 4rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  p {
    font-family: 'Lora', serif;
    font-size: 1.1rem;
    line-height: 1.9;
    color: var(--secondary-color);
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .contact-feedback {
    text-align: center;
    
    .contact-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background-color: var(--card-bg);
      color: var(--primary-color);
      border: 1px solid var(--accent-color);
      border-radius: 4px;
      padding: 0.8rem 2rem;
      font-family: 'Lora', serif;
      font-size: 1.1rem;
      text-decoration: none;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: var(--accent-color);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }
    }
  }
}

/* --- All Projects Styles --- */
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

.category-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  .category-tab {
    background: transparent;
    border: 1px solid var(--accent-color);
    color: var(--secondary-color);
    padding: 0.5rem 1.2rem;
    cursor: pointer;
    font-family: 'Lora', serif;
    transition: all 0.3s ease;
    border-radius: 20px;
    font-size: 0.95rem;

    &:hover {
      background-color: rgba(var(--accent-color-rgb), 0.1);
    }

    &.active {
      background-color: var(--accent-color);
      color: white;
      box-shadow: 0 2px 8px rgba(var(--accent-color-rgb), 0.3);
    }
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
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
  width: 100%;
  height: 100%;
  
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
    aspect-ratio: 16 / 9;
    object-fit: cover;
    transition: all 0.5s ease;
    flex-shrink: 0;
    display: block;
  }

  &:hover img {
    transform: scale(1.05);
  }

  .project-info {
    padding: 1.2rem;
    transition: all 0.3s ease;
    background-color: var(--card-bg);
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    overflow: hidden;

    .title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
      flex-shrink: 0;
      
      h3 {
        font-family: 'Playfair Display', serif;
        margin-bottom: 0;
        color: var(--primary-color);
        font-size: 1.3rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .status-badge {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: inline-block;
        flex-shrink: 0;
        margin-left: 0.5rem;
        
        /* New Status */
        &.released { background: #4caf50; }
        &.development { background: #2196f3; }
        &.archived { background: #9e9e9e; }
        &.concept { background: #ff9800; }
        &.private { background: #f44336; }

        /* Legacy Status */
        &.playable { background: #4caf50; }
        &.unplayable { background: #f44336; }
        &.video { background: #2196f3; }
        &.tool { background: #9c27b0; }
        &.reading { background: #ff9800; }
      }
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
      flex: 1;
      min-height: 0;
      margin: 0;
    }
    
    .project-date {
      flex-shrink: 0;
      align-self: flex-end;
      margin-top: auto;
      padding-top: 0.5rem;
      font-size: 0.8rem;
      color: var(--secondary-color);
      opacity: 0.7;
      font-style: italic;
      font-family: 'Lora', serif;
    }
  }
}

.card-image {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .explore-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 6px;
    opacity: 0;
    transition: opacity 0.3s ease;
    font-family: 'Lora', serif;
    letter-spacing: 1px;
    z-index: 2;
    pointer-events: none;
  }
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-header {
  margin-bottom: 1rem;
  
  h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    color: var(--primary-color);
    margin: 0;
  }
}

.card-desc {
  font-family: 'Lora', serif;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--secondary-color);
  margin: 0;
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

@media (max-width: 768px) {
  .epitaph-header {
    padding: 1rem 0 0 0;
    
    .site-title {
      font-size: 2.5rem;
    }
  }

  .view-mode-toggle {
    flex-direction: column;
    padding: 0 1rem;
    gap: 0.5rem;
    
    .mode-button {
      width: 100%;
    }
  }

  .experience-intro { padding: 1.5rem; p { font-size: 1rem; } }
  
  .pathways-grid, .experience-grid {
    grid-template-columns: 1fr;
  }
  
  .experience-conclusion { padding: 1.5rem; p { font-size: 1rem; } }
  
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
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .experience-container { padding: 0; }
}
</style>
