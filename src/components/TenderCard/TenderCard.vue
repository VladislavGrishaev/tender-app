<script setup lang="ts"></script>

<template>
		<article class="tender-card">
				<div class="tender-card__header">
						<h3 class="tender-card__title">Заголовок</h3>
						<span class="tender-card__status">Статус</span>
				</div>
				<div class="tender-card__description">
						<p>Описание</p>
				</div>
				<div class="tender-card__footer">
						<time class="tender-card__date">Дата</time>
						<span class="tender-card__price">Цена</span>
				</div>
		</article>
</template>

<style lang="scss">
@import './TenderCard.module.scss';
</style>