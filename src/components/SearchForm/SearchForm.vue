<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'search', query: string): void;
  (e: 'update:modelValue', value: string): void;
}>();


const searchText = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    searchText.value = newVal;
  }
);

const onInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emit('update:modelValue', value);
};

const onSubmit = () => {
  emit('search', searchText.value.trim());
};
</script>


<template>
		<form @submit.prevent="onSubmit" class="search-form">
				<input
								:value="searchText"
								@input="onInput"
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

