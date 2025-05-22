import { computed } from 'vue';
import type { Ref } from 'vue';

export function usePagination(
  totalPages: Ref<number>,
  currentPage: Ref<number>,
  emit: (event: 'update:page', page: number) => void
) {
  const visible = 5;

  const pageNumbers = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;

    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + visible - 1);

    if (end - start < visible - 1) {
      start = Math.max(1, end - visible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  });

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      emit('update:page', page);
    }
  }

  return { pageNumbers, goToPage };
}
