<template>
  <div class="about-container">
    <div class="epitaph-header animate-fade-in-up">
      <div class="frame-decoration">
        <div class="frame-corner top-left"></div>
        <div class="frame-corner top-right"></div>
        <div class="frame-corner bottom-left"></div>
        <div class="frame-corner bottom-right"></div>
      </div>
      <h1>{{ $t('about.title') }}</h1>
      <div class="decorative-line"></div>
      <p class="quote">{{ $t('about.subtitle') }}</p>
    </div>
    
    <div class="about-content-wrapper">
      <div class="about-content animate-fade-in-up" style="animation-delay: 0.2s;">
        <div class="epitaph-text">{{ about.contentKey[currentLocale] }}</div>
      </div>
    </div>
    
    <div class="signature animate-fade-in-up" style="animation-delay: 0.8s;">
      <p>{{ $t('about.signature') }}</p>
    </div>

    <div class="traces-gallery animate-fade-in-up" style="animation-delay: 1s;" v-if="about.personalWorks && about.personalWorks.length">
      <h2>{{ $t('about.sectionTitle') }}</h2>
      <div class="decorative-line"></div>
      
      <div class="works-list">
        <div class="work-item" v-for="(work, index) in about.personalWorks" :key="index">
          <div class="work-header">
            <h3>{{ work.titleKey[currentLocale] }}</h3>
            <span :class="['status-badge', work.status]">{{ $t(`about.status.${work.status}`) }}</span>
          </div>
          <p>{{ work.descriptionKey[currentLocale] }}</p>
          <a v-if="work.link" :href="work.link" target="_blank" rel="noopener noreferrer" class="work-link">
            {{ $t('common.actions.viewProject') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config'
import { useI18n } from 'vue-i18n'

export default {
  name: 'About',
  setup() {
    const { t, locale } = useI18n()
    return { t, locale }
  },
  data() {
    return {
      about: config.about
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    }
  }
}
</script>

<style scoped lang="scss">
.about-container {
  max-width: 800px;
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

.about-content-wrapper {
  background-color: var(--card-bg);
  border-radius: 4px;
  padding: 2.5rem;
  box-shadow: 0 5px 15px var(--shadow-color);
  border: 1px solid rgba(0, 0, 0, 0.05);
  margin-bottom: 4rem;
  position: relative;
  
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

.about-content {
  font-family: 'Lora', serif;
  font-size: 1.1rem;
  line-height: 1.9;
  color: var(--secondary-color);
  position: relative;
  z-index: 1;
}

.epitaph-text {
  white-space: pre-line;
  font-family: 'Lora', serif;
  font-size: 1.1rem;
  line-height: 1.9;
  color: var(--secondary-color);
}

.signature {
  text-align: right;
  margin-top: 4rem;
  margin-bottom: 4rem;
  
  p {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 1.5rem;
    color: var(--accent-color);
  }
}

.traces-gallery {
  margin-top: 4rem;
  
  h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    color: var(--primary-color);
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .decorative-line {
    width: 80px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
    margin: 0 auto 3rem;
  }
  
  .works-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .work-item {
    background-color: var(--card-bg);
    border-radius: 4px;
    padding: 2rem;
    box-shadow: 0 3px 10px var(--shadow-color);
    border: 1px solid rgba(0, 0, 0, 0.05);
    
    .work-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      
      h3 {
        font-family: 'Playfair Display', serif;
        font-size: 1.5rem;
        color: var(--primary-color);
        margin: 0;
      }
      
      .status-badge {
        padding: 0.2rem 0.6rem;
        border-radius: 4px;
        font-size: 0.8rem;
        font-family: 'Lora', serif;
        font-weight: bold;
        
        &.private { background: #ffebee; color: #d32f2f; }
        &.archived { background: #e0e0e0; color: #424242; }
        &.public { background: #e8f5e9; color: #2e7d32; }
      }
    }
    
    p {
      font-family: 'Lora', serif;
      font-size: 1.05rem;
      color: var(--secondary-color);
      line-height: 1.7;
      margin-bottom: 1rem;
    }
    
    .work-link {
      display: inline-block;
      color: var(--accent-color);
      text-decoration: none;
      font-family: 'Lora', serif;
      font-weight: bold;
      transition: color 0.3s ease;
      
      &:hover {
        color: var(--primary-color);
      }
    }
  }
}

@media (max-width: 768px) {
  .about-container {
    padding: 1.5rem 1rem;
  }
  
  .epitaph-header {
    h1 {
      font-size: 2.2rem;
    }
    
    .quote {
      font-size: 1rem;
      padding: 0 1rem;
    }
  }
  
  .about-content {
    padding: 1.5rem;
  }
  
  .about-section {
    margin-bottom: 2rem;
    
    h2 {
      font-size: 1.5rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
  
  .author-section {
    flex-direction: column;
    
    .author-photo {
      margin-right: 0;
      margin-bottom: 1.5rem;
      
      img {
        width: 180px;
        height: 180px;
      }
    }
  }
  
  .contact-links {
    flex-wrap: wrap;
    
    a {
      margin-bottom: 1rem;
    }
  }
}

@media (max-width: 480px) {
  .epitaph-header h1 {
    font-size: 1.8rem;
  }
  
  .about-content {
    padding: 1.2rem;
  }
  
  .author-section .author-photo img {
    width: 150px;
    height: 150px;
  }
  
  .contact-links a {
    flex: 0 0 calc(50% - 1rem);
  }
}
</style>
