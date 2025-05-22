<script setup lang="ts">
import type {Tender} from '@/types/tenders';

const props = defineProps<{
	tender: Tender;
}>();

const { tender } = props;

</script>

<template>
		<article class="tender-card">
				<div class="tender-card__header">
						<h3 class="tender-card__title">{{ tender.title }}</h3>
						<span class="tender-card__status">{{ tender.phase_en }}</span>
				</div>

				<div class="tender-card__description">
						<p>{{ tender.description }}</p>
				</div>

				<div class="tender-card__footer">
						<time class="tender-card__date">
								{{ tender.date }}
						</time>
						<span class="tender-card__price">
        {{ tender.awarded_value ? tender.awarded_value + ' Р' : '—' }}
      </span>
				</div>
		</article>
</template>


<style lang="scss">
@import './TenderCard.module.scss';
</style>