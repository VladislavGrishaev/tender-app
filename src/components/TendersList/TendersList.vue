<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { fetchTenders } from '@/api/tenders';
import type { Tender } from '@/types/tenders';
import Preloader from "../Preloader/Preloader.vue";
import TenderCard from '../TenderCard/TenderCard.vue';
import SearchForm from '../SearchForm/SearchForm.vue';
import Pagination from "@/components/Pagination/Pagination.vue";
import ErrorLoadData from '@/components/ErrorLoadData/ErrorLoadData.vue';  // импорт компонента ошибки

const allTenders = ref<Tender[]>([]);
const tenders = ref<Tender[]>([]);
const isLoading = ref(false);
const isError = ref(false);               // состояние ошибки загрузки
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = 30;
const tendersWrapRef = ref<HTMLElement | null>(null);

const paginateTenders = () => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  tenders.value = allTenders.value.slice(start, end);
  totalPages.value = Math.ceil(allTenders.value.length / pageSize);
};

const loadTenders = async () => {
  isLoading.value = true;
  isError.value = false;
  try {
    const res = await fetchTenders();
    allTenders.value = res.data;
    paginateTenders();
  }
  catch (e) {
    console.error(e);
    isError.value = true;
  }
  finally {
    isLoading.value = false;
  }
};

onMounted(loadTenders);
watch(currentPage, () => {
  paginateTenders();

  if (tendersWrapRef.value) {
    tendersWrapRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
</script>

<template>
		<div class="tenders">
				<h1 class="tenders__title">Список тендеров</h1>
				<SearchForm class="tenders__search" />

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

						<Pagination
										:current-page="currentPage"
										:total-pages="totalPages"
										@update:page="(page) => (currentPage = page)"
						/>
				</div>
		</div>
</template>

<style lang="scss">
@import 'TendersList.module';
</style>
