<script setup lang="ts">
import { toRef } from 'vue';
import { usePagination } from '@/composables/usePagination';

const props = defineProps<{
  totalPages: number;
  currentPage: number;
}>();
const emit = defineEmits<{
  (e: 'update:page', page: number): void;
}>();
const totalPagesRef = toRef(props, 'totalPages');
const currentPageRef = toRef(props, 'currentPage');
const { pageNumbers, goToPage } = usePagination(totalPagesRef, currentPageRef, emit);

</script>


<template>
		<div class="pagination">
				<button
								class="pagination__button pagination__button--prev"
								:disabled="currentPage === 1"
								@click="goToPage(currentPage - 1)"
				>
						<
				</button>

				<button
								v-for="page in pageNumbers"
								:key="page"
								class="pagination__button"
								:class="{ 'pagination__button--active': page === currentPage }"
								@click="goToPage(page)"
				>
						{{ page }}
				</button>

				<button
								class="pagination__button pagination__button--next"
								:disabled="currentPage === totalPages"
								@click="goToPage(currentPage + 1)"
				>
						>
				</button>
		</div>
</template>


<style lang="scss">
@use './Pagination.module.scss';
</style>