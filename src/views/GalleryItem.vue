<template>
  <div class="gallery-item-container" v-if="item">
    <div class="back-link-top">
      <router-link :to="backPath" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        {{ $t(`${galleryType}.backToList`) }}
      </router-link>
    </div>

    <div class="gallery-item-header">
      <div class="frame-decoration">
        <div class="frame-corner top-left"></div>
        <div class="frame-corner top-right"></div>
        <div class="frame-corner bottom-left"></div>
        <div class="frame-corner bottom-right"></div>
      </div>
      <h1>{{ item.titleKey[currentLocale] || item.titleKey.zh }}</h1>
      <div class="decorative-line"></div>
    </div>

    <div class="gallery-item-content">
      <div class="item-image-wrapper">
        <img
          :src="item.image"
          :alt="item.titleKey[currentLocale] || item.titleKey.zh"
          class="item-image"
        >
      </div>

      <div class="item-meta" v-if="hasMeta">
        <span class="meta-chip" v-if="item.date">{{ formatDate(item.date) }}</span>
        <span class="meta-chip" v-if="item.medium">
          {{ item.medium[currentLocale] || item.medium.zh }}
        </span>
        <span class="meta-chip" v-if="item.location">
          {{ item.location[currentLocale] || item.location.zh }}
        </span>
      </div>

      <p class="item-description" v-if="item.descriptionKey">
        {{ item.descriptionKey[currentLocale] || item.descriptionKey.zh }}
      </p>
    </div>
  </div>

  <div class="gallery-item-container" v-else>
    <div class="back-link-top">
      <router-link :to="backPath" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        {{ $t(`${galleryType}.backToList`) }}
      </router-link>
    </div>
    <p class="not-found">{{ $t('gallery.notFound') }}</p>
  </div>
</template>

<script>
import config from '../config'
import { formatDate } from '../utils/date'

export default {
  name: 'GalleryItem',
  computed: {
    currentLocale() {
      return this.$i18n.locale
    },
    galleryType() {
      return this.$route.meta?.type || 'paintings'
    },
    backPath() {
      return this.galleryType === 'paintings' ? '/paintings' : '/photographs'
    },
    gallery() {
      return config.galleries?.find(g => g.id === this.galleryType) || null
    },
    item() {
      return this.gallery?.items.find(i => i.id === this.$route.params.itemId) || null
    },
    hasMeta() {
      return !!(this.item && (this.item.date || this.item.medium || this.item.location))
    }
  },
  methods: {
    formatDate
  }
}
</script>

<style scoped lang="scss">
.gallery-item-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
  position: relative;
}

.back-link-top {
  position: fixed;
  top: 5.5rem;
  right: 1.5rem;
  z-index: 100;
}

.back-button {
  display: inline-flex;
  align-items: center;
  font-family: 'Lora', serif;
  font-size: 0.9rem;
  color: var(--primary-color);
  text-decoration: none;
  white-space: nowrap;
  padding: 0.5rem 1rem;
  border: 1px solid var(--accent-color);
  border-radius: 4px;
  background-color: var(--card-bg);
  box-shadow: 0 2px 8px var(--shadow-color);
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    margin-right: 0.5rem;
    flex-shrink: 0;
  }

  &:hover {
    background-color: var(--accent-color);
    color: white;
    border-color: var(--accent-color);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px var(--shadow-color);
  }
}

.gallery-item-header {
  text-align: center;
  margin-bottom: 2.5rem;
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
        top: 0; left: 0;
        border-top: 1px solid; border-left: 1px solid;
      }
      &.top-right {
        top: 0; right: 0;
        border-top: 1px solid; border-right: 1px solid;
      }
      &.bottom-left {
        bottom: 0; left: 0;
        border-bottom: 1px solid; border-left: 1px solid;
      }
      &.bottom-right {
        bottom: 0; right: 0;
        border-bottom: 1px solid; border-right: 1px solid;
      }
    }
  }

  h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
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

.gallery-item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8rem;
}

.item-image-wrapper {
  overflow: hidden;
  border-radius: 6px;
  box-shadow: 0 10px 30px var(--shadow-color);
  width: 100%;
  max-width: 820px;
  background-color: var(--card-bg);
}

.item-image {
  width: 100%;
  height: auto;
  display: block;
}

.item-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;

  .meta-chip {
    background: rgba(0, 0, 0, 0.04);
    color: var(--secondary-color);
    font-family: 'Lora', serif;
    font-style: italic;
    font-size: 0.85rem;
    padding: 0.2rem 0.7rem;
    border-radius: 4px;
  }
}

.item-description {
  font-family: 'Lora', serif;
  font-size: 1.08rem;
  line-height: 1.9;
  color: var(--secondary-color);
  white-space: pre-line;
  max-width: 720px;
  text-align: center;
}

.not-found {
  text-align: center;
  margin-top: 4rem;
  color: var(--secondary-color);
  font-style: italic;
  font-family: 'Lora', serif;
}

@media (max-width: 768px) {
  .gallery-item-container {
    padding: 1.5rem 1rem;
  }

  .gallery-item-header h1 {
    font-size: 2rem;
  }

  .back-link-top {
    position: static;
    margin-bottom: 1.5rem;

    .back-button {
      box-shadow: none;
    }
  }
}
</style>
