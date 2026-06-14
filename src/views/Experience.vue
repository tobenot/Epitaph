<template>
  <div class="experience-container">
    <div class="epitaph-header">
      <div class="frame-decoration">
        <div class="frame-corner top-left"></div>
        <div class="frame-corner top-right"></div>
        <div class="frame-corner bottom-left"></div>
        <div class="frame-corner bottom-right"></div>
      </div>
      <h1>{{ $t('experience.title') }}</h1>
      <div class="decorative-line"></div>
      <p class="quote">{{ $t('experience.subtitle') }}</p>
    </div>
    
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
</template>

<script>
import config from '../config'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export default {
  name: 'Experience',
  setup() {
    const { t, locale } = useI18n()
    const router = useRouter()
    return { t, locale, router }
  },
  data() {
    return {
      experience: config.experience,
      activePathwayId: ''
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    },
    activePathway() {
      return this.experience.pathways.find(p => p.id === this.activePathwayId)
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
        this.router.push({ name: 'Project', params: { slug: item.slug } })
      } else if (item.route) {
        this.router.push(item.route)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@use "sass:color";
.experience-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.epitaph-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  
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
  
  h1 {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-weight: 700;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
  }
  
  .decorative-line {
    width: 100px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
    margin: 0 auto 1.5rem;
  }
  
  .quote {
    font-family: 'Lora', serif;
    font-style: italic;
    color: var(--secondary-color);
    font-size: 1.2rem;
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

/* Pathways Selector Styles */
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

/* Experience Section */
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

/* Responsive Styles */
@media (max-width: 768px) {
  .epitaph-header h1 { font-size: 2.2rem; }
  .epitaph-header .quote { font-size: 1rem; padding: 0 1rem; }
  .experience-intro { padding: 1.5rem; p { font-size: 1rem; } }
  
  .pathways-grid, .experience-grid {
    grid-template-columns: 1fr;
  }
  
  .experience-conclusion { padding: 1.5rem; p { font-size: 1rem; } }
}

@media (max-width: 480px) {
  .experience-container { padding: 1.5rem 1rem; }
  .epitaph-header { margin-bottom: 2rem; h1 { font-size: 1.8rem; } }
}
</style>
