<template>
  <div class="about-container">
    <svg class="spray-filter-defs" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="epitaph-spray-roughen" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="7" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </defs>
    </svg>
    <div class="epitaph-header">
      <div class="frame-decoration">
        <div class="frame-corner top-left"></div>
        <div class="frame-corner top-right"></div>
        <div class="frame-corner bottom-left"></div>
        <div class="frame-corner bottom-right"></div>
      </div>
      <h1>{{ $t('about.title') }}</h1>
      <div class="decorative-line"></div>
      <p class="quote">{{ $t('about.subtitle') }}</p>
    </div>
    
    <div class="papers-stack">
      <div 
        v-for="(ver, index) in about.versions" 
        :key="ver.id"
        class="paper-card"
        :class="{ 'paper-card--spray': ver.display === 'spray' }"
        :style="getCardStyle(index)"
        @click="handleCardClick(index)"
      >
        <div class="paper-meta">
          <span class="version-date">{{ ver.date }}</span>
          <span class="version-author">{{ ver.author[currentLocale] }}</span>
        </div>
        <h2 class="version-title" v-if="ver.title">{{ ver.title[currentLocale] }}</h2>
        <div class="about-content" v-if="ver.display === 'spray'">
          <div class="epitaph-spray">
            <canvas ref="flameCanvas" class="flame-canvas"></canvas>
            <p class="spray-line spray-french">{{ sprayParts(ver, currentLocale).french }}</p>
            <p class="spray-line spray-translation">{{ sprayParts(ver, currentLocale).translation }}</p>
          </div>
        </div>
        <div class="about-content" v-else>
          <div class="epitaph-text">{{ ver.contentKey[currentLocale] }}</div>
        </div>
        <div class="flip-hint" v-if="index === currentIndex">
          <span>{{ currentLocale === 'zh' ? '点击纸张翻阅下一版' : 'Click to flip to next version' }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </div>
      </div>
    </div>
    
    <div class="signature" v-if="currentVersion?.signature">
      <p>{{ currentVersion.signature[currentLocale] }}</p>
    </div>

    <div class="traces-gallery" v-if="about.personalWorks && about.personalWorks.length">
      <h2>{{ $t('about.sectionTitle') }}</h2>
      <div class="decorative-line"></div>
      
      <div class="works-list">
        <div class="work-item" v-for="(work, index) in about.personalWorks" :key="index">
          <div class="work-header">
            <h3>{{ work.titleKey[currentLocale] }}</h3>
            <span v-if="work.status" class="work-annotation">{{ $t(`about.status.${work.status}`) }}</span>
          </div>
          <p>{{ work.descriptionKey[currentLocale] }}</p>
          <a v-if="work.link" :href="work.link" target="_blank" rel="noopener noreferrer" class="work-link">
            {{ $t('common.actions.viewProject') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config'
import { useI18n } from 'vue-i18n'

export default {
  name: 'About',
  setup() {
    const { t, locale } = useI18n()
    return { t, locale }
  },
  data() {
    return {
      about: config.about,
      currentIndex: 0,
      // 火焰粒子引擎（仅喷漆墓志铭卡片为前景时运行）
      flameState: {
        rafId: null,
        ctx: null,
        canvas: null,
        dpr: 1,
        w: 0,
        h: 0,
        flames: [],
        embers: [],
        ash: [],
        lastSpawn: 0,
        running: false,
        reduceMotion: false
      }
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    },
    currentVersion() {
      return this.about.versions?.[this.currentIndex] ?? null
    },
    // 当前是否是喷漆卡片位于前景（火焰仅在此时运行，省性能）
    sprayActive() {
      const v = this.about.versions?.[this.currentIndex]
      return v?.display === 'spray'
    }
  },
  watch: {
    sprayActive(active) {
      if (active) this.startFlames();
      else this.stopFlames();
    }
  },
  mounted() {
    this.flameState.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.addEventListener('visibilitychange', this.onVisibilityChange);
    if (this.sprayActive) this.$nextTick(this.startFlames);
  },
  beforeUnmount() {
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    this.stopFlames();
  },
  methods: {
    sprayParts(ver, locale) {
      // spray 变体按空行把「法语句」与「译文」拆成两块，分别排布
      const raw = ver.contentKey?.[locale] || ''
      const [french = '', ...rest] = raw.split(/\n\s*\n/)
      return { french: french.trim(), translation: rest.join('\n\n').trim() }
    },
    getCardStyle(index) {
      if (!this.about.versions) return {};
      const total = this.about.versions.length;
      let diff = index - this.currentIndex;
      if (diff < 0) diff += total;
      
      if (diff === 0) {
        return {
          transform: 'translateY(0) rotate(0deg) scale(1)',
          zIndex: 10,
          opacity: 1,
          pointerEvents: 'auto'
        }
      }
      
      const rotations = [2, -2, 3, -3, 1];
      const rot = rotations[index % rotations.length];
      
      return {
        transform: `translateY(${diff * 12}px) translateX(${diff * 6}px) rotate(${rot}deg) scale(${1 - diff * 0.02})`,
        zIndex: 10 - diff,
        opacity: 1 - (diff * 0.15),
        pointerEvents: 'auto',
        cursor: 'pointer'
      }
    },
    handleCardClick(index) {
      if (!this.about.versions) return;
      if (this.currentIndex === index) {
        this.currentIndex = (this.currentIndex + 1) % this.about.versions.length;
      } else {
        this.currentIndex = index;
      }
    },
    // —— 火焰引擎 ——
    onVisibilityChange() {
      // 切回前台：来一波灰烬，像余烬被风吹散复燃
      if (!document.hidden && this.sprayActive && !this.flameState.reduceMotion) {
        this.burstAsh(28);
      }
      if (document.hidden) {
        this.stopFlames();
      } else if (this.sprayActive) {
        this.startFlames();
      }
    },
    startFlames() {
      const s = this.flameState;
      if (s.running || s.reduceMotion) return;
      // v-for 内的 ref 是数组，取第一个（喷漆卡片唯一一个 canvas）
      const canvas = (this.$refs.flameCanvas || [])[0];
      if (!canvas) return;
      s.canvas = canvas;
      s.ctx = canvas.getContext('2d');
      s.running = true;
      this.resizeFlameCanvas();
      s.lastSpawn = 0;
      const loop = (t) => {
        if (!s.running) return;
        this.tickFlames(t);
        s.rafId = requestAnimationFrame(loop);
      };
      s.rafId = requestAnimationFrame(loop);
    },
    stopFlames() {
      const s = this.flameState;
      s.running = false;
      if (s.rafId) cancelAnimationFrame(s.rafId);
      s.rafId = null;
      // 清场
      if (s.ctx) s.ctx.clearRect(0, 0, s.w, s.h);
      s.flames = [];
      s.embers = [];
    },
    resizeFlameCanvas() {
      const s = this.flameState;
      const canvas = s.canvas;
      if (!canvas) return;
      const host = canvas.parentElement;
      const rect = host.getBoundingClientRect();
      s.dpr = Math.min(window.devicePixelRatio || 1, 2);
      s.w = Math.max(1, rect.width);
      s.h = Math.max(1, rect.height);
      canvas.width = s.w * s.dpr;
      canvas.height = s.h * s.dpr;
      canvas.style.width = s.w + 'px';
      canvas.style.height = s.h + 'px';
      s.ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
    },
    spawnFlame() {
      const s = this.flameState;
      // 彩色火焰：以金橙红为主，偶尔混入品红/紫/青色尖
      const hueRoll = Math.random();
      let hueBase;
      if (hueRoll < 0.62) hueBase = 38 + Math.random() * 14;      // 金黄→橙
      else if (hueRoll < 0.85) hueBase = 12 + Math.random() * 14; // 橙红→红
      else if (hueRoll < 0.93) hueBase = 320 + Math.random() * 30;// 品红→紫
      else hueBase = 180 + Math.random() * 30;                    // 青
      s.flames.push({
        x: s.w * (0.08 + Math.random() * 0.84),
        y: s.h * (0.82 + Math.random() * 0.12),
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(0.7 + Math.random() * 1.4),
        life: 1,
        decay: 0.012 + Math.random() * 0.012,
        size: 7 + Math.random() * 10,
        hue: hueBase,
        wob: Math.random() * Math.PI * 2
      });
    },
    spawnEmber() {
      const s = this.flameState;
      const hueRoll = Math.random();
      const hue = hueRoll < 0.7 ? 38 + Math.random() * 20 : (hueRoll < 0.88 ? 320 + Math.random() * 30 : 190 + Math.random() * 30);
      s.embers.push({
        x: s.w * (0.1 + Math.random() * 0.8),
        y: s.h * (0.7 + Math.random() * 0.2),
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(0.8 + Math.random() * 1.6),
        life: 1,
        decay: 0.004 + Math.random() * 0.006,
        size: 1 + Math.random() * 1.8,
        hue,
        flick: Math.random() * Math.PI * 2
      });
    },
    burstAsh(n) {
      const s = this.flameState;
      if (!s.canvas) this.resizeFlameCanvas();
      for (let i = 0; i < n; i++) {
        s.ash.push({
          x: s.w * (0.1 + Math.random() * 0.8),
          y: s.h * (0.3 + Math.random() * 0.4),
          vx: (Math.random() - 0.5) * 1.2,
          vy: -(0.2 + Math.random() * 0.6),
          life: 1,
          decay: 0.003 + Math.random() * 0.004,
          size: 1 + Math.random() * 2.4,
          rot: Math.random() * Math.PI,
          vrot: (Math.random() - 0.5) * 0.05
        });
      }
      // 灰烬需要持续渲染一小段时间；若未运行则起一个短循环
      if (!s.running) this.runAshTail();
    },
    runAshTail() {
      const s = this.flameState;
      if (s.ash.length === 0) return;
      let start = 0;
      const tail = (t) => {
        if (!start) start = t;
        this.tickAsh(t);
        if (s.ash.length > 0 && t - start < 4000) {
          requestAnimationFrame(tail);
        } else if (!s.running) {
          if (s.ctx) s.ctx.clearRect(0, 0, s.w, s.h);
        }
      };
      requestAnimationFrame(tail);
    },
    tickFlames(t) {
      const s = this.flameState;
      if (!s.ctx) return;
      if (!s.lastSpawn) s.lastSpawn = t;
      const dt = t - s.lastSpawn;
      s.lastSpawn = t;
      // 生成：每帧约 3 火舌 + 偶尔余烬
      const spawnCount = 3;
      for (let i = 0; i < spawnCount; i++) this.spawnFlame();
      if (Math.random() < 0.4) this.spawnEmber();

      s.ctx.clearRect(0, 0, s.w, s.h);
      s.ctx.globalCompositeOperation = 'lighter';

      // 火焰
      for (let i = s.flames.length - 1; i >= 0; i--) {
        const p = s.flames[i];
        p.wob += 0.1;
        p.x += p.vx + Math.sin(p.wob) * 0.4;
        p.y += p.vy;
        p.vy *= 0.99;
        p.life -= p.decay;
        if (p.life <= 0) { s.flames.splice(i, 1); continue; }
        const r = Math.max(0.5, p.size * p.life);
        const grd = s.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        const a = p.life * 0.85;
        // 核心：白热 → 该色相 → 暗边
        grd.addColorStop(0, `hsla(${p.hue}, 100%, 92%, ${a})`);
        grd.addColorStop(0.4, `hsla(${p.hue}, 100%, 60%, ${a * 0.8})`);
        grd.addColorStop(1, `hsla(${p.hue}, 100%, 40%, 0)`);
        s.ctx.fillStyle = grd;
        s.ctx.beginPath();
        s.ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        s.ctx.fill();
      }

      // 余烬
      for (let i = s.embers.length - 1; i >= 0; i--) {
        const e = s.embers[i];
        e.flick += 0.2;
        e.x += e.vx + Math.sin(e.flick) * 0.3;
        e.y += e.vy;
        e.life -= e.decay;
        if (e.life <= 0 || e.y < -10) { s.embers.splice(i, 1); continue; }
        const flick = 0.6 + Math.abs(Math.sin(e.flick)) * 0.4;
        s.ctx.fillStyle = `hsla(${e.hue}, 100%, 75%, ${e.life * flick})`;
        s.ctx.beginPath();
        s.ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        s.ctx.fill();
      }

      s.ctx.globalCompositeOperation = 'source-over';
      this.tickAsh(t);
    },
    tickAsh() {
      const s = this.flameState;
      if (!s.ctx || s.ash.length === 0) return;
      for (let i = s.ash.length - 1; i >= 0; i--) {
        const a = s.ash[i];
        a.x += a.vx;
        a.y += a.vy;
        a.vy += 0.006; // 灰烬会缓缓下落
        a.vx *= 0.99;
        a.rot += a.vrot;
        a.life -= a.decay;
        if (a.life <= 0) { s.ash.splice(i, 1); continue; }
        s.ctx.save();
        s.ctx.translate(a.x, a.y);
        s.ctx.rotate(a.rot);
        s.ctx.fillStyle = `rgba(180, 170, 160, ${a.life * 0.7})`;
        s.ctx.fillRect(-a.size, -a.size * 0.5, a.size * 2, a.size);
        s.ctx.restore();
      }
    }
  }
}
</script>

<style scoped lang="scss">
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.epitaph-header {
  text-align: center;
  margin-bottom: 3rem;
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
        top: 0;
        left: 0;
        border-top: 1px solid;
        border-left: 1px solid;
      }
      
      &.top-right {
        top: 0;
        right: 0;
        border-top: 1px solid;
        border-right: 1px solid;
      }
      
      &.bottom-left {
        bottom: 0;
        left: 0;
        border-bottom: 1px solid;
        border-left: 1px solid;
      }
      
      &.bottom-right {
        bottom: 0;
        right: 0;
        border-bottom: 1px solid;
        border-right: 1px solid;
      }
    }
  }
  
  h1 {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-weight: 700;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
  }
  
  .decorative-line {
    width: 100px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
    margin: 0 auto 1.5rem;
  }
  
  .quote {
    font-family: 'Lora', serif;
    font-style: italic;
    color: var(--secondary-color);
    font-size: 1.2rem;
  }
}

.papers-stack {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  margin-bottom: 4rem;
  perspective: 1000px;
}

.paper-card {
  grid-column: 1;
  grid-row: 1;
  background-color: var(--card-bg);
  border-radius: 4px;
  padding: 2.5rem;
  box-shadow: 0 5px 25px rgba(0,0,0,0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: center center;
  
  &::before {
    content: '"';
    position: absolute;
    top: 2rem;
    left: 2rem;
    font-family: 'Playfair Display', serif;
    font-size: 5rem;
    color: rgba(0, 0, 0, 0.05);
    line-height: 0;
  }
}

.paper-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-family: 'Lora', serif;
  font-style: italic;
  color: var(--accent-color);
  font-size: 0.95rem;
  border-bottom: 1px dashed rgba(0,0,0,0.1);
  padding-bottom: 0.5rem;
  position: relative;
  z-index: 1;
}

.version-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.flip-hint {
  text-align: right;
  margin-top: 2rem;
  font-family: 'Lora', serif;
  font-style: italic;
  color: var(--accent-color);
  font-size: 0.9rem;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
  
  svg {
    animation: bounce-x 2s infinite;
  }
}

@keyframes bounce-x {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}

.about-content {
  font-family: 'Lora', serif;
  font-size: 1.1rem;
  line-height: 1.9;
  color: var(--secondary-color);
  position: relative;
  z-index: 1;
}

.epitaph-text {
  white-space: pre-line;
  font-family: 'Lora', serif;
  font-size: 1.1rem;
  line-height: 1.9;
  color: var(--secondary-color);
}

/* —— 喷漆墓志铭变体（Disco Elysico 式地面涂鸦）—— */
.spray-filter-defs {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
}

.paper-card--spray {
  background-color: #1c1b18;
  background-image:
    radial-gradient(circle at 28% 18%, rgba(255, 255, 255, 0.04), transparent 55%),
    radial-gradient(circle at 72% 82%, rgba(0, 0, 0, 0.45), transparent 70%);
  border-color: rgba(0, 0, 0, 0.5);
  color: var(--light-text);

  &::before {
    content: none;
  }

  .paper-meta {
    color: rgba(188, 169, 121, 0.72);
    border-bottom-color: rgba(188, 169, 121, 0.18);
  }

  .version-title {
    color: rgba(245, 245, 245, 0.82);
  }
}

.epitaph-spray {
  text-align: center;
  padding: 1.2rem 0.5rem 0.5rem;
  position: relative;
  z-index: 1;
}

.flame-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.spray-line {
  margin: 0;
  position: relative;
  z-index: 1;
}

.spray-french {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: clamp(2rem, 7vw, 4.5rem);
  line-height: 1.12;
  text-wrap: balance;
  color: var(--accent-color);
  filter: url(#epitaph-spray-roughen);
  text-shadow:
    0 0 1px rgba(255, 230, 180, 0.85),
    0 0 14px rgba(255, 150, 40, 0.45),
    0 0 34px rgba(255, 90, 30, 0.28),
    0 0 60px rgba(188, 169, 121, 0.18);
  padding: 0.2em 0.1em;
  animation: epitaph-breathe 7s ease-in-out infinite;
}

.spray-translation {
  margin-top: 1.6rem;
  font-family: 'Lora', serif;
  font-weight: 400;
  font-size: clamp(1.05rem, 3vw, 1.7rem);
  letter-spacing: 0.14em;
  color: rgba(245, 245, 245, 0.68);
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
}

@keyframes epitaph-breathe {
  0%, 100% { opacity: 0.9; }
  50%      { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .spray-french {
    animation: none;
  }
}

.signature {
  text-align: right;
  margin-top: 4rem;
  margin-bottom: 4rem;
  
  p {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 1.5rem;
    color: var(--accent-color);
  }
}

.traces-gallery {
  margin-top: 4rem;
  
  h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    color: var(--primary-color);
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .decorative-line {
    width: 80px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
    margin: 0 auto 3rem;
  }
  
  .works-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .work-item {
    background-color: var(--card-bg);
    border-radius: 4px;
    padding: 2rem;
    box-shadow: 0 3px 10px var(--shadow-color);
    border: 1px solid rgba(0, 0, 0, 0.05);
    
    .work-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 1rem;
      margin-bottom: 1rem;
      
      h3 {
        font-family: 'Playfair Display', serif;
        font-size: 1.5rem;
        color: var(--primary-color);
        margin: 0;
      }
      
      .work-annotation {
        flex-shrink: 0;
        font-family: 'Lora', serif;
        font-size: 0.8rem;
        font-style: italic;
        color: var(--secondary-color);
        opacity: 0.75;
        letter-spacing: 0.03em;

        &::before {
          content: '·';
          margin-right: 0.35em;
          opacity: 0.65;
        }
      }
    }
    
    p {
      font-family: 'Lora', serif;
      font-size: 1.05rem;
      color: var(--secondary-color);
      line-height: 1.7;
      margin-bottom: 1rem;
    }
    
    .work-link {
      display: inline-block;
      color: var(--accent-color);
      text-decoration: none;
      font-family: 'Lora', serif;
      font-weight: bold;
      transition: color 0.3s ease;
      
      &:hover {
        color: var(--primary-color);
      }
    }
  }
}

@media (max-width: 768px) {
  .about-container {
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
  
  .paper-card {
    padding: 1.5rem;
  }
  
  .about-section {
    margin-bottom: 2rem;
    
    h2 {
      font-size: 1.5rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
  
  .author-section {
    flex-direction: column;
    
    .author-photo {
      margin-right: 0;
      margin-bottom: 1.5rem;
      
      img {
        width: 180px;
        height: 180px;
      }
    }
  }
  
  .contact-links {
    flex-wrap: wrap;
    
    a {
      margin-bottom: 1rem;
    }
  }
}

@media (max-width: 480px) {
  .epitaph-header h1 {
    font-size: 1.8rem;
  }
  
  .paper-card {
    padding: 1.2rem;
  }
  
  .author-section .author-photo img {
    width: 150px;
    height: 150px;
  }
  
  .contact-links a {
    flex: 0 0 calc(50% - 1rem);
  }
}
</style>
