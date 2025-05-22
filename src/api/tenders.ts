import type { TendersResponse } from '@/types/tenders';

const API_URL = 'https://api.test-webest.ru/list/';

export async function fetchTenders(): Promise<TendersResponse> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) throw new Error('Ошибка загрузки тендеров');

    const json = await response.json();

    return {
      data: json.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        date: item.date,
        phase_en: item.phase_en,
        awarded_value: item.awarded_value
      })),
      total: json.total,
      page_count: json.page_count,
      page_number: json.page_number
    };
  } catch (error) {
    console.error('Ошибка API:', error);
    throw error;
  }
}
