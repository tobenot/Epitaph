<template>
  <div class="sounds-container">
    <div class="sounds-header">
      <h1 class="page-title">{{ $t('sounds.title') }}</h1>
      <p class="page-description">{{ $t('sounds.description') }}</p>
    </div>

    <div class="sounds-grid">
      <div class="sound-card" v-for="sound in paginatedSounds" :key="sound.id">
        <div class="sound-info">
          <h2 class="sound-title">{{ sound.titleKey[$i18n.locale] || sound.titleKey.zh }}</h2>
          <div class="sound-metadata">
            <span class="sound-date">{{ formatDate(sound.date) }}</span>
            <span class="sound-genre">{{ sound.genre[$i18n.locale] || sound.genre.zh }}</span>
          </div>
          <p class="sound-description">{{ sound.descriptionKey[$i18n.locale] || sound.descriptionKey.zh }}</p>
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
      :totalPages="totalPages"
      :currentPage="currentPage"
      @page-changed="handlePageChange"
    ></Pagination>
  </div>
</template>

<script>
import config from '@/config';
import Pagination from '@/components/Pagination.vue';

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
      itemsPerPage: 5
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
    formatDate(date) {
      if (!date) return '';
      let formatted = date.year.toString();
      if (date.month) {
        formatted += '.' + date.month.toString().padStart(2, '0');
      }
      return formatted;
    },
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
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.sounds-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.page-description {
  font-size: 1.1rem;
  color: #666;
}

.sounds-grid {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.sound-card {
  background-color: #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.sound-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.sound-info {
  padding: 1.5rem;
}

.sound-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.sound-metadata {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 1rem;
}

.sound-description {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.audio-player {
  padding: 0 1.5rem 1.5rem;
}

.audio-element {
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 30px;
}

.lyrics-toggle {
  margin-top: 1rem;
}

.lyrics-btn {
  background: none;
  border: 1px solid #ddd;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lyrics-btn:hover {
  background-color: #eee;
}

.lyrics-content {
  margin-top: 1rem;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  white-space: pre-line;
  line-height: 1.8;
  max-height: 300px;
  overflow-y: auto;
}

.no-sounds {
  text-align: center;
  margin-top: 3rem;
  color: #666;
  font-style: italic;
}

/* Responsive styles */
@media (max-width: 768px) {
  .sounds-container {
    padding: 1.5rem 1rem;
  }
  
  .epitaph-header {
    h1 {
      font-size: 2.2rem;
    }
    
    .quote {
      font-size: 1rem;
      padding: 0 1rem;
    }
  }
  
  .sounds-intro {
    padding: 1.5rem;
    
    p {
      font-size: 1rem;
    }
  }
  
  .sounds-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .sound-card {
    padding: 1.2rem;
    
    .sound-title {
      font-size: 1.2rem;
    }
    
    .sound-description {
      font-size: 0.9rem;
    }
    
    .sound-controls {
      .play-button {
        width: 45px;
        height: 45px;
      }
      
      .sound-duration {
        font-size: 0.8rem;
      }
    }
  }
}

@media (max-width: 480px) {
  .sounds-grid {
    grid-template-columns: 1fr;
  }
  
  .epitaph-header h1 {
    font-size: 1.8rem;
  }
  
  .sound-card {
    padding: 1rem;
  }
}
</style> 