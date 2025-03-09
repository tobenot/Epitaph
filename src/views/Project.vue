<template>
  <div class="project" v-if="project">
    <img :src="project.image" :alt="project.title" class="project-image animate-fade-in-up" @click="openLink">
    <div class="project-details animate-fade-in-up" style="animation-delay: 0.2s;">
      <h2>{{ project.title }}</h2>
      <p>{{ project.description }}</p>
      <a :href="project.link" target="_blank" rel="noopener noreferrer" class="project-link">查看项目</a>
    </div>
  </div>
</template>

<script>
import config from '../config'

export default {
  name: 'Project',
  data() {
    return {
      project: null
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
.project {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.project-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.project:hover .project-image {
  transform: scale(1.05);
}

.project-details {
  padding: 2rem;

  h2 {
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
  }
}

.project-link {
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken(#3498db, 10%);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
}
</style>
