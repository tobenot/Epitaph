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
      <transition name="fade" mode="out-in">
        <div v-if="currentGallery" :key="$route.path + '-' + activeGallery" class="current-gallery">
          <!-- 仅在总画廊页面显示子画廊标题 -->
          <h2 class="gallery-title" v-if="$route.path === '/gallery'">
            {{ currentGallery.titleKey[$i18n.locale] || currentGallery.titleKey.zh }}
          </h2>
          <p class="gallery-description" v-if="$route.path === '/gallery'">
            {{ currentGallery.descriptionKey[$i18n.locale] || currentGallery.descriptionKey.zh }}
          </p>

          <div class="gallery-grid">
            <div 
              v-for="item in currentGallery.items" 
              :key="item.id" 
              class="gallery-item"
              @click="openLightbox(item)"
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
            </div>
          </div>
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
      </transition>
    </div>

    <!-- 灯箱 -->
    <div v-if="lightbox.visible" class="lightbox" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button class="lightbox-close" @click="closeLightbox">&times;</button>
        <img :src="lightbox.item.image" :alt="lightbox.item.titleKey[$i18n.locale] || lightbox.item.titleKey.zh" class="lightbox-image" />
        <div class="lightbox-details">
          <h3 class="lightbox-title">{{ lightbox.item.titleKey[$i18n.locale] || lightbox.item.titleKey.zh }}</h3>
          <p class="lightbox-description">{{ lightbox.item.descriptionKey[$i18n.locale] || lightbox.item.descriptionKey.zh }}</p>
          <p class="lightbox-metadata">
            <span v-if="lightbox.item.date">{{ formatDate(lightbox.item.date) }}</span>
            <span v-if="lightbox.item.medium" class="lightbox-medium">
              {{ lightbox.item.medium[$i18n.locale] || lightbox.item.medium.zh }}
            </span>
            <span v-if="lightbox.item.location" class="lightbox-location">
              {{ lightbox.item.location[$i18n.locale] || lightbox.item.location.zh }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config';

export default {
  name: 'GalleryView',
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
      lightbox: {
        visible: false,
        item: null
      }
    };
  },
  computed: {
    currentGallery() {
      if (!this.activeGallery) return null;
      return this.galleries.find(gallery => gallery.id === this.activeGallery);
    }
  },
  created() {
    // 如果提供了默认画廊类型，则设置为活跃类型
    if (this.defaultGalleryType && this.galleries.some(gallery => gallery.id === this.defaultGalleryType)) {
      this.activeGallery = this.defaultGalleryType;
    } 
    // 否则设置默认显示的画廊
    else if (this.galleries.length > 0) {
      this.activeGallery = this.galleries[0].id;
    }
  },
  watch: {
    // 监听路由变化，确保在路由切换时更新当前显示的画廊
    $route(to, from) {
      // 根据路由路径设置对应的画廊
      if (to.path === '/paintings' && this.galleries.some(gallery => gallery.id === 'paintings')) {
        this.activeGallery = 'paintings';
      } 
      else if (to.path === '/photographs' && this.galleries.some(gallery => gallery.id === 'photographs')) {
        this.activeGallery = 'photographs';
      }
      // 如果是回到主画廊页面，使用默认设置
      else if (to.path === '/gallery' && this.galleries.length > 0) {
        this.activeGallery = this.galleries[0].id;
      }
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return '';
      let formatted = date.year.toString();
      if (date.month) {
        formatted += '.' + date.month.toString().padStart(2, '0');
      }
      return formatted;
    },
    openLightbox(item) {
      this.lightbox.item = item;
      this.lightbox.visible = true;
      document.body.style.overflow = 'hidden'; // 防止背景滚动
    },
    closeLightbox() {
      this.lightbox.visible = false;
      this.lightbox.item = null;
      document.body.style.overflow = ''; // 恢复背景滚动
    }
  }
}
</script>

<style scoped>
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
  color: #666;
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
  color: #666;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.gallery-item {
  cursor: pointer;
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

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  z-index: 10;
}

.lightbox-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
}

.lightbox-details {
  padding: 1.5rem;
}

.lightbox-title {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.lightbox-description {
  margin-bottom: 1rem;
  line-height: 1.5;
}

.lightbox-metadata {
  font-size: 0.9rem;
  color: #666;
}

.lightbox-medium, .lightbox-location {
  margin-left: 1rem;
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .lightbox-content {
    max-width: 95%;
  }
}
</style> 