<template>
  <div class="home">
    <h1 class="site-title animate-fade-in-up">{{ siteTitle }}</h1>
    <div class="projects-grid">
      <div v-for="(project, index) in projects" 
           :key="project.id" 
           class="project-card animate-fade-in-up" 
           :style="{ animationDelay: `${index * 0.1}s` }"
           @click="openProjectLink(project.link)">
        <img :src="project.image" :alt="project.title">
        <div class="project-info">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config'

export default {
  name: 'Home',
  data() {
    return {
      siteTitle: config.siteTitle,
      projects: config.projects
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
.site-title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--primary-color);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  position: relative;

  &::after {
    content: '点击跳转';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    
    &::after {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }

  .project-info {
    padding: 1rem;
    transition: background-color 0.3s ease;

    h3 {
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 0.9rem;
      color: #666;
    }
  }

  &:hover .project-info {
    background-color: rgba(255, 255, 255, 0.9);
  }
}
</style>
