<template>
  <div class="gallery-item-container" v-if="item">
    <BackButton :to="backPath">{{ $t(`${galleryType}.backToList`) }}</BackButton>

    <PageHeader>{{ item.titleKey[currentLocale] || item.titleKey.zh }}</PageHeader>

    <div class="gallery-item-content">
      <div class="item-image-wrapper">
        <img
          :src="item.image"
          :alt="item.titleKey[currentLocale] || item.titleKey.zh"
          class="item-image"
          decoding="async"
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

      <nav class="item-nav" v-if="prevItem || nextItem" :aria-label="$t(`${galleryType}.title`)">
        <router-link
          v-if="prevItem"
          :to="{ name: routeName, params: { itemId: prevItem.id } }"
          class="item-nav-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>
          {{ $t('common.actions.prev') }}
        </router-link>
        <router-link
          v-if="nextItem"
          :to="{ name: routeName, params: { itemId: nextItem.id } }"
          class="item-nav-btn"
        >
          {{ $t('common.actions.next') }}
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </router-link>
      </nav>
    </div>
  </div>

  <div class="gallery-item-container" v-else>
    <BackButton :to="backPath">{{ $t(`${galleryType}.backToList`) }}</BackButton>
    <p class="not-found">{{ $t('gallery.notFound') }}</p>
  </div>
</template>

<script>
import config from '../config'
import { formatDate } from '../utils/date'
import PageHeader from '@/components/PageHeader.vue'
import BackButton from '@/components/BackButton.vue'

export default {
  name: 'GalleryItem',
  components: { PageHeader, BackButton },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    },
    galleryType() {
      return this.$route.meta?.type || 'paintings'
    },
    routeName() {
      return this.galleryType === 'paintings' ? 'Painting' : 'Photograph'
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
    itemIndex() {
      if (!this.gallery || !this.item) return -1
      return this.gallery.items.findIndex(i => i.id === this.item.id)
    },
    prevItem() {
      return this.itemIndex > 0 ? this.gallery.items[this.itemIndex - 1] : null
    },
    nextItem() {
      return this.itemIndex >= 0 && this.itemIndex < this.gallery.items.length - 1
        ? this.gallery.items[this.itemIndex + 1]
        : null
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

  :deep(.page-header) {
    margin-bottom: 2.5rem;
  }

  :deep(.page-title) {
    font-size: 2.5rem;
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
    font-family: var(--font-body);
    font-style: italic;
    font-size: 0.85rem;
    padding: 0.2rem 0.7rem;
    border-radius: 4px;
  }
}

.item-description {
  font-family: var(--font-body);
  font-size: 1.08rem;
  line-height: 1.9;
  color: var(--secondary-color);
  white-space: pre-line;
  max-width: 720px;
  text-align: center;
}

.item-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.item-nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--primary-color);
  text-decoration: none;
  padding: 0.45rem 1.1rem;
  border: 1px solid rgba(var(--accent-color-rgb), 0.6);
  border-radius: 4px;
  background-color: var(--card-bg);
  transition: all var(--duration-normal) ease;

  &:hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px var(--shadow-color);
  }
}

.not-found {
  text-align: center;
  margin-top: 4rem;
  color: var(--secondary-color);
  font-style: italic;
  font-family: var(--font-body);
}

@media (max-width: 768px) {
  .gallery-item-container {
    padding: 1.5rem 1rem;
  }

  .gallery-item-container :deep(.page-title) {
    font-size: 2rem;
  }
}
</style>
