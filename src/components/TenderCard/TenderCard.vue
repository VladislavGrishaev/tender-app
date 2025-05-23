<script setup lang="ts">
import type {Tender} from '@/types/tenders';
import {useNoDataAvailable} from "@/composables/useNoDataAvailable.ts";

const props = defineProps<{
	tender: Tender;
}>();

const { tender } = props;
const { displayValue } = useNoDataAvailable();

</script>

<template>
		<router-link :to="`/tender/${tender.id}`" class="tender-card">
				<div class="tender-card__header">
						<h3 class="tender-card__title">{{ displayValue(tender.title) }}</h3>
						<span class="tender-card__status">{{ displayValue(tender.phase_en) }}</span>
				</div>

				<div class="tender-card__description">
						<p>{{ displayValue(tender.description) }}</p>
				</div>

				<div class="tender-card__footer">
						<time class="tender-card__date">
								{{ displayValue(tender.date) }}
						</time>
						<span class="tender-card__price">
         {{ displayValue(tender.awarded_value, '—') }} Р
      </span>
				</div>
		</router-link>
</template>


<style lang="scss">
@use './TenderCard.module.scss';
</style>