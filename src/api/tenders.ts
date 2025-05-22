import type {Tender, TendersResponse} from '@/types/tenders';

const API_URL = 'https://api.test-webest.ru/list/';
const API_URL_ELEMENT = 'https://api.test-webest.ru/element/';

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

export async function fetchTenderById(id: number): Promise<Tender> {
  try {
    const response = await fetch(`${API_URL_ELEMENT}?id=${id}`);

    if (!response.ok) throw new Error('Ошибка загрузки данных тендера');

    const json = await response.json();

    return {
      id: json.id,
      title: json.title,
      description: json.description,
      date: json.date,
      phase_en: json.phase_en,
      awarded_value: json.awarded_value,
    };
  } catch (error) {
    console.error('Ошибка API:', error);
    throw error;
  }
}
