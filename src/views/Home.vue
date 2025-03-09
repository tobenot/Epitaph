<template>
  <div class="home">
    <div class="epitaph-header animate-fade-in-up">
      <div class="frame-decoration">
        <div class="frame-corner top-left"></div>
        <div class="frame-corner top-right"></div>
        <div class="frame-corner bottom-left"></div>
        <div class="frame-corner bottom-right"></div>
      </div>
      <h1 class="site-title">{{ siteTitle }}</h1>
      <p class="site-subtitle">{{ $t('home.subtitle') }}</p>
      <div class="decorative-line"></div>
    </div>
    
    <div class="projects-grid">
      <div v-for="(project, index) in projects" 
           :key="project.id" 
           class="project-card animate-fade-in-up" 
           :style="{ animationDelay: `${index * 0.1}s` }"
           @click="openProjectLink(project.link)">
        <div class="card-frame">
          <img :src="project.image" :alt="project.titleKey[currentLocale]">
          <div class="project-info">
            <h3>{{ project.titleKey[currentLocale] }}</h3>
            <p>{{ project.descriptionKey[currentLocale] }}</p>
          </div>
        </div>
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
      projects: config.projects
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    }
  },
  watch: {
    currentLocale() {
      this.siteTitle = this.$t('common.siteTitle')
    }
  },
  methods: {
    openProjectLink(link) {
      window.open(link, '_blank')
    }
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

.projects-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem;
  padding: 0 0.5rem;
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
    
    &::after {
      content: '{{ $t("common.actions.explore") }}';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 2px;
      opacity: 0;
      transition: opacity 0.3s ease;
      font-family: 'Lora', serif;
      letter-spacing: 1px;
      z-index: 2;
    }
  }

  &:hover {
    z-index: 1;
    
    .card-frame {
      transform: translateY(-10px) rotateX(5deg);
      box-shadow: 0 20px 30px var(--shadow-color);
      
      &::after {
        opacity: 1;
      }
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
  
  .projects-grid {
    max-width: 320px;
    margin: 0 auto;
  }
}
</style>
