<template>
  <div class="project-container" v-if="project">
    <div class="project-header animate-fade-in-up">
      <div class="frame-decoration">
        <div class="frame-corner top-left"></div>
        <div class="frame-corner top-right"></div>
        <div class="frame-corner bottom-left"></div>
        <div class="frame-corner bottom-right"></div>
      </div>
      <h1>{{ project.titleKey[currentLocale] }}</h1>
      <div class="decorative-line"></div>
    </div>
    
    <div class="project-content">
      <div class="project-image-wrapper animate-fade-in-up">
        <img :src="project.image" :alt="project.titleKey[currentLocale]" class="project-image" @click="openLink">
        <div class="image-overlay">
          <span>{{ $t('common.actions.click') }}</span>
        </div>
      </div>
      
      <div class="project-details animate-fade-in-up" style="animation-delay: 0.2s;">
        <div class="details-card">
          <h2>{{ $t('project.aboutWork') }}</h2>
          <p>{{ project.descriptionKey[currentLocale] }}</p>
          <a :href="project.link" target="_blank" rel="noopener noreferrer" class="project-link">
            <span>{{ $t('common.actions.viewProject') }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>
      </div>
    </div>
    
    <div class="back-link animate-fade-in-up" style="animation-delay: 0.3s;">
      <router-link to="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        {{ $t('common.actions.back') }}
      </router-link>
    </div>
  </div>
</template>

<script>
import config from '../config'
import { useI18n } from 'vue-i18n'

export default {
  name: 'Project',
  setup() {
    const { t, locale } = useI18n()
    return { t, locale }
  },
  data() {
    return {
      project: null
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    }
  },
  created() {
    const id = parseInt(this.$route.params.id)
    this.project = config.projects.find(p => p.id === id)
  },
  methods: {
    openLink() {
      if (this.project && this.project.link) {
        window.open(this.project.link, '_blank')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.project-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.project-header {
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
  
  h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2.8rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-weight: 700;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
  }
  
  .decorative-line {
    width: 120px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
    margin: 0 auto;
  }
}

.project-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem;
  margin-bottom: 3rem;
}

.project-image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 10px 25px var(--shadow-color);
  cursor: pointer;
  width: 550px;
  
  &:hover {
    .project-image {
      transform: scale(1.05);
      filter: grayscale(0%);
    }
    
    .image-overlay {
      opacity: 1;
    }
  }
}

.project-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  transition: all 0.5s ease;
  filter: grayscale(20%);
  display: block;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  span {
    color: white;
    font-family: 'Lora', serif;
    font-size: 1.2rem;
    padding: 0.5rem 1.5rem;
    border: 1px solid white;
    border-radius: 2px;
  }
}

.project-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 550px;
}

.details-card {
  background-color: var(--card-bg);
  border-radius: 4px;
  padding: 2rem;
  box-shadow: 0 5px 15px var(--shadow-color);
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  h2 {
    font-family: 'Playfair Display', serif;
    color: var(--primary-color);
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 50px;
      height: 1px;
      background-color: var(--accent-color);
    }
  }
  
  p {
    font-family: 'Lora', serif;
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--secondary-color);
    margin-bottom: 2rem;
  }
}

.project-link {
  display: inline-flex;
  align-items: center;
  background-color: var(--primary-color);
  color: white;
  padding: 0.7rem 1.5rem;
  text-decoration: none;
  border-radius: 3px;
  transition: all 0.3s ease;
  font-family: 'Lora', serif;
  
  svg {
    margin-left: 0.5rem;
  }
  
  &:hover {
    background-color: var(--accent-color);
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
}

.back-link {
  text-align: center;
  margin-top: 2rem;
  
  a {
    display: inline-flex;
    align-items: center;
    font-family: 'Lora', serif;
    color: var(--primary-color);
    text-decoration: none;
    transition: all 0.3s ease;
    
    svg {
      margin-right: 0.5rem;
    }
    
    &:hover {
      color: var(--accent-color);
    }
  }
}

@media (max-width: 768px) {
  .project-image-wrapper,
  .project-details {
    width: 100%;
  }
  
  .project-header h1 {
    font-size: 2.2rem;
  }
}

/* Responsive styles */
@media (max-width: 768px) {
  .project-container {
    padding: 1.5rem 1rem;
  }
  
  .project-header {
    margin-bottom: 2rem;
    
    h1 {
      font-size: 2.2rem;
    }
    
    .project-metadata {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }
  
  .project-cover {
    height: auto;
    margin-bottom: 2rem;
  }
  
  .project-content {
    padding: 1.5rem;
    
    p {
      font-size: 1rem;
    }
    
    h2 {
      font-size: 1.5rem;
      margin: 1.5rem 0 1rem;
    }
    
    .image-gallery {
      gap: 1rem;
      
      .gallery-item {
        flex: 0 0 calc(50% - 0.5rem);
      }
    }
    
    .project-links {
      flex-direction: column;
      gap: 1rem;
      
      .project-link {
        width: 100%;
      }
    }
  }
  
  .section-divider {
    margin: 2rem 0;
  }
  
  .back-to-home {
    margin-top: 2rem;
  }
}

@media (max-width: 480px) {
  .project-header h1 {
    font-size: 1.8rem;
  }
  
  .project-content {
    padding: 1.2rem;
    
    .image-gallery .gallery-item {
      flex: 0 0 100%;
    }
  }
}
</style>
