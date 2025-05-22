<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

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
@import './ErrorLoadData.module.scss';
</style>
