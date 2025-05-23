const SCROLL_POSITION_KEY = 'tenders-scroll-position';

export function useScrollMemory(headerHeight = 0) {
  const saveScrollPosition = () => {
    sessionStorage.setItem(SCROLL_POSITION_KEY, String(window.scrollY));
  };

  const restoreScrollPosition = () => {
    const scrollPos = sessionStorage.getItem(SCROLL_POSITION_KEY);
    if (scrollPos) {
      window.scrollTo({
        top: Number(scrollPos),
        behavior: 'auto'
      });
    }
  };

  const scrollToElement = (el: HTMLElement) => {
    const top = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: top - headerHeight, behavior: 'smooth' });
  };

  return { saveScrollPosition, restoreScrollPosition, scrollToElement };
}
