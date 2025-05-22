<script setup lang="ts">

const props = defineProps<{
  errorMessage?: string;
}>();

const emit = defineEmits<{
  (e: 'retry'): void;
}>();

const onRetry = () => {
  emit('retry');
};
</script>

<template>
		<div class="error-load-data">
				<p class="error-load-data__message">
						{{ errorMessage || 'Ошибка загрузки данных. Попробуйте повторить попытку.' }}
				</p>
				<button class="error-load-data__btn" @click="onRetry">
						Повторить попытку
				</button>
		</div>
</template>

<style lang="scss">
@use './ErrorLoadData.module.scss';
</style>
