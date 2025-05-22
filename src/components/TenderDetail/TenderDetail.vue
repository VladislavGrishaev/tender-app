<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchTenderById } from '@/api/tenders';
import type { Tender } from '@/types/tenders';
import Preloader from '../Preloader/Preloader.vue';
import ErrorLoadData from '@/components/ErrorLoadData/ErrorLoadData.vue';

const route = useRoute();
const router = useRouter();

const tender = ref<Tender | null>(null);
const isLoading = ref(false);
const isError = ref(false);

const id = Number(route.params.id);

const loadTender = async () => {
  isLoading.value = true;
  isError.value = false;
  try {
    tender.value = await fetchTenderById(id);
  }
  catch (e) {
    isError.value = true;
    console.error(e);
  }
  finally {
    isLoading.value = false;
  }
};

onMounted(loadTender);

const goBack = () => {
  router.back();
};
</script>

<template>
		<div class="tender-detail">
				<button class="tender-detail__back-button" @click="goBack">
						Назад к списку
				</button>

				<Preloader v-if="isLoading" />
				<ErrorLoadData v-else-if="isError" @retry="loadTender"/>


				<div v-else-if="tender" class="tender-detail__content">
						<header class="tender-detail__header">
								<h1 class="tender-detail__title">{{ tender.title }}</h1>
								<span class="tender-detail__status">{{ tender.phase_en }}</span>
						</header>

						<div class="tender-detail__info">
								<div class="tender-detail__info-item">
										<span class="tender-detail__info-label">Дата окончания:</span>
										<span class="tender-detail__info-value">{{ tender.date }}</span>
								</div>
								<div class="tender-detail__info-item">
										<span class="tender-detail__info-label">Бюджет:</span>
										<span class="tender-detail__info-value">{{ tender.awarded_value }} руб</span>
								</div>
						</div>

						<div class="tender-detail__description">
								<h2 class="tender-detail__subtitle">Описание</h2>
								<p class="tender-detail__text">{{ tender.description }}</p>
						</div>
				</div>
		</div>
</template>


<style lang="scss">
@use './TenderDetail.module.scss';
</style>