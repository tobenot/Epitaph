<template>
  <div class="project-container" v-if="project">
    <div class="back-link-top">
      <router-link to="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        {{ $t('common.actions.back') }}
      </router-link>
    </div>

    <div class="project-header">
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
      <div class="project-image-wrapper" v-if="projectImage">
        <img :src="projectImage" :alt="project.titleKey[currentLocale]" class="project-image">
      </div>
      
      <div class="project-details">
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

          <div class="description" v-html="hasLongDescription ? project.longDescriptionKey[currentLocale] : project.descriptionKey[currentLocale]"></div>

          <!-- Developer Notes -->
          <div class="developer-notes" v-if="project.developerNotesKey && project.developerNotesKey[currentLocale]">
            <h4>{{ $t('project.developerNotes') }}</h4>
            <blockquote>{{ project.developerNotesKey[currentLocale] }}</blockquote>
          </div>

          <!-- Multi-links support -->
          <div class="project-links" v-if="project.links && project.links.length">
            <a v-for="(link, index) in project.links" :key="index" :href="link.url" target="_blank" rel="noopener noreferrer" class="project-link">
              <span class="link-icon" v-html="getLinkIcon(link.type)"></span>
              <span>{{ link.textKey ? link.textKey[currentLocale] : $t('common.actions.viewProject') }}</span>
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

    <div class="series-section" v-if="seriesMembers.length > 1">
      <h2>{{ $t('project.series') }}：{{ seriesMeta.titleKey[currentLocale] }}</h2>
      <p class="series-desc" v-if="seriesMeta.descriptionKey">{{ seriesMeta.descriptionKey[currentLocale] }}</p>
      <div class="decorative-line"></div>
      <div class="series-list">
        <router-link
          v-for="item in seriesMembers"
          :key="item.slug"
          :to="{ name: 'Project', params: { slug: item.slug } }"
          :class="['series-card', { current: item.slug === project.slug }]"
        >
          <div class="series-card-image" v-if="getSeriesImage(item)">
            <img :src="getSeriesImage(item)" :alt="item.titleKey[currentLocale]">
          </div>
          <div class="series-card-body">
            <h3>{{ item.titleKey[currentLocale] }}</h3>
            <p>{{ item.descriptionKey[currentLocale] }}</p>
            <span v-if="item.slug === project.slug" class="series-current">{{ $t('project.seriesCurrent') }}</span>
          </div>
        </router-link>
      </div>
    </div>
    
    <div class="back-link">
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
import { fetchBilibiliCover } from '@/utils/bilibili'

export default {
  name: 'Project',
  setup() {
    const { t, locale } = useI18n()
    return { t, locale }
  },
  data() {
    return {
      project: null,
      bilibiliCoverUrl: null,
      seriesCovers: {}
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    },
    seriesMeta() {
      if (!this.project?.series) return null
      return config.series[this.project.series] || null
    },
    seriesMembers() {
      if (!this.seriesMeta) return []
      const bySlug = new Map(config.projects.map(p => [p.slug, p]))
      return this.seriesMeta.slugs.map(slug => bySlug.get(slug)).filter(Boolean)
    },
    hasLongDescription() {
      return this.project && 
             this.project.longDescriptionKey && 
             this.project.longDescriptionKey[this.currentLocale] && 
             this.project.longDescriptionKey[this.currentLocale].trim() !== '';
    },
    hasMetadata() {
      return this.project && (this.project.engine || (this.project.platform && this.project.platform.length) || this.project.scale || this.project.roles);
    },
    projectImage() {
      if (this.project?.bilibiliVideoId) {
        return this.bilibiliCoverUrl || this.project.image || null
      }
      return this.project?.image || null
    }
  },
  methods: {
    async loadProject(slug) {
      this.project = config.projects.find(p => p.slug === slug || p.id === parseInt(slug))
      this.bilibiliCoverUrl = null
      if (this.project?.bilibiliVideoId) {
        try {
          this.bilibiliCoverUrl = await fetchBilibiliCover(this.project.bilibiliVideoId)
        } catch {}
      }
      this.fetchSeriesCovers()
    },
    fetchSeriesCovers() {
      if (!this.seriesMembers.length) return
      this.seriesMembers.forEach(async item => {
        if (!item.bilibiliVideoId || this.seriesCovers[item.id]) return
        try {
          const url = await fetchBilibiliCover(item.bilibiliVideoId)
          this.seriesCovers = { ...this.seriesCovers, [item.id]: url }
        } catch {}
      })
    },
    getSeriesImage(item) {
      if (item.bilibiliVideoId) {
        return this.seriesCovers[item.id] || item.image || null
      }
      return item.image || null
    },
    getLinkIcon(type) {
      const a = 'xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"'
      const icons = {
        bilibili: `<svg ${a} fill="currentColor"><path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.373c-.25-.249-.383-.57-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.373c-.25-.249-.383-.57-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/></svg>`,
        steam: `<svg ${a} fill="currentColor"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.606 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.455 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z"/></svg>`,
        vrchat: `<svg ${a} fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="8" width="20" height="10" rx="3"/><circle cx="8.5" cy="13" r="1.5"/><circle cx="15.5" cy="13" r="1.5"/><path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg>`,
        blog: `<svg ${a} fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="16" y2="11"/></svg>`,
        download: `<svg ${a} fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
        github: `<svg ${a} fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
        itch: `<svg ${a} fill="currentColor"><path d="M3.13 1.338C2.08 1.96.02 4.328 0 4.95v1.03c0 1.303 1.22 2.45 2.325 2.45 1.33 0 2.436-1.102 2.436-2.41 0 1.308 1.07 2.41 2.4 2.41 1.328 0 2.362-1.102 2.362-2.41 0 1.308 1.104 2.41 2.434 2.41h.024c1.33 0 2.434-1.102 2.434-2.41 0 1.308 1.034 2.41 2.363 2.41 1.33 0 2.4-1.102 2.4-2.41 0 1.308 1.105 2.41 2.435 2.41C22.78 8.43 24 7.283 24 5.98V4.95c-.02-.622-2.08-2.99-3.13-3.612C19.948 1.002 12.256.988 12 .988c-.256 0-7.948.014-8.87.35zM9.6 9.84a3.73 3.73 0 0 1-1.696-.408c-.468.252-.993.408-1.56.408-.568 0-1.092-.156-1.56-.408-.516.264-1.108.408-1.73.408-.1 0-.194-.006-.29-.014V17.5c0 .1 1.37 2.5 9.236 2.5 7.865 0 9.236-2.4 9.236-2.5V9.826c-.096.008-.19.014-.29.014-.623 0-1.215-.144-1.73-.408-.468.252-.993.408-1.56.408-.567 0-1.09-.156-1.56-.408a3.73 3.73 0 0 1-1.696.408 3.73 3.73 0 0 1-1.696-.408c-.468.252-.993.408-1.56.408-.568 0-1.092-.156-1.56-.408A3.73 3.73 0 0 1 9.6 9.84zm-2.12 2.535h9.04l.586 1.805H14.96v4.78h-5.92v-4.78H7.894l-.414-1.805z"/></svg>`,
      }
      const defaultIcon = `<svg ${a} fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`
      return icons[type] || defaultIcon
    }
  },
  watch: {
    '$route.params.slug': {
      immediate: false,
      handler(slug) {
        this.loadProject(slug)
        window.scrollTo(0, 0)
      }
    }
  },
  created() {
    this.loadProject(this.$route.params.slug)
  }
}
</script>

<style scoped lang="scss">
.project-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  position: relative;
}

.back-link-top {
  position: absolute;
  top: 2rem;
  right: 1rem;
  z-index: 1;

  a {
    display: inline-flex;
    align-items: center;
    font-family: 'Lora', serif;
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s ease;
    white-space: nowrap;

    svg {
      margin-right: 0.5rem;
      flex-shrink: 0;
    }

    &:hover {
      color: var(--accent-color);
    }
  }
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
    &.halted { background: #fff3e0; color: #e65100; }
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
  
  .link-icon {
    display: inline-flex;
    align-items: center;
    margin-right: 0.5rem;
    flex-shrink: 0;
  }

  svg {
    margin-left: 0.5rem;
  }

  &:hover {
    background-color: var(--accent-color);
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
}

.series-section {
  max-width: 750px;
  margin: 0 auto 3rem;
  padding: 0 1rem;

  h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    color: var(--primary-color);
    text-align: center;
    margin-bottom: 0.75rem;
  }

  .series-desc {
    font-family: 'Lora', serif;
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--secondary-color);
    text-align: center;
    margin-bottom: 1rem;
  }

  .decorative-line {
    width: 80px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
    margin: 0 auto 1.5rem;
  }
}

.series-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.series-card {
  display: flex;
  gap: 1rem;
  background-color: var(--card-bg);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 3px 10px var(--shadow-color);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: rgba(var(--accent-color-rgb), 0.4);
    box-shadow: 0 6px 16px var(--shadow-color);
  }

  &.current {
    border-color: var(--accent-color);
    background-color: rgba(var(--accent-color-rgb), 0.05);
  }
}

.series-card-image {
  flex-shrink: 0;
  width: 120px;
  height: 68px;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.series-card-body {
  flex: 1;
  min-width: 0;

  h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: var(--primary-color);
    margin: 0 0 0.4rem;
    line-height: 1.35;
  }

  p {
    font-family: 'Lora', serif;
    font-size: 0.85rem;
    line-height: 1.5;
    color: var(--secondary-color);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .series-current {
    display: inline-block;
    margin-top: 0.5rem;
    font-family: 'Lora', serif;
    font-size: 0.75rem;
    color: var(--accent-color);
    letter-spacing: 0.05em;
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
  .back-link-top {
    position: static;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }

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
