export function useNoDataAvailable() {
  function displayValue(
    value: string | number | null | undefined,
    fallback: string = 'Нет данных'
  ): string {
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (typeof value === 'number' && !isNaN(value)) return String(value);
    return fallback;
  }

  return { displayValue };
}
