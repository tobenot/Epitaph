<template>
  <div class="about-container">
    <div class="epitaph-header animate-fade-in-up">
      <div class="frame-decoration">
        <div class="frame-corner top-left"></div>
        <div class="frame-corner top-right"></div>
        <div class="frame-corner bottom-left"></div>
        <div class="frame-corner bottom-right"></div>
      </div>
      <h1>{{ about.title }}</h1>
      <div class="decorative-line"></div>
      <p class="quote">"我们并非为了生而活，而是为了留下痕迹"</p>
    </div>
    
    <div class="about-content-wrapper">
      <div class="about-content animate-fade-in-up" style="animation-delay: 0.2s;">
        <p>{{ about.content }}</p>
      </div>
    </div>
    
    <div class="gallery-section">
      <div class="section-header animate-fade-in-up" style="animation-delay: 0.4s;">
        <h2>痕迹画廊</h2>
        <div class="decorative-line"></div>
      </div>
      
      <div class="personal-works">
        <div v-for="(work, index) in about.personalWorks" 
             :key="work.title" 
             class="work-item animate-fade-in-up" 
             :style="{ animationDelay: `${0.6 + index * 0.1}s` }">
          <div class="work-frame">
            <img :src="work.image" :alt="work.title">
            <div class="work-caption">
              <p>{{ work.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="signature animate-fade-in-up" style="animation-delay: 0.8s;">
      <p>—— tobenot</p>
    </div>
  </div>
</template>

<script>
import config from '../config'

export default {
  name: 'About',
  data() {
    return {
      about: config.about
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

.gallery-section {
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

.personal-works {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
}

.work-item {
  overflow: hidden;
}

.work-frame {
  background-color: var(--card-bg);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 12px var(--shadow-color);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px var(--shadow-color);
    
    img {
      transform: scale(1.08);
      filter: grayscale(0%);
    }
  }
  
  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    transition: all 0.5s ease;
    filter: grayscale(30%);
    display: block;
  }
  
  .work-caption {
    padding: 1.2rem 1rem;
    text-align: center;
    
    p {
      font-family: 'Playfair Display', serif;
      color: var(--primary-color);
      font-weight: 500;
      font-size: 1rem;
    }
  }
}

.signature {
  text-align: right;
  margin-top: 4rem;
  
  p {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 1.5rem;
    color: var(--accent-color);
  }
}

@media (max-width: 768px) {
  .epitaph-header h1 {
    font-size: 2.4rem;
  }
  
  .about-content-wrapper {
    padding: 2rem;
  }
  
  .personal-works {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>
