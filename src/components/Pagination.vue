<template>
  <nav class="pagination" v-if="totalPages > 1" aria-label="Pagination">
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="pagination-button prev"
      aria-label="Previous page"
    >
      &lt;
    </button>
    <template v-for="(page, index) in visiblePages" :key="index">
      <span v-if="page === '…'" class="pagination-ellipsis" aria-hidden="true">…</span>
      <button
        v-else
        @click="changePage(page)"
        :class="['pagination-button', 'page-number', { active: page === currentPage }]"
        :aria-current="page === currentPage ? 'page' : undefined"
      >
        {{ page }}
      </button>
    </template>
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="pagination-button next"
      aria-label="Next page"
    >
      &gt;
    </button>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: ['page-changed'],
  computed: {
    // 页码过多时折叠：首尾页 + 当前页 ±1，中间用 … 省略
    visiblePages() {
      const total = this.totalPages;
      const current = this.currentPage;
      if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
      }
      const pages = [1];
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      if (start > 2) pages.push('…');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < total - 1) pages.push('…');
      pages.push(total);
      return pages;
    }
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('page-changed', page);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 2rem;
  font-family: var(--font-body);
}

.pagination-button {
  background: transparent;
  border: 1px solid var(--accent-color);
  color: var(--primary-color);
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-out);
  border-radius: 4px;
  min-width: 40px;
  text-align: center;

  &:hover:not(:disabled):not(.active) {
    background-color: rgba(var(--accent-color-rgb), 0.1);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.page-number.active {
    background-color: var(--accent-color);
    border-color: var(--accent-color);
    color: #fff;
    cursor: default;
  }
}

.pagination-ellipsis {
  min-width: 40px;
  margin: 0 0.25rem;
  text-align: center;
  color: var(--secondary-color);
}
</style>
