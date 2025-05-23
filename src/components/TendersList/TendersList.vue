<script setup lang="ts">
import {ref, computed, onMounted, watch, onBeforeUnmount, nextTick} from 'vue';
import {useRouter} from 'vue-router';
import {fetchTenders} from '@/api/tenders';
import type {Tender} from '@/types/tenders';
import Preloader from '../Preloader/Preloader.vue';
import TenderCard from '../TenderCard/TenderCard.vue';
import SearchForm from '../SearchForm/SearchForm.vue';
import Pagination from '@/components/Pagination/Pagination.vue';
import ErrorLoadData from '@/components/ErrorLoadData/ErrorLoadData.vue';
import {useDataPagination} from '@/composables/useDataPagination';

const SCROLL_POSITION_KEY = 'tenders-scroll-position';
const CURRENT_PAGE_KEY = 'tenders-current-page';
const TENDERS_CACHE_KEY = 'tenders-cache';

const allTenders = ref<Tender[]>([]);
const isLoading = ref(false);
const isError = ref(false);
const currentPage = ref(1);
const pageSize = 30;
const searchQuery = ref('');
const tendersWrapRef = ref<HTMLElement | null>(null);


const loadTenders = async () => {
  isLoading.value = true;
  isError.value = false;

  try {
    const cached = sessionStorage.getItem(TENDERS_CACHE_KEY);
    const cachedPage = sessionStorage.getItem(CURRENT_PAGE_KEY);
    const cachedQuery = sessionStorage.getItem('tenders-search-query');

    if (cached) {
      allTenders.value = JSON.parse(cached);
      if (cachedPage) currentPage.value = Number(cachedPage);
      if (cachedQuery) searchQuery.value = cachedQuery;
      isLoading.value = false;
      return;
    }

    const res = await fetchTenders();
    allTenders.value = res.data;

    sessionStorage.setItem(TENDERS_CACHE_KEY, JSON.stringify(res.data));
    sessionStorage.setItem(CURRENT_PAGE_KEY, String(currentPage.value));
    sessionStorage.setItem('tenders-search-query', searchQuery.value);
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
    ? allTenders.value.filter(tender =>
      tender.title.toLowerCase().includes(query)
    )
    : allTenders.value;
});

const {paginated: tenders, totalPages} = useDataPagination(
  filteredTenders,
  currentPage,
  pageSize
);

const searchTenders = (query: string) => {
  searchQuery.value = query;
  currentPage.value = 1;
  sessionStorage.setItem('tenders-search-query', query);
};

const clearSearch = () => {
  searchQuery.value = '';
  currentPage.value = 1;
  sessionStorage.setItem('tenders-search-query', '');
};

const isEmptyResult = computed(() => {
  return !isLoading.value && !isError.value && tenders.value.length === 0;
});

const emptyResultMessage = computed(() => {
  const query = searchQuery.value.trim();
  return query
    ? `По запросу «${query}» ничего не найдено`
    : 'Нет доступных тендеров';
});


watch(currentPage, (newPage) => {
  sessionStorage.setItem(CURRENT_PAGE_KEY, String(newPage));
});

onBeforeUnmount(() => {
  sessionStorage.setItem(SCROLL_POSITION_KEY, String(window.scrollY));
});

onMounted(async () => {
  await loadTenders();
  await nextTick();

  const scrollPos = sessionStorage.getItem(SCROLL_POSITION_KEY);
  if (scrollPos) {
    window.scrollTo({ top: Number(scrollPos), behavior: 'auto' });
  }
});

watch(currentPage, () => {
  if (tendersWrapRef.value) {
    const topPos = tendersWrapRef.value.getBoundingClientRect().top + window.pageYOffset;
    const headerHeight = 119; // высота шапки

    window.scrollTo({
      top: topPos - headerHeight,
      behavior: 'smooth'
    });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});


const router = useRouter();

const goToTender = (id: string | number) => {
  sessionStorage.setItem(SCROLL_POSITION_KEY, String(window.scrollY));
  sessionStorage.setItem(CURRENT_PAGE_KEY, String(currentPage.value));
  sessionStorage.setItem('tenders-search-query', searchQuery.value);
  router.push({name: 'TenderDetail', params: {id: String(id)}});
};
</script>

<template>
		<div class="tenders">
				<div class="tenders__header">
						<h1 class="tenders__title">Список тендеров</h1>
						<SearchForm
										v-model="searchQuery"
										@search="searchTenders"
						/>
				</div>
				<div class="tenders__content container">
						<Preloader
										v-if="isLoading"/>
						<ErrorLoadData
										v-else-if="isError"
										@retry="loadTenders"/>
						<div
										v-else
										ref="tendersWrapRef"
										class="tenders__wrap"
						>
								<TransitionGroup
												name="cards"
												tag="div"
												class="tenders__list"
								>
										<TenderCard
														v-for="tender in tenders"
														:key="tender.id"
														:tender="tender"
														@keyup.enter="goToTender(tender.id)"
														role="button"
														tabindex="0"
														class="tenders__card"
										/>
								</TransitionGroup>

								<div
												v-if="isEmptyResult"
												class="tenders__not-found"
								>
										<p class="tenders__not-found-text">
												{{ emptyResultMessage }}
										</p>
										<button
														v-if="searchQuery"
														@click="clearSearch"
														class="tenders__not-found-button"
										>
												Сбросить поиск
										</button>
								</div>
						</div>
				</div>

				<div class="tenders__footer">
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
