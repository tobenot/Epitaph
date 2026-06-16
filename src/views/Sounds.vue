<template>
  <div class="sounds-container">
    <div class="sounds-header">
      <h1 class="page-title">{{ $t('sounds.title') }}</h1>
      <p class="page-description">{{ $t('sounds.description') }}</p>
    </div>

    <div class="sounds-grid">
      <div class="sound-card" v-for="sound in paginatedSounds" :key="sound.id">
        <div class="card-content">
          <div class="card-header">
            <h3>{{ sound.titleKey[$i18n.locale] || sound.titleKey.zh }}</h3>
          </div>
          <p class="card-desc">{{ sound.descriptionKey[$i18n.locale] || sound.descriptionKey.zh }}</p>
          <div class="card-tags">
            <span class="small-tag">{{ sound.genre[$i18n.locale] || sound.genre.zh }}</span>
          </div>
          <div class="card-footer" v-if="sound.date">
            <span class="card-footer-date">{{ formatDate(sound.date) }}</span>
          </div>
        </div>

        <div class="audio-player">
          <audio
            controls
            :src="sound.audioFile"
            class="audio-element"
            controlsList="nodownload"
          ></audio>

          <div v-if="sound.lyricsKey" class="lyrics-toggle">
            <button @click="toggleLyrics(sound.id)" class="lyrics-btn">
              {{ showLyrics[sound.id] ? $t('sounds.hideLyrics') : $t('sounds.showLyrics') }}
            </button>

            <div v-if="showLyrics[sound.id]" class="lyrics-content">
              <p>{{ sound.lyricsKey[$i18n.locale] || sound.lyricsKey.zh }}</p>
            </div>
          </div>
        </div>
      </div>
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
      showLyrics: {},
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
    toggleLyrics(soundId) {
      this.showLyrics[soundId] = !this.showLyrics[soundId];
    },
    handlePageChange(page) {
      this.currentPage = page;
      window.scrollTo(0, 0);
    }
  }
}
</script>

<style scoped lang="scss">
.sounds-container {
  max-width: 1400px;
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
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
}

.sound-card {
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 5px 15px var(--shadow-color);
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px var(--shadow-color);
  }
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-header {
  margin-bottom: 0.75rem;

  h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    line-height: 1.35;
    color: var(--primary-color);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.card-desc {
  font-family: 'Lora', serif;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--secondary-color);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.75rem;

  .small-tag {
    background: rgba(0, 0, 0, 0.04);
    color: var(--secondary-color);
    font-size: 0.75rem;
    padding: 0.1rem 0.5rem;
    border-radius: 4px;
    font-family: 'Lora', serif;
  }
}

.card-footer {
  margin-top: auto;
  padding-top: 0.75rem;
  font-family: 'Lora', serif;
  font-size: 0.75rem;
  color: var(--secondary-color);
  opacity: 0.7;
}

.audio-player {
  padding: 0 1rem 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: 0.75rem;
  margin: 0 1rem 1rem;
}

.audio-element {
  width: 100%;
  height: 32px;
}

.lyrics-toggle {
  margin-top: 0.5rem;
}

.lyrics-btn {
  background: none;
  border: 1px solid var(--accent-color);
  color: var(--secondary-color);
  padding: 0.3rem 0.75rem;
  border-radius: 4px;
  font-family: 'Lora', serif;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(var(--accent-color-rgb), 0.1);
  }
}

.lyrics-content {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 4px;
  white-space: pre-line;
  line-height: 1.6;
  font-family: 'Lora', serif;
  font-size: 0.8rem;
  color: var(--secondary-color);
  max-height: 120px;
  overflow-y: auto;
}

.no-sounds {
  text-align: center;
  margin-top: 3rem;
  color: var(--secondary-color);
  font-style: italic;
  font-family: 'Lora', serif;
}

@media (max-width: 1200px) {
  .sounds-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .sounds-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
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
