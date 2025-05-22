<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'search', query: string): void;
}>();

const searchText = ref('');

const onSubmit = (e: Event) => {
  e.preventDefault();
  emit('search', searchText.value.trim());
};
</script>

<template>
		<form @submit="onSubmit" class="search-form">
				<input
								v-model="searchText"
								type="text"
								placeholder="Поиск по названию тендера"
								class="search-form__input"
				/>
				<button type="submit" class="search-form__button">Найти</button>
		</form>
</template>

<style lang="scss">
@use './SearchForm.module.scss';
</style>

