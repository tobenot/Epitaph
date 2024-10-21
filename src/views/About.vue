<template>
  <div class="about">
    <h2 class="animate-fade-in-up">{{ about.title }}</h2>
    <p class="about-content animate-fade-in-up" style="animation-delay: 0.2s;">{{ about.content }}</p>
    <h3 class="animate-fade-in-up" style="animation-delay: 0.4s;">个人作品</h3>
    <div class="personal-works">
      <div v-for="(work, index) in about.personalWorks" 
           :key="work.title" 
           class="work animate-fade-in-up" 
           :style="{ animationDelay: `${0.6 + index * 0.1}s` }">
        <img :src="work.image" :alt="work.title">
        <p>{{ work.title }}</p>
      </div>
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
.about {
  max-width: 800px;
  margin: 0 auto;

  h2 {
    color: var(--primary-color);
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }

  .about-content {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 2rem;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
}

.personal-works {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.work {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }

  p {
    padding: 1rem;
    text-align: center;
    font-weight: 500;
  }
}
</style>
