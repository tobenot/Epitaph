<template>
  <div class="pagination" v-if="totalPages > 1">
    <button 
      @click="changePage(currentPage - 1)" 
      :disabled="currentPage === 1"
      class="pagination-button prev"
    >
      &lt;
    </button>
    <button
      v-for="page in totalPages"
      :key="page"
      @click="changePage(page)"
      :class="['pagination-button', 'page-number', { active: page === currentPage }]"
    >
      {{ page }}
    </button>
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
  margin: 0 0.25rem;
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

  &.page-number.active {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    color: white;
    cursor: default;
  }
}

</style> 