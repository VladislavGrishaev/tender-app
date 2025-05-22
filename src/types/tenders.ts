export interface Tender {
  id: string;
  title: string;
  description: string;
  date: string;
  phase_en: string;
  awarded_value: string;
}

export interface TendersResponse {
  data: Tender[];
  total: number;
  page_count: number;
  page_number: number;
}
