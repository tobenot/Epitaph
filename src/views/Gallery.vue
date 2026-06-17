<template>
  <div class="gallery-container">
    <div class="gallery-header">
      <h1 class="page-title">
        <template v-if="$route.path === '/paintings'">
          {{ $t('paintings.title') }}
        </template>
        <template v-else-if="$route.path === '/photographs'">
          {{ $t('photographs.title') }}
        </template>
        <template v-else>
          {{ $t('gallery.title') }}
        </template>
      </h1>
      <p class="page-description">
        <template v-if="$route.path === '/paintings'">
          {{ $t('paintings.description') }}
        </template>
        <template v-else-if="$route.path === '/photographs'">
          {{ $t('photographs.description') }}
        </template>
        <template v-else>
          {{ $t('gallery.description') }}
        </template>
      </p>
    </div>

    <!-- 画廊分类导航 - 只在总画廊页面显示 -->
    <div class="gallery-nav" v-if="$route.path === '/gallery'">
      <button
        v-for="gallery in galleries"
        :key="gallery.id"
        :class="['gallery-nav-btn', { active: activeGallery === gallery.id }]"
        @click="activeGallery = gallery.id"
      >
        {{ gallery.titleKey[$i18n.locale] || gallery.titleKey.zh }}
      </button>
    </div>

    <!-- 画廊内容 -->
    <div class="gallery-content">
      <div v-if="currentGallery" :key="$route.path + '-' + activeGallery" class="current-gallery">
          <!-- 仅在总画廊页面显示子画廊标题 -->
          <h2 class="gallery-title" v-if="$route.path === '/gallery'">
            {{ currentGallery.titleKey[$i18n.locale] || currentGallery.titleKey.zh }}
          </h2>
          <p class="gallery-description" v-if="$route.path === '/gallery'">
            {{ currentGallery.descriptionKey[$i18n.locale] || currentGallery.descriptionKey.zh }}
          </p>

          <div class="gallery-grid">
            <router-link
              v-for="item in paginatedGalleryItems"
              :key="item.id"
              :to="itemLink(item)"
              class="gallery-item"
            >
              <div class="item-image-container">
                <img :src="item.image" :alt="item.titleKey[$i18n.locale] || item.titleKey.zh" class="item-image" />
              </div>
              <div class="item-details">
                <h3 class="item-title">{{ item.titleKey[$i18n.locale] || item.titleKey.zh }}</h3>
                <p class="item-date">
                  {{ formatDate(item.date) }}
                  <span v-if="item.location" class="item-location">
                    {{ item.location[$i18n.locale] || item.location.zh }}
                  </span>
                </p>
              </div>
            </router-link>
          </div>

          <Pagination
            :current-page="currentGalleryPage"
            :total-pages="currentGalleryTotalPages"
            @page-changed="handleGalleryPageChange"
          />
        </div>
      <div v-else class="no-gallery">
          <template v-if="$route.path === '/paintings'">
            {{ $t('paintings.noPaintings') }}
          </template>
          <template v-else-if="$route.path === '/photographs'">
            {{ $t('photographs.noPhotographs') }}
          </template>
          <template v-else>
            {{ $t('gallery.noGallery') }}
          </template>
        </div>
    </div>
  </div>
</template>

<script>
import config from '@/config';
import Pagination from '@/components/Pagination.vue';
import { formatDate } from '@/utils/date';

export default {
  name: 'GalleryView',
  components: {
    Pagination
  },
  props: {
    defaultGalleryType: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      galleries: config.galleries || [],
      activeGallery: null,
      itemsPerPage: 15,
      galleryPagination: {}
    };
  },
  computed: {
    currentGallery() {
      if (!this.activeGallery) return null;
      return this.galleries.find(gallery => gallery.id === this.activeGallery);
    },
    currentGalleryPage() {
      return this.galleryPagination[this.activeGallery] || 1;
    },
    currentGalleryTotalPages() {
      if (!this.currentGallery) return 0;
      return Math.ceil(this.currentGallery.items.length / this.itemsPerPage);
    },
    paginatedGalleryItems() {
      if (!this.currentGallery) return [];
      const start = (this.currentGalleryPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.currentGallery.items.slice(start, end);
    }
  },
  created() {
    if (this.defaultGalleryType && this.galleries.some(gallery => gallery.id === this.defaultGalleryType)) {
      this.activeGallery = this.defaultGalleryType;
    }
    else if (this.galleries.length > 0) {
      this.activeGallery = this.galleries[0].id;
    }
    this.initializePagination();
  },
  watch: {
    $route(to, from) {
      if (to.path === '/paintings' && this.galleries.some(gallery => gallery.id === 'paintings')) {
        this.activeGallery = 'paintings';
      }
      else if (to.path === '/photographs' && this.galleries.some(gallery => gallery.id === 'photographs')) {
        this.activeGallery = 'photographs';
      }
      else if (to.path === '/gallery' && this.galleries.length > 0) {
        this.activeGallery = this.galleries[0].id;
      }
      if (to.path !== from.path) {
         this.initializePagination();
      }
    }
  },
  methods: {
    initializePagination() {
        this.galleries.forEach(gallery => {
            if (!(gallery.id in this.galleryPagination)) {
                this.galleryPagination[gallery.id] = 1;
            }
        });
    },
    formatDate,
    itemLink(item) {
      // 绘画 → /painting/:id，摄影 → /photograph/:id
      return this.activeGallery === 'photographs'
        ? `/photograph/${item.id}`
        : `/painting/${item.id}`;
    },
    handleGalleryPageChange(page) {
      if (this.activeGallery) {
          this.galleryPagination[this.activeGallery] = page;
          window.scrollTo(0, 0);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.gallery-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.gallery-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.page-description {
  font-size: 1.1rem;
  color: var(--secondary-color);
}

.gallery-nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.gallery-nav-btn {
  padding: 0.5rem 1.5rem;
  background: none;
  border: 1px solid #ddd;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.gallery-nav-btn.active {
  background-color: #000;
  color: #fff;
  border-color: #000;
}

.gallery-content {
  min-height: 400px;
}

.gallery-title {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.gallery-description {
  font-size: 1rem;
  margin-bottom: 2rem;
  color: var(--secondary-color);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.gallery-item {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-5px);
}

.item-image-container {
  aspect-ratio: 3/2;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 0.8rem;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover .item-image {
  transform: scale(1.05);
}

.item-title {
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
}

.item-date {
  font-size: 0.9rem;
  color: #777;
}

.item-location {
  margin-left: 0.5rem;
}

.no-gallery {
  text-align: center;
  color: var(--secondary-color);
  font-style: italic;
  font-family: 'Lora', serif;
  margin-top: 2rem;
}

/* Responsive styles */
@media (max-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.2rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 1.8rem;
  }
}
</style>
