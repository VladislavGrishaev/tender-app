<script setup lang="ts">
import TenderCard from '../TenderCard/TenderCard.vue';
import SearchForm from '../SearchForm/SearchForm.vue';

</script>

<template>
		<div class="tenders-view">
				<h1 class="tenders-view__title">Список тендеров</h1>
				<SearchForm class="tenders-view__search"/>

				<TransitionGroup name="cards" tag="div" class="tenders-view__grid">
						<TenderCard
										class="tenders-view__card"/>
				</TransitionGroup>
		</div>
</template>

<style lang="scss">
@import './TendersView.module.scss';
</style>