<template>
  <div class="sound-container" v-if="sound">
    <div class="back-link-top">
      <router-link to="/sounds" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        {{ $t('sounds.backToList') }}
      </router-link>
    </div>

    <div class="sound-header">
      <div class="frame-decoration">
        <div class="frame-corner top-left"></div>
        <div class="frame-corner top-right"></div>
        <div class="frame-corner bottom-left"></div>
        <div class="frame-corner bottom-right"></div>
      </div>
      <h1>{{ sound.titleKey[currentLocale] || sound.titleKey.zh }}</h1>
      <div class="decorative-line"></div>
    </div>

    <div class="sound-content">
      <div class="player-card">
        <audio
          ref="audio"
          controls
          preload="metadata"
          controlsList="nodownload"
          :src="sound.audioFile"
          class="audio-element"
        ></audio>

        <p class="sound-desc">{{ sound.descriptionKey[currentLocale] || sound.descriptionKey.zh }}</p>

        <div class="sound-meta">
          <span class="meta-item" v-if="sound.genre">
            {{ sound.genre[currentLocale] || sound.genre.zh }}
          </span>
          <span class="meta-item" v-if="sound.date">{{ formatDate(sound.date) }}</span>
        </div>
      </div>

      <div class="lyrics-section" v-if="hasLyrics">
        <h2>{{ $t('sounds.lyrics') }}</h2>
        <div class="decorative-line small"></div>
        <div class="lyrics-text">{{ lyricsText }}</div>
      </div>
      <p class="no-lyrics" v-else>{{ $t('sounds.noLyrics') }}</p>
    </div>
  </div>

  <div class="sound-container" v-else>
    <div class="back-link-top">
      <router-link to="/sounds" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        {{ $t('sounds.backToList') }}
      </router-link>
    </div>
    <p class="not-found">{{ $t('sounds.noSounds') }}</p>
  </div>
</template>

<script>
import config from '../config'
import { formatDate } from '../utils/date'

// 这些占位文本意味着「没有歌词」，详情页不展示歌词块
const NO_LYRICS_MARKERS = ['无歌词', 'No lyrics', '(No lyrics)', '（无歌词）']

export default {
  name: 'Sound',
  data() {
    return {}
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    },
    sound() {
      return config.sounds?.find(s => s.id === this.$route.params.id) || null
    },
    lyricsText() {
      if (!this.sound?.lyricsKey) return ''
      return this.sound.lyricsKey[this.currentLocale] || this.sound.lyricsKey.zh || ''
    },
    hasLyrics() {
      const text = this.lyricsText.trim()
      if (!text) return false
      return !NO_LYRICS_MARKERS.some(m => text.includes(m))
    }
  },
  methods: {
    formatDate
  }
}
</script>

<style scoped lang="scss">
.sound-container {
  max-width: 820px;
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

.sound-header {
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

.sound-content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.player-card {
  background-color: var(--card-bg);
  border-radius: 6px;
  box-shadow: 0 5px 20px var(--shadow-color);
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

.audio-element {
  width: 100%;
  display: block;
}

.sound-desc {
  font-family: 'Lora', serif;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--secondary-color);
  margin: 1.5rem 0 0;
}

.sound-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.2rem;
  font-family: 'Lora', serif;
  font-style: italic;
  font-size: 0.85rem;
  color: var(--accent-color);

  .meta-item {
    background: rgba(0, 0, 0, 0.04);
    padding: 0.15rem 0.6rem;
    border-radius: 4px;
  }
}

.lyrics-section {
  h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    color: var(--primary-color);
    text-align: center;
    margin-bottom: 0.8rem;
  }

  .decorative-line.small {
    width: 80px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
    margin: 0 auto 1.8rem;
  }
}

.lyrics-text {
  font-family: 'Lora', serif;
  font-size: 1.1rem;
  line-height: 2;
  color: var(--secondary-color);
  white-space: pre-line;
  padding: 0 0.5rem;
}

.no-lyrics {
  text-align: center;
  font-family: 'Lora', serif;
  font-style: italic;
  color: var(--secondary-color);
  opacity: 0.7;
  font-size: 1rem;
}

.not-found {
  text-align: center;
  margin-top: 4rem;
  color: var(--secondary-color);
  font-style: italic;
  font-family: 'Lora', serif;
}

@media (max-width: 768px) {
  .sound-container {
    padding: 1.5rem 1rem;
  }

  .sound-header h1 {
    font-size: 2rem;
  }

  .player-card {
    padding: 1.3rem;
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
