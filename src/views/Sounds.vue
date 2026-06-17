<template>
  <div class="sounds-container">
    <div class="sounds-header">
      <h1 class="page-title">{{ $t('sounds.title') }}</h1>
      <p class="page-description">{{ $t('sounds.description') }}</p>
    </div>

    <div class="sounds-grid">
      <router-link
        v-for="sound in paginatedSounds"
        :key="sound.id"
        :to="`/sound/${sound.id}`"
        class="sound-card"
      >
        <div class="card-body">
          <div class="card-text">
            <h3>{{ sound.titleKey[$i18n.locale] || sound.titleKey.zh }}</h3>
            <p class="card-desc">{{ sound.descriptionKey[$i18n.locale] || sound.descriptionKey.zh }}</p>
            <div class="card-tags">
              <span class="small-tag">{{ sound.genre[$i18n.locale] || sound.genre.zh }}</span>
              <span class="small-tag" v-if="sound.date">{{ formatDate(sound.date) }}</span>
            </div>
          </div>
          <div class="card-cta">
            <span class="cta-text">{{ $t('sounds.listen') }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </div>
        </div>
      </router-link>
    </div>

    <div v-if="sounds.length === 0" class="no-sounds">
      {{ $t('sounds.noSounds') }}
    </div>

    <Pagination
      v-if="totalPages > 1"
      :totalPages="totalPages"
      :currentPage="currentPage"
      @page-changed="handlePageChange"
    ></Pagination>
  </div>
</template>

<script>
import config from '@/config';
import Pagination from '@/components/Pagination.vue';
import { formatDate } from '@/utils/date';

export default {
  name: 'SoundsView',
  components: {
    Pagination
  },
  data() {
    return {
      sounds: config.sounds || [],
      currentPage: 1,
      itemsPerPage: 12
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.sounds.length / this.itemsPerPage);
    },
    paginatedSounds() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sounds.slice(start, end);
    }
  },
  methods: {
    formatDate,
    handlePageChange(page) {
      this.currentPage = page;
      window.scrollTo(0, 0);
    }
  }
}
</script>

<style scoped lang="scss">
.sounds-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.sounds-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.page-description {
  font-family: 'Lora', serif;
  font-size: 1.1rem;
  color: var(--secondary-color);
}

.sounds-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

.sound-card {
  display: block;
  text-decoration: none;
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 5px 15px var(--shadow-color);
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px var(--shadow-color);
    border-color: rgba(var(--accent-color-rgb), 0.4);

    .card-cta {
      color: var(--accent-color);
    }
  }
}

.card-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  padding: 1.5rem 1.6rem;
}

.card-text {
  flex: 1;
  min-width: 0;

  h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    line-height: 1.35;
    color: var(--primary-color);
    margin: 0 0 0.5rem;
  }
}

.card-desc {
  font-family: 'Lora', serif;
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--secondary-color);
  margin: 0 0 0.7rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;

  .small-tag {
    background: rgba(0, 0, 0, 0.04);
    color: var(--secondary-color);
    font-size: 0.72rem;
    padding: 0.1rem 0.5rem;
    border-radius: 4px;
    font-family: 'Lora', serif;
  }
}

.card-cta {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  color: var(--secondary-color);
  transition: color 0.3s ease;
  padding-left: 0.5rem;
  border-left: 1px solid rgba(0, 0, 0, 0.06);
  padding-left: 1.2rem;

  .cta-text {
    font-family: 'Lora', serif;
    font-style: italic;
    font-size: 0.78rem;
    white-space: nowrap;
  }
}

.no-sounds {
  text-align: center;
  margin-top: 3rem;
  color: var(--secondary-color);
  font-style: italic;
  font-family: 'Lora', serif;
}

@media (max-width: 768px) {
  .sounds-container {
    padding: 1.5rem 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .sounds-grid {
    grid-template-columns: 1fr;
  }
}
</style>
