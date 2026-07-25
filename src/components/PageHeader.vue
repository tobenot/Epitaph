<template>
  <header class="page-header" :class="{ 'page-header--large': large }">
    <div class="frame-decoration" aria-hidden="true">
      <span class="frame-corner top-left"></span>
      <span class="frame-corner top-right"></span>
      <span class="frame-corner bottom-left"></span>
      <span class="frame-corner bottom-right"></span>
    </div>
    <h1 class="page-title"><slot /></h1>
    <p v-if="$slots.subtitle" class="page-subtitle"><slot name="subtitle" /></p>
    <div class="decorative-line" aria-hidden="true"></div>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    // 首页主标题使用更大的字号
    large: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0 0 0;
  position: relative;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
}

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

    &.top-left { top: 0; left: 0; border-top: 1px solid; border-left: 1px solid; }
    &.top-right { top: 0; right: 0; border-top: 1px solid; border-right: 1px solid; }
    &.bottom-left { bottom: 0; left: 0; border-bottom: 1px solid; border-left: 1px solid; }
    &.bottom-right { bottom: 0; right: 0; border-bottom: 1px solid; border-right: 1px solid; }
  }
}

.page-title {
  font-family: var(--font-display);
  font-size: 2.8rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);

  .page-header--large & {
    font-size: 3.5rem;
    letter-spacing: 0.05em;
  }
}

.page-subtitle {
  font-family: var(--font-body);
  font-size: 1.2rem;
  color: var(--secondary-color);
  font-style: italic;
  margin-bottom: 1.5rem;
}

.decorative-line {
  width: 150px;
}

@media (max-width: 768px) {
  .page-header {
    max-width: 100%;
  }

  .page-title {
    font-size: 2.2rem;

    .page-header--large & {
      font-size: 2.5rem;
    }
  }
}
</style>
