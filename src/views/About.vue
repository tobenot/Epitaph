<template>
  <div class="about-container">
    <div class="epitaph-header">
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
    
    <div class="papers-stack">
      <div 
        v-for="(ver, index) in about.versions" 
        :key="ver.id"
        class="paper-card"
        :style="getCardStyle(index)"
        @click="handleCardClick(index)"
      >
        <div class="paper-meta">
          <span class="version-date">{{ ver.date }}</span>
          <span class="version-author">{{ ver.author[currentLocale] }}</span>
        </div>
        <h2 class="version-title" v-if="ver.title">{{ ver.title[currentLocale] }}</h2>
        <div class="about-content">
          <div class="epitaph-text">{{ ver.contentKey[currentLocale] }}</div>
        </div>
        <div class="flip-hint" v-if="index === currentIndex">
          <span>{{ currentLocale === 'zh' ? '点击纸张翻阅下一版' : 'Click to flip to next version' }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </div>
      </div>
    </div>
    
    <div class="signature" v-if="currentVersion?.signature">
      <p>{{ currentVersion.signature[currentLocale] }}</p>
    </div>

    <div class="traces-gallery" v-if="about.personalWorks && about.personalWorks.length">
      <h2>{{ $t('about.sectionTitle') }}</h2>
      <div class="decorative-line"></div>
      
      <div class="works-list">
        <div class="work-item" v-for="(work, index) in about.personalWorks" :key="index">
          <div class="work-header">
            <h3>{{ work.titleKey[currentLocale] }}</h3>
            <span v-if="work.status" class="work-annotation">{{ $t(`about.status.${work.status}`) }}</span>
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
      about: config.about,
      currentIndex: 0
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    },
    currentVersion() {
      return this.about.versions?.[this.currentIndex] ?? null
    }
  },
  methods: {
    getCardStyle(index) {
      if (!this.about.versions) return {};
      const total = this.about.versions.length;
      let diff = index - this.currentIndex;
      if (diff < 0) diff += total;
      
      if (diff === 0) {
        return {
          transform: 'translateY(0) rotate(0deg) scale(1)',
          zIndex: 10,
          opacity: 1,
          pointerEvents: 'auto'
        }
      }
      
      const rotations = [2, -2, 3, -3, 1];
      const rot = rotations[index % rotations.length];
      
      return {
        transform: `translateY(${diff * 12}px) translateX(${diff * 6}px) rotate(${rot}deg) scale(${1 - diff * 0.02})`,
        zIndex: 10 - diff,
        opacity: 1 - (diff * 0.15),
        pointerEvents: 'auto',
        cursor: 'pointer'
      }
    },
    handleCardClick(index) {
      if (!this.about.versions) return;
      if (this.currentIndex === index) {
        this.currentIndex = (this.currentIndex + 1) % this.about.versions.length;
      } else {
        this.currentIndex = index;
      }
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

.papers-stack {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  margin-bottom: 4rem;
  perspective: 1000px;
}

.paper-card {
  grid-column: 1;
  grid-row: 1;
  background-color: var(--card-bg);
  border-radius: 4px;
  padding: 2.5rem;
  box-shadow: 0 5px 25px rgba(0,0,0,0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: center center;
  
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

.paper-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-family: 'Lora', serif;
  font-style: italic;
  color: var(--accent-color);
  font-size: 0.95rem;
  border-bottom: 1px dashed rgba(0,0,0,0.1);
  padding-bottom: 0.5rem;
  position: relative;
  z-index: 1;
}

.version-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.flip-hint {
  text-align: right;
  margin-top: 2rem;
  font-family: 'Lora', serif;
  font-style: italic;
  color: var(--accent-color);
  font-size: 0.9rem;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
  
  svg {
    animation: bounce-x 2s infinite;
  }
}

@keyframes bounce-x {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
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
      align-items: baseline;
      gap: 1rem;
      margin-bottom: 1rem;
      
      h3 {
        font-family: 'Playfair Display', serif;
        font-size: 1.5rem;
        color: var(--primary-color);
        margin: 0;
      }
      
      .work-annotation {
        flex-shrink: 0;
        font-family: 'Lora', serif;
        font-size: 0.8rem;
        font-style: italic;
        color: var(--secondary-color);
        opacity: 0.75;
        letter-spacing: 0.03em;

        &::before {
          content: '·';
          margin-right: 0.35em;
          opacity: 0.65;
        }
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
  
  .paper-card {
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
  
  .paper-card {
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
