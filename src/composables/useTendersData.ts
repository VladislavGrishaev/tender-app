import { ref, computed } from 'vue';
import { fetchTenders } from '@/api/tenders';
import type { Tender } from '@/types/tenders';

const TENDERS_CACHE_KEY = 'tenders-cache';
const SEARCH_QUERY_KEY = 'tenders-search-query';
export const CURRENT_PAGE_KEY = 'tenders-current-page';


export function useTendersData() {
  const allTenders = ref<Tender[]>([]);
  const searchQuery = ref(sessionStorage.getItem(SEARCH_QUERY_KEY) || '');
  const isLoading = ref(false);
  const isError = ref(false);

  const loadTenders = async () => {
    isLoading.value = true;
    isError.value = false;
    try {
      const cached = sessionStorage.getItem(TENDERS_CACHE_KEY);
      if (cached) {
        allTenders.value = JSON.parse(cached);
        isLoading.value = false;
        return;
      }

      const res = await fetchTenders();
      allTenders.value = res.data;
      sessionStorage.setItem(TENDERS_CACHE_KEY, JSON.stringify(res.data));
    } catch (e) {
      console.error(e);
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  const filteredTenders = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    return query
      ? allTenders.value.filter(t => t.title.toLowerCase().includes(query))
      : allTenders.value;
  });

  const updateQuery = (query: string) => {
    searchQuery.value = query;
    sessionStorage.setItem(SEARCH_QUERY_KEY, query);
  };

  const clearQuery = () => updateQuery('');

  return {
    allTenders,
    filteredTenders,
    searchQuery,
    updateQuery,
    clearQuery,
    isLoading,
    isError,
    loadTenders
  };
}
