import { ref, computed, watch } from 'vue';
import type { Ref } from 'vue';

export function useDataPagination<T>(
  source: Ref<T[]>,
  currentPage: Ref<number>,
  pageSize: number
) {
  const paginated = ref<T[]>([]);
  const totalPages = computed(() => Math.ceil(source.value.length / pageSize));

  const updatePaginated = () => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    paginated.value = source.value.slice(start, end);
  };

  watch([source, currentPage], updatePaginated, { immediate: true });

  return {
    paginated,
    totalPages,
  };
}
