<template>
  <div class="sounds-container">
    <div class="sounds-header">
      <h1 class="page-title">{{ $t('sounds.title') }}</h1>
      <p class="page-description">{{ $t('sounds.description') }}</p>
    </div>

    <div class="sounds-grid">
      <div class="sound-card" v-for="sound in sounds" :key="sound.id">
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
  </div>
</template>

<script>
import config from '@/config';

export default {
  name: 'SoundsView',
  data() {
    return {
      sounds: config.sounds || [],
      showLyrics: {}
    };
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
    }
  }
}
</script>

<style scoped>
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

@media (max-width: 768px) {
  .sound-card {
    padding: 1rem;
  }
  
  .sound-title {
    font-size: 1.3rem;
  }
}
</style> 