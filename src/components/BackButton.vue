<template>
  <div class="back-link-top">
    <router-link :to="to" class="back-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      <span><slot>{{ $t('common.actions.back') }}</slot></span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'BackButton',
  props: {
    to: {
      type: [String, Object],
      default: '/'
    }
  }
}
</script>

<style scoped lang="scss">
// 桌面端固定在右上角；窄屏回到文档流顶部，避免遮挡内容
.back-link-top {
  position: fixed;
  top: 5.5rem;
  right: 1.5rem;
  z-index: 100;
}

.back-button {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-body);
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
  transition: all var(--duration-normal) ease;

  svg {
    margin-right: 0.5rem;
    flex-shrink: 0;
    transition: transform var(--duration-normal) ease;
  }

  &:hover {
    background-color: var(--accent-color);
    color: white;
    border-color: var(--accent-color);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px var(--shadow-color);

    svg {
      transform: translateX(-2px);
    }
  }
}

@media (max-width: 768px) {
  .back-link-top {
    position: static;
    margin-bottom: 1.5rem;
  }
}
</style>
