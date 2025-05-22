<script setup lang="ts">
import {RouterView} from 'vue-router';
</script>

<template>
		<div class="container">
				<Transition name="fade" mode="out-in">
						<router-view />
				</Transition>
		</div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 1.5s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

.fade-enter-to, .fade-leave-from {
    opacity: 1;
}
</style>