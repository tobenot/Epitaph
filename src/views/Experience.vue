<template>
  <div class="experience-container">
    <div class="epitaph-header animate-fade-in-up">
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
    
    <div class="experience-intro animate-fade-in-up" style="animation-delay: 0.2s;">
      <p>{{ experience.introKey[currentLocale] }}</p>
    </div>
    
    <div class="experience-section">
      <div class="section-header animate-fade-in-up" style="animation-delay: 0.3s;">
        <h2>{{ $t('experience.guideTitle') }}</h2>
        <div class="decorative-line"></div>
      </div>
      
      <div class="experience-steps">
        <div v-for="(step, index) in experience.steps" 
             :key="index" 
             class="step-item animate-fade-in-up" 
             :style="{ animationDelay: `${0.4 + index * 0.1}s` }">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-header">
              <h3>{{ step.titleKey[currentLocale] }}</h3>
              <span class="step-duration">{{ $t('experience.duration') }}: {{ step.duration }}</span>
            </div>
            <div class="work-details">
              <div class="work-image">
                <img :src="step.image" :alt="step.titleKey[currentLocale]">
              </div>
              <div class="work-description">
                <p>{{ step.descriptionKey[currentLocale] }}</p>
                <div class="work-instructions">
                  <h4>{{ $t('experience.instructions') }}:</h4>
                  <ul>
                    <li v-for="(instruction, i) in step.instructionsKey[currentLocale]" :key="i">
                      {{ instruction }}
                    </li>
                  </ul>
                </div>
                <button class="experience-button" @click="openExperienceLink(step.link)">
                  {{ $t('experience.startExperience') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="experience-conclusion animate-fade-in-up" style="animation-delay: 0.8s;">
      <p>{{ experience.conclusionKey[currentLocale] }}</p>
    </div>
  </div>
</template>

<script>
import config from '../config'
import { useI18n } from 'vue-i18n'

export default {
  name: 'Experience',
  setup() {
    const { t, locale } = useI18n()
    return { t, locale }
  },
  data() {
    return {
      experience: config.experience
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    }
  },
  methods: {
    openExperienceLink(link) {
      window.open(link, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
.experience-container {
  max-width: 900px;
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
  margin-bottom: 4rem;
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

.experience-steps {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.step-item {
  margin-bottom: 4rem;
  position: relative;
  border-left: 3px solid var(--accent-color);
  padding-left: 2.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .step-number {
    position: absolute;
    left: -25px;
    top: 0;
    background-color: var(--accent-color);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  }
  
  .step-content {
    background-color: var(--card-bg);
    border-radius: 8px;
    box-shadow: 0 5px 15px var(--shadow-color);
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .step-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    background-color: rgba(var(--accent-color-rgb), 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    
    h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      margin: 0;
      color: var(--primary-color);
    }
    
    .step-duration {
      font-family: 'Lora', serif;
      font-size: 0.9rem;
      color: var(--secondary-color);
      font-style: italic;
    }
  }
  
  .work-details {
    display: flex;
    padding: 2rem;
    gap: 2rem;
    
    .work-image {
      flex: 0 0 180px;
      
      img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        border-radius: 4px;
        box-shadow: 0 3px 6px var(--shadow-color);
      }
    }
    
    .work-description {
      flex: 1;
      
      p {
        font-family: 'Lora', serif;
        line-height: 1.8;
        color: var(--secondary-color);
        margin-bottom: 1.5rem;
      }
      
      .work-instructions {
        margin-bottom: 1.5rem;
        
        h4 {
          font-family: 'Playfair Display', serif;
          color: var(--primary-color);
          margin-bottom: 0.8rem;
          font-size: 1.1rem;
        }
        
        ul {
          padding-left: 1.5rem;
          
          li {
            font-family: 'Lora', serif;
            color: var(--secondary-color);
            margin-bottom: 0.5rem;
            line-height: 1.6;
          }
        }
      }
    }
  }
}

.experience-button {
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 1.5rem;
  font-family: 'Lora', serif;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px var(--shadow-color);
  
  &:hover {
    background-color: darken(#bca979, 10%);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
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
  }
}

/* Responsive Styles */
@media (max-width: 768px) {
  .epitaph-header {
    h1 {
      font-size: 2.2rem;
    }
    
    .quote {
      font-size: 1rem;
      padding: 0 1rem;
    }
  }
  
  .experience-intro {
    padding: 1.5rem;
    
    p {
      font-size: 1rem;
    }
  }
  
  .step-item {
    padding-left: 1.5rem;
    
    .step-header {
      flex-direction: column;
      align-items: flex-start;
      padding: 1.2rem 1.5rem;
      
      h3 {
        font-size: 1.3rem;
        margin-bottom: 0.5rem;
      }
    }
    
    .work-details {
      flex-direction: column;
      padding: 1.5rem;
      gap: 1.5rem;
      
      .work-image {
        flex: none;
        width: 100%;
        
        img {
          width: 100%;
          height: auto;
          max-height: 200px;
        }
      }
    }
  }
  
  .experience-conclusion {
    padding: 1.5rem;
    
    p {
      font-size: 1rem;
    }
  }
}

@media (max-width: 480px) {
  .experience-container {
    padding: 1.5rem 1rem;
  }
  
  .epitaph-header {
    margin-bottom: 2rem;
    
    h1 {
      font-size: 1.8rem;
    }
  }
  
  .step-item {
    .step-number {
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
      left: -20px;
    }
    
    .step-content {
      border-radius: 6px;
    }
    
    .step-header {
      padding: 1rem;
      
      h3 {
        font-size: 1.2rem;
      }
    }
    
    .work-details {
      padding: 1rem;
    }
  }
}
</style> 