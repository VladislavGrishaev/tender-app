<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { fetchTenders } from '@/api/tenders';
import type { Tender } from '@/types/tenders';
import Preloader from "../Preloader/Preloader.vue";
import TenderCard from '../TenderCard/TenderCard.vue';
import SearchForm from '../SearchForm/SearchForm.vue';
import Pagination from "@/components/Pagination/Pagination.vue";

const allTenders = ref<Tender[]>([]);
const tenders = ref<Tender[]>([]);
const isLoading = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = 30;

const paginateTenders = () => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  tenders.value = allTenders.value.slice(start, end);
  totalPages.value = Math.ceil(allTenders.value.length / pageSize);
};

const loadTenders = async () => {
  isLoading.value = true;
  try {
    const res = await fetchTenders();
    allTenders.value = res.data;
    paginateTenders();
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadTenders);
watch(currentPage, paginateTenders);
</script>


<template>
		<div class="tenders-view">
				<h1 class="tenders-view__title">Список тендеров</h1>
				<SearchForm class="tenders-view__search" />

				<Preloader v-if="isLoading" />

				<TransitionGroup
								v-else
								name="cards"
								tag="div"
								class="tenders-view__grid"
				>
						<TenderCard
										v-for="tender in tenders"
										:key="tender.id"
										:tender="tender"
										class="tenders-view__card"
						/>
				</TransitionGroup>

				<Pagination
								:current-page="currentPage"
								:total-pages="totalPages"
								@update:page="(page) => (currentPage = page)"
				/>
		</div>
</template>

<style lang="scss">
@import './TendersView.module.scss';
</style>