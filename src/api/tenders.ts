import type { Tender, TendersResponse } from '@/types/tenders';
import { ApiError } from '@/api/api.ts';

const API_URL = 'https://api.test-webest.ru/list/';
const API_URL_ELEMENT = 'https://api.test-webest.ru/element/';

/**
 * Получение списка тендеров
 */
export async function fetchTenders(): Promise<TendersResponse> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      const errorText = await response.text();
      throw new ApiError(`Ошибка загрузки тендеров: ${response.statusText}`, response.status);
    }

    const json = await response.json();

    if (!json?.data) {
      throw new ApiError('Некорректный формат ответа от API');
    }

    return {
      data: json.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        date: item.date,
        phase_en: item.phase_en,
        awarded_value: item.awarded_value,
      })),
      total: json.total,
      page_count: json.page_count,
      page_number: json.page_number,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      console.error('[API] Ошибка API:', error.message, 'Код:', error.status);
      throw error;
    }

    if (error instanceof TypeError) {
      console.error('[API] Ошибка сети:', error.message);
      throw new ApiError('Ошибка сети. Проверьте подключение к интернету.');
    }

    console.error('[API] Неизвестная ошибка:', error);
    throw new ApiError('Произошла неизвестная ошибка при загрузке тендеров');
  }
}

/**
 * Получение одного тендера по ID
 */
export async function fetchTenderById(id: number): Promise<Tender> {
  try {
    const response = await fetch(`${API_URL_ELEMENT}?id=${id}`);

    if (!response.ok) {
      throw new ApiError(`Ошибка загрузки тендера ID ${id}: ${response.statusText}`, response.status);
    }

    const json = await response.json();

    if (!json?.id) {
      throw new ApiError('Ответ API не содержит данных тендера');
    }

    return {
      id: json.id,
      title: json.title,
      description: json.description,
      date: json.date,
      phase_en: json.phase_en,
      awarded_value: json.awarded_value,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      console.error('[API] Ошибка API:', error.message, 'Код:', error.status);
      throw error;
    }

    if (error instanceof TypeError) {
      console.error('[API] Ошибка сети:', error.message);
      throw new ApiError('Ошибка сети. Проверьте подключение к интернету.');
    }

    console.error('[API] Неизвестная ошибка:', error);
    throw new ApiError('Произошла неизвестная ошибка при загрузке тендера');
  }
}
