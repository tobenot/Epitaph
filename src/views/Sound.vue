<template>
  <div class="sound-container" v-if="sound">
    <BackButton to="/sounds">{{ $t('sounds.backToList') }}</BackButton>

    <PageHeader>{{ sound.titleKey[currentLocale] || sound.titleKey.zh }}</PageHeader>

    <div class="sound-content">
      <div class="player-card">
        <audio
          ref="audio"
          preload="metadata"
          controlsList="nodownload"
          :src="sound.audioFile"
          @timeupdate="onTimeUpdate"
          @loadedmetadata="onLoadedMetadata"
          @ended="onEnded"
          @play="isPlaying = true"
          @pause="isPlaying = false"
        ></audio>

        <div class="custom-player">
          <button
            class="play-btn"
            :aria-label="isPlaying ? $t('sounds.pause') : $t('sounds.play')"
            @click="togglePlay"
          >
            <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
          </button>

          <span class="time current">{{ formatTime(currentTime) }}</span>

          <div
            class="seek-track"
            ref="seekTrack"
            role="slider"
            tabindex="0"
            :aria-label="seekAriaLabel"
            aria-valuemin="0"
            :aria-valuemax="Math.round(duration)"
            :aria-valuenow="Math.round(currentTime)"
            :aria-valuetext="`${formatTime(currentTime)} / ${formatTime(duration)}`"
            @pointerdown="startSeek"
            @keydown="onSeekKeydown"
          >
            <div class="seek-fill" :style="{ width: progressPercent + '%' }"></div>
            <div class="seek-thumb" :style="{ left: progressPercent + '%' }"></div>
          </div>

          <span class="time duration">{{ formatTime(duration) }}</span>
        </div>

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
    <BackButton to="/sounds">{{ $t('sounds.backToList') }}</BackButton>
    <p class="not-found">{{ $t('sounds.noSounds') }}</p>
  </div>
</template>

<script>
import config from '../config'
import { formatDate } from '../utils/date'
import PageHeader from '@/components/PageHeader.vue'
import BackButton from '@/components/BackButton.vue'

// 这些占位文本意味着「没有歌词」，详情页不展示歌词块
const NO_LYRICS_MARKERS = ['无歌词', 'No lyrics', '(No lyrics)', '（无歌词）']

// 键盘 seek 步长（秒）
const SEEK_STEP = 5

export default {
  name: 'Sound',
  components: { PageHeader, BackButton },
  data() {
    return {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      seeking: false
    }
  },
  beforeUnmount() {
    this.cleanupSeek()
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
    },
    progressPercent() {
      if (!this.duration) return 0
      return Math.min(100, (this.currentTime / this.duration) * 100)
    },
    seekAriaLabel() {
      return this.currentLocale === 'zh' ? '播放进度' : 'Playback progress'
    }
  },
  methods: {
    formatDate,
    formatTime(sec) {
      if (!sec || isNaN(sec)) return '0:00'
      const s = Math.floor(sec)
      const m = Math.floor(s / 60)
      const r = s % 60
      return `${m}:${r.toString().padStart(2, '0')}`
    },
    togglePlay() {
      const a = this.$refs.audio
      if (!a) return
      if (a.paused) a.play()
      else a.pause()
    },
    onTimeUpdate() {
      if (this.seeking) return
      const a = this.$refs.audio
      if (a) this.currentTime = a.currentTime
    },
    onLoadedMetadata() {
      const a = this.$refs.audio
      if (a) this.duration = a.duration
    },
    onEnded() {
      this.isPlaying = false
      this.currentTime = 0
    },
    // —— 拖拽 seek ——
    startSeek(e) {
      this.seeking = true
      this.applySeek(e)
      window.addEventListener('pointermove', this.onSeekMove)
      window.addEventListener('pointerup', this.endSeek)
      e.target.setPointerCapture?.(e.pointerId)
    },
    onSeekMove(e) {
      if (!this.seeking) return
      this.applySeek(e)
    },
    endSeek() {
      if (!this.seeking) return
      this.seeking = false
      this.cleanupSeek()
    },
    cleanupSeek() {
      window.removeEventListener('pointermove', this.onSeekMove)
      window.removeEventListener('pointerup', this.endSeek)
    },
    applySeek(e) {
      const track = this.$refs.seekTrack
      const a = this.$refs.audio
      if (!track || !a || !this.duration) return
      const rect = track.getBoundingClientRect()
      const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
      const t = ratio * this.duration
      a.currentTime = t
      this.currentTime = t
    },
    // 键盘左右方向键 seek，步长 SEEK_STEP 秒
    onSeekKeydown(e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      const a = this.$refs.audio
      if (!a || !this.duration) return
      e.preventDefault()
      const delta = e.key === 'ArrowRight' ? SEEK_STEP : -SEEK_STEP
      const t = Math.min(this.duration, Math.max(0, a.currentTime + delta))
      a.currentTime = t
      this.currentTime = t
    }
  }
}
</script>

<style scoped lang="scss">
.sound-container {
  max-width: 820px;
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

/* 原生 <audio> 隐藏，用自定义播放器替代，进度条可全宽拖拽 */
audio {
  display: none;
}

.custom-player {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.play-btn {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--accent-color);
  background-color: var(--accent-color);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.2s ease;

  svg {
    width: 22px;
    height: 22px;
  }

  &:hover {
    transform: scale(1.06);
    box-shadow: 0 4px 12px var(--shadow-color);
  }

  &:active {
    transform: scale(0.96);
  }
}

.time {
  flex-shrink: 0;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--secondary-color);
  font-variant-numeric: tabular-nums;
  min-width: 3rem;
  text-align: center;

  &.current {
    text-align: right;
  }
  &.duration {
    text-align: left;
  }
}

.seek-track {
  position: relative;
  flex: 1 1 0%;
  min-width: 0;
  width: 100%;
  height: 28px;        /* 命中区，好拖 */
  cursor: pointer;
  touch-action: none;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 6px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.12);
  }
}

.seek-fill {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 6px;
  border-radius: 3px;
  background: var(--accent-color);
  pointer-events: none;
}

.seek-thumb {
  position: absolute;
  top: 50%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent-color);
  border: 2px solid var(--card-bg);
  box-shadow: 0 2px 6px var(--shadow-color);
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: transform 0.1s ease;
}

.seek-track:hover .seek-thumb,
.seek-track:active .seek-thumb {
  transform: translate(-50%, -50%) scale(1.15);
}

.sound-desc {
  font-family: var(--font-body);
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
  font-family: var(--font-body);
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
    font-family: var(--font-display);
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
  font-family: var(--font-body);
  font-size: 1.1rem;
  line-height: 2;
  color: var(--secondary-color);
  white-space: pre-line;
  padding: 0 0.5rem;
}

.no-lyrics {
  text-align: center;
  font-family: var(--font-body);
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
  font-family: var(--font-body);
}

@media (max-width: 768px) {
  .sound-container {
    padding: 1.5rem 1rem;

    :deep(.page-title) {
      font-size: 2rem;
    }
  }

  .player-card {
    padding: 1.3rem;
  }
}
</style>
