<script setup lang="ts">
import {RouterView} from 'vue-router';
</script>

<template>
		<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
						<component :is="Component" />
				</transition>
		</router-view>
</template>


<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

.fade-enter-to, .fade-leave-from {
    opacity: 1;
}
</style>