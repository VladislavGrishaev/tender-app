<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { fetchTenders } from '@/api/tenders';
import type { Tender } from '@/types/tenders';
import Preloader from '../Preloader/Preloader.vue';
import TenderCard from '../TenderCard/TenderCard.vue';
import SearchForm from '../SearchForm/SearchForm.vue';
import Pagination from '@/components/Pagination/Pagination.vue';
import ErrorLoadData from '@/components/ErrorLoadData/ErrorLoadData.vue';
import { useDataPagination } from '@/composables/useDataPagination';

const allTenders = ref<Tender[]>([]);
const isLoading = ref(false);
const isError = ref(false);
const currentPage = ref(1);
const pageSize = 30;
const searchQuery = ref('');
const tendersWrapRef = ref<HTMLElement | null>(null);


const filteredTenders = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  return query
    ? allTenders.value.filter(tender =>
      tender.title.toLowerCase().includes(query)
    )
    : allTenders.value;
});

const { paginated: tenders, totalPages } = useDataPagination(
  filteredTenders,
  currentPage,
  pageSize
);

const loadTenders = async () => {
  isLoading.value = true;
  isError.value = false;

  try {
    const res = await fetchTenders();
    allTenders.value = res.data;
    currentPage.value = 1;
  }
  catch (e) {
    console.error(e);
    isError.value = true;
  }
  finally {
    isLoading.value = false;
  }
};

const searchTenders = (query: string) => {
  searchQuery.value = query;
  currentPage.value = 1;
};

watch(currentPage, () => {
  if (tendersWrapRef.value) {
    tendersWrapRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

onMounted(loadTenders);

</script>

<template>
		<div class="tenders">
				<h1 class="tenders__title">Список тендеров</h1>
				<SearchForm class="tenders__search" @search="searchTenders" />

				<Preloader v-if="isLoading" />
				<ErrorLoadData v-else-if="isError" @retry="loadTenders" />

				<div v-else
				     ref="tendersWrapRef"
				     class="tenders__wrap">
						<TransitionGroup
										name="cards"
										tag="div"
										class="tenders__list"
						>
								<TenderCard
												v-for="tender in tenders"
												:key="tender.id"
												:tender="tender"
												class="tenders__card"
								/>
						</TransitionGroup>

						<p
										v-if="tenders.length === 0"
										class="tenders__not-found">
								Тендеры не найдены
						</p>

						<Pagination
										v-if="totalPages > 1"
										:current-page="currentPage"
										:total-pages="totalPages"
										@update:page="(page) => (currentPage = page)"
						/>
				</div>
		</div>
</template>

<style lang="scss">
@use 'TendersList.module';
</style>
