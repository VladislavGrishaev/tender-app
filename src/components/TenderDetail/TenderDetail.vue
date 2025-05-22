<template>
		<div class="tender-detail">
				<button class="tender-detail__back-button">
						Назад к списку
				</button>

				<div class="tender-detail__content">
						<header class="tender-detail__header">
								<h1 class="tender-detail__title">Тендер №1</h1>
								<span class="tender-detail__status">Активен</span>
						</header>

						<div class="tender-detail__info">
								<div class="tender-detail__info-item">
										<span class="tender-detail__info-label">Дата окончания:</span>
										<span class="tender-detail__info-value">20.05.2024</span>
								</div>
								<div class="tender-detail__info-item">
										<span class="tender-detail__info-label">Бюджет:</span>
										<span class="tender-detail__info-value">100 000 руб</span>
								</div>
						</div>

						<div class="tender-detail__description">
								<h2 class="tender-detail__subtitle">Описание</h2>
								<p class="tender-detail__text">
										Текст
								</p>
						</div>
				</div>
		</div>
</template>

<style lang="scss">
@import './TenderDetail.module.scss';
</style>