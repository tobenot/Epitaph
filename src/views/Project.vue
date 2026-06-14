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
        <img :src="project.image" :alt="project.titleKey[currentLocale]" class="project-image">
      </div>
      
      <div class="project-details animate-fade-in-up" style="animation-delay: 0.2s;">
        <div class="details-card">
          <div class="title-with-status">
            <h2>{{ $t('project.aboutWork') }}</h2>
            <span v-if="project.status" :class="['status-badge', project.status]">
              {{ $t(`project.status.${project.status}`) }}
            </span>
          </div>
          
          <!-- Achievements Section -->
          <div class="achievements-section" v-if="project.achievements && project.achievements.length">
            <h3>{{ $t('project.achievements') }}</h3>
            <ul>
              <li v-for="(ach, index) in project.achievements" :key="index">
                {{ typeof ach === 'object' ? ach[currentLocale] : ach }}
              </li>
            </ul>
          </div>

          <!-- Metadata Grid -->
          <div class="metadata-grid" v-if="hasMetadata">
            <div class="metadata-item" v-if="project.engine">
              <span class="meta-label">{{ $t('project.metadata.engine') }}:</span>
              <span class="meta-value">{{ project.engine }}</span>
            </div>
            <div class="metadata-item" v-if="project.platform && project.platform.length">
              <span class="meta-label">{{ $t('project.metadata.platform') }}:</span>
              <span class="meta-value">{{ project.platform.join(', ') }}</span>
            </div>
            <div class="metadata-item" v-if="project.scale">
              <span class="meta-label">{{ $t('project.metadata.scale') }}:</span>
              <span class="meta-value">{{ typeof project.scale === 'object' ? project.scale[currentLocale] : project.scale }}</span>
            </div>
            <div class="metadata-item" v-if="project.roles">
              <span class="meta-label">{{ $t('project.metadata.roles') }}:</span>
              <span class="meta-value">{{ typeof project.roles === 'object' ? project.roles[currentLocale] : project.roles }}</span>
            </div>
          </div>
          
          <div class="tags" v-if="project.tags && project.tags.length">
            <span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>

          <p class="description">{{ hasLongDescription ? project.longDescriptionKey[currentLocale] : project.descriptionKey[currentLocale] }}</p>

          <!-- Developer Notes -->
          <div class="developer-notes" v-if="project.developerNotesKey && project.developerNotesKey[currentLocale]">
            <h4>{{ $t('project.developerNotes') }}</h4>
            <blockquote>{{ project.developerNotesKey[currentLocale] }}</blockquote>
          </div>

          <!-- Multi-links support -->
          <div class="project-links" v-if="project.links && project.links.length">
            <a v-for="(link, index) in project.links" :key="index" :href="link.url" target="_blank" rel="noopener noreferrer" class="project-link">
              <span>{{ link.textKey ? link.textKey[currentLocale] : $t('common.actions.viewProject') }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
          <!-- Fallback to legacy single link -->
          <a v-else-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="project-link">
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
    },
    hasLongDescription() {
      return this.project && 
             this.project.longDescriptionKey && 
             this.project.longDescriptionKey[this.currentLocale] && 
             this.project.longDescriptionKey[this.currentLocale].trim() !== '';
    },
    hasMetadata() {
      return this.project && (this.project.engine || (this.project.platform && this.project.platform.length) || this.project.scale || this.project.roles);
    }
  },
  created() {
    const slug = this.$route.params.slug
    this.project = config.projects.find(p => p.slug === slug || p.id === parseInt(slug))
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
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  margin-bottom: 3rem;
}

.project-image-wrapper {
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 10px 25px var(--shadow-color);
  width: 100%;
  max-width: 750px;
}

.project-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
}

.project-details {
  width: 100%;
  max-width: 750px;
}

.details-card {
  background-color: var(--card-bg);
  border-radius: 4px;
  padding: 2rem;
  box-shadow: 0 5px 15px var(--shadow-color);
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  .title-with-status {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    
    h2 {
      font-family: 'Playfair Display', serif;
      color: var(--primary-color);
      margin-bottom: 0;
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
  }

  .status-badge {
    padding: 0.3rem 0.8rem;
    border-radius: 4px;
    font-size: 0.85rem;
    font-family: 'Lora', serif;
    font-weight: bold;
    
    /* New Status */
    &.released { background: #e6f4ea; color: #2e7d32; }
    &.development { background: #e3f2fd; color: #1565c0; }
    &.archived { background: #f5f5f5; color: #616161; }
    &.concept { background: #fff8e1; color: #f57f17; }
    &.private { background: #fce4e4; color: #c62828; }

    /* Legacy Status */
    &.playable { background: #e6f4ea; color: #2e7d32; }
    &.unplayable { background: #fce4e4; color: #c62828; }
    &.video { background: #e3f2fd; color: #1565c0; }
    &.tool { background: #f3e5f5; color: #4527a0; }
    &.reading { background: #fff8e1; color: #6a1b9a; }
  }

  .achievements-section {
    margin-bottom: 1.5rem;
    background: rgba(var(--accent-color-rgb), 0.05);
    padding: 1rem 1.5rem;
    border-left: 4px solid var(--accent-color);
    border-radius: 0 4px 4px 0;

    h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }

    ul {
      margin: 0;
      padding-left: 1.2rem;
      li {
        font-family: 'Lora', serif;
        font-size: 0.95rem;
        color: var(--secondary-color);
        margin-bottom: 0.3rem;
      }
    }
  }

  .metadata-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.1);

    .metadata-item {
      display: flex;
      flex-direction: column;

      .meta-label {
        font-size: 0.8rem;
        color: var(--secondary-color);
        opacity: 0.7;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .meta-value {
        font-family: 'Lora', serif;
        font-size: 1rem;
        color: var(--primary-color);
        font-weight: bold;
      }
    }
  }

  .developer-notes {
    margin-bottom: 2rem;
    
    h4 {
      font-family: 'Playfair Display', serif;
      font-size: 1.1rem;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }

    blockquote {
      margin: 0;
      padding: 1rem 1.5rem;
      background: #f9f9f9;
      border-left: 3px solid #ccc;
      font-family: 'Lora', serif;
      font-style: italic;
      color: #555;
      line-height: 1.6;
      border-radius: 0 4px 4px 0;
    }
  }

  .project-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    
    .tag {
      background: rgba(0, 0, 0, 0.05);
      padding: 0.2rem 0.6rem;
      border-radius: 20px;
      font-size: 0.8rem;
      color: var(--secondary-color);
    }
  }
  
  p.description {
    font-family: 'Lora', serif;
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--secondary-color);
    margin-bottom: 2rem;
    white-space: pre-wrap;
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
