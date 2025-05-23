<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick, computed } from 'vue';
import { useRouter } from 'vue-router';
import TenderCard from '../TenderCard/TenderCard.vue';
import {CURRENT_PAGE_KEY, useTendersData} from '@/composables/useTendersData';
import { useDataPagination } from '@/composables/useDataPagination';
import { useScrollMemory } from '@/composables/useScrollMemory';
import SearchForm from "@/components/SearchForm/SearchForm.vue";
import ErrorLoadData from "@/components/ErrorLoadData/ErrorLoadData.vue";
import Preloader from "@/components/Preloader/Preloader.vue";
import Pagination from "@/components/Pagination/Pagination.vue";

const router = useRouter();
const tendersWrapRef = ref<HTMLElement | null>(null);
const currentPage = ref(Number(sessionStorage.getItem('tenders-current-page')) || 1);
const pageSize = 30;
const headerHeight = 119;

const {
  allTenders,
  filteredTenders,
  searchQuery,
  updateQuery,
  clearQuery,
  isLoading,
  isError,
  loadTenders
} = useTendersData();

const { paginated: tenders, totalPages } = useDataPagination(
  filteredTenders,
  currentPage,
  pageSize
);

const { saveScrollPosition, restoreScrollPosition, scrollToElement } = useScrollMemory(headerHeight);


const isEmptyResult = computed(() => !isLoading.value && filteredTenders.value.length === 0);
const emptyResultMessage = computed(() =>
  allTenders.value.length === 0
    ? 'Список тендеров пока пуст'
    : 'По вашему запросу ничего не найдено'
);

const goToTender = (id: string | number) => {
  saveScrollPosition();
  sessionStorage.setItem('tenders-current-page', String(currentPage.value));
  sessionStorage.setItem('tenders-search-query', searchQuery.value);
  router.push({ name: 'TenderDetail', params: { id: String(id) } });
};

const searchTenders = (query: string) => {
  updateQuery(query);
  currentPage.value = 1;
  sessionStorage.setItem(CURRENT_PAGE_KEY, '1');
};

const clearSearch = () => {
  clearQuery();
  currentPage.value = 1;
  sessionStorage.setItem(CURRENT_PAGE_KEY, '1');
};


onMounted(async () => {
  await loadTenders();
  await nextTick();
  restoreScrollPosition();
});

onBeforeUnmount(() => {
  saveScrollPosition();
  sessionStorage.setItem('tenders-current-page', String(currentPage.value));
});

watch(currentPage, () => {
  sessionStorage.setItem('tenders-current-page', String(currentPage.value));
  if (tendersWrapRef.value) {
    scrollToElement(tendersWrapRef.value);
  }
});
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
