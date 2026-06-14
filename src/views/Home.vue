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
    
    <div class="experience-container">
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

      <!-- Show normal guide if not searching -->
      <template v-if="!searchTerm.trim()">
        <div class="experience-intro">
          <p>{{ $t('home.intro') }}</p>
        </div>
        
        <!-- Pathways Selector (Categories) -->
        <div class="pathways-selector">
          <div class="pathways-grid">
            <div v-for="cat in categories" 
                 :key="cat"
                 class="pathway-card"
                 :class="{ active: activeCategoryId === cat }"
                 @click="activeCategoryId = cat; currentPage = 1">
              <div class="pathway-icon">
                <svg v-if="cat === 'all'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                <svg v-else-if="cat === 'blog'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <svg v-else-if="cat === 'vrchat'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12A10 10 0 0 0 2 12c0 2 1.5 3 3 3h1.5a1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 0 3 0 1.5 1.5 0 0 1 1.5-1.5H19c1.5 0 3-1 3-3z"></path></svg>
                <svg v-else-if="cat === 'novel'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                <svg v-else-if="cat === 'ai'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>
                <svg v-else-if="cat === 'game'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M6 12h4"></path><path d="M8 10v4"></path><circle cx="15" cy="13" r="1"></circle><circle cx="18" cy="11" r="1"></circle></svg>
                <svg v-else-if="cat === 'tool'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                <svg v-else-if="cat === 'video'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </div>
              <div class="pathway-info">
                <h3>{{ $t(`project.category.${cat}`) }}</h3>
                <p>{{ $t(`project.categoryDesc.${cat}`) }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Active Pathway Content -->
        <div class="experience-section" v-if="activeCategoryId">
          <div class="section-header">
            <h2>{{ $t(`project.category.${activeCategoryId}`) }}</h2>
            <div class="decorative-line"></div>
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
          
          <div class="experience-grid">
            <div v-for="project in paginatedProjects" 
                 :key="project.id" 
                 class="experience-card"
                 @click="openProjectDetails(project.slug)">
              <div class="card-image" v-if="project.image">
                <img :src="project.image" :alt="project.titleKey[currentLocale]">
                <div class="explore-text">{{ $t('common.actions.explore') }}</div>
              </div>
              <div class="card-content">
                <div class="card-header">
                  <h3>{{ project.titleKey[currentLocale] }}</h3>
                  <span v-if="project.status" :class="['status-badge', project.status]" :title="$t(`project.status.${project.status}`)"></span>
                </div>
                <p class="card-desc">{{ project.descriptionKey[currentLocale] }}</p>
                <div class="project-date" v-if="project.date">{{ $t('common.sort.date') }} {{ project.date.year }}/{{ project.date.month }}</div>
              </div>
            </div>
          </div>
          
          <Pagination 
            v-if="totalPages > 1"
            :totalPages="totalPages" 
            :currentPage="currentPage" 
            @page-changed="handlePageChange"
          ></Pagination>
        </div>
        
        <div class="experience-conclusion">
          <p>{{ $t('home.conclusion') }}</p>
          
          <div class="contact-feedback">
            <a href="https://tobenot.top/contact/" target="_blank" rel="noopener noreferrer" class="contact-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              {{ $t('experience.feedback') }}
            </a>
          </div>
        </div>
      </template>

      <!-- Show search results -->
      <template v-else>
        <div class="experience-section">
          <div class="section-header">
            <h2>{{ $t('common.search.placeholder').replace('...', '') }}</h2>
            <div class="decorative-line"></div>
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
          
          <div class="experience-grid">
            <div v-for="project in paginatedProjects" 
                 :key="project.id" 
                 class="experience-card"
                 @click="openProjectDetails(project.slug)">
              <div class="card-image" v-if="project.image">
                <img :src="project.image" :alt="project.titleKey[currentLocale]">
                <div class="explore-text">{{ $t('common.actions.explore') }}</div>
              </div>
              <div class="card-content">
                <div class="card-header">
                  <h3>{{ project.titleKey[currentLocale] }}</h3>
                  <span v-if="project.status" :class="['status-badge', project.status]" :title="$t(`project.status.${project.status}`)"></span>
                </div>
                <p class="card-desc">{{ project.descriptionKey[currentLocale] }}</p>
                <div class="project-date" v-if="project.date">{{ $t('common.sort.date') }} {{ project.date.year }}/{{ project.date.month }}</div>
              </div>
            </div>
          </div>
          
          <div v-if="filteredProjects.length === 0" class="no-results">
            {{ $t('common.search.noResults') }}
          </div>
          
          <Pagination 
            v-if="totalPages > 1"
            :totalPages="totalPages" 
            :currentPage="currentPage" 
            @page-changed="handlePageChange"
          ></Pagination>
        </div>
      </template>
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
      projects: config.projects,
      activeCategoryId: 'all',
      categories: ['all', 'vrchat', 'novel', 'ai', 'game', 'tool', 'video', 'blog'],
      searchTerm: '',
      sortBy: 'pride', // 默认按自豪度排序
      currentPage: 1,
      itemsPerPage: 15,
      savedScrollY: 0
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    },
    sortedProjects() {
      let filteredByCategory = this.projects;
      // 只有在没有搜索的时候，才通过分类过滤
      if (!this.searchTerm.trim() && this.activeCategoryId && this.activeCategoryId !== 'all') {
        filteredByCategory = this.projects.filter(p => {
          if (Array.isArray(p.category)) {
            return p.category.includes(this.activeCategoryId);
          }
          return p.category === this.activeCategoryId;
        });
      }

      if (this.sortBy === 'pride') {
        return [...filteredByCategory].sort((a, b) => (b.pride || 0) - (a.pride || 0));
      } else if (this.sortBy === 'date') {
        return [...filteredByCategory].sort((a, b) => {
          const yearA = a.date ? a.date.year : 0;
          const yearB = b.date ? b.date.year : 0;
          const monthA = a.date ? a.date.month : 0;
          const monthB = b.date ? b.date.month : 0;
          
          if (yearA !== yearB) {
            return yearB - yearA;
          }
          return monthB - monthA;
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
    activeCategoryId() {
      this.currentPage = 1;
    },
    sortBy() {
      this.currentPage = 1;
    }
  },
  methods: {
    openProjectDetails(slug) {
      this.$router.push({ name: 'Project', params: { slug: slug } })
    },
    handlePageChange(page) {
      this.currentPage = page;
      window.scrollTo(0, 0);
    }
  },
  activated() {
    this.$nextTick(() => {
      window.scrollTo(0, this.savedScrollY)
    })
  },
  deactivated() {
    this.savedScrollY = window.scrollY
  },
  mounted() {
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
      
      &.top-left { top: 0; left: 0; border-top: 1px solid; border-left: 1px solid; }
      &.top-right { top: 0; right: 0; border-top: 1px solid; border-right: 1px solid; }
      &.bottom-left { bottom: 0; left: 0; border-bottom: 1px solid; border-left: 1px solid; }
      &.bottom-right { bottom: 0; right: 0; border-bottom: 1px solid; border-right: 1px solid; }
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

.experience-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  
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
    
    &::placeholder { color: var(--secondary-color); opacity: 0.7; }
    &:focus { outline: none; box-shadow: 0 0 0 2px rgba(var(--accent-color-rgb), 0.2); }
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
  grid-template-columns: repeat(4, minmax(0, 1fr));
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
  transition: border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 3px 10px var(--shadow-color);
  min-height: 7.5rem;
  
  &:hover {
    box-shadow: 0 8px 20px var(--shadow-color);
    border-color: rgba(var(--accent-color-rgb), 0.3);
  }
  
  &.active {
    border-color: var(--accent-color);
    background-color: rgba(var(--accent-color-rgb), 0.05);
    box-shadow: 0 5px 15px rgba(var(--accent-color-rgb), 0.15);
  }
  
  .pathway-icon {
    font-size: 2.5rem;
    line-height: 1;
    color: var(--primary-color);
    flex-shrink: 0;
  }
  
  .pathway-info {
    flex: 1;
    min-width: 0;
    
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
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      min-height: calc(0.95rem * 1.5 * 3);
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

.sort-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2.5rem;
  
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
    
    &:hover { background-color: rgba(var(--accent-color-rgb), 0.1); }
    &.active { background-color: var(--accent-color); color: white; }
  }
}

.experience-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
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
    .explore-text { opacity: 1; }
  }
}

.card-image {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  
  img {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    object-fit: cover;
  }
  
  .explore-text {
    position: absolute;
    top: 50%; left: 50%;
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
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  
  h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    line-height: 1.35;
    color: var(--primary-color);
    margin: 0;
    flex: 1;
    min-width: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .status-badge {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
    margin-top: 0.45rem;
    
    &.released { background: #4caf50; }
    &.development { background: #2196f3; }
    &.halted { background: #ff9800; }
    &.archived { background: #9e9e9e; }
    &.concept { background: #ff9800; }
    &.private { background: #f44336; }
    &.playable { background: #4caf50; }
    &.unplayable { background: #f44336; }
    &.video { background: #2196f3; }
    &.tool { background: #9c27b0; }
    &.reading { background: #ff9800; }
  }
}

.card-desc {
  font-family: 'Lora', serif;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--secondary-color);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-date {
  align-self: flex-end;
  margin-top: auto;
  padding-top: 1rem;
  font-size: 0.8rem;
  color: var(--secondary-color);
  opacity: 0.7;
  font-style: italic;
  font-family: 'Lora', serif;
}

.no-results {
  font-family: 'Lora', serif;
  color: var(--secondary-color);
  text-align: center;
  width: 100%;
  padding: 2rem;
  font-style: italic;
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

@media (max-width: 1200px) {
  .pathways-grid,
  .experience-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (max-width: 900px) {
  .pathways-grid,
  .experience-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 768px) {
  .epitaph-header { padding: 1rem 0 0 0; .site-title { font-size: 2.5rem; } }
  .experience-intro { padding: 1.5rem; p { font-size: 1rem; } }
  .pathways-grid, .experience-grid { grid-template-columns: 1fr; }
  .experience-conclusion { padding: 1.5rem; p { font-size: 1rem; } }
  .search-container { padding: 0 1rem; .search-input-wrapper { max-width: 100%; } }
  .sort-controls {
    flex-direction: column;
    .sort-title { margin-bottom: 0.5rem; }
    .sort-button { margin-bottom: 0.5rem; }
  }
}
@media (max-width: 480px) {
  .experience-container { padding: 0; }
}
</style>