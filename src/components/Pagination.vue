<template>
  <div class="pagination" v-if="totalPages > 1">
    <button 
      @click="changePage(currentPage - 1)" 
      :disabled="currentPage === 1"
      class="pagination-button prev"
    >
      &lt;
    </button>
    <span class="page-info">{{ $t('common.pagination.page', { currentPage, totalPages }) }}</span>
    <button 
      @click="changePage(currentPage + 1)" 
      :disabled="currentPage === totalPages"
      class="pagination-button next"
    >
      &gt;
    </button>
  </div>
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
  margin-top: 2rem;
  font-family: 'Lora', serif;
}

.pagination-button {
  background: transparent;
  border: 1px solid var(--accent-color);
  color: var(--primary-color);
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
  min-width: 40px; 
  text-align: center;

  &:hover:not(:disabled) {
    background-color: rgba(var(--accent-color-rgb), 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.page-info {
  color: var(--secondary-color);
  margin: 0 1rem;
  font-size: 0.9rem;
}

// 如果需要更复杂的页码显示（例如 ...），可以在这里扩展

</style> 