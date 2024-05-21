export const onScrollTo = (elementRef: HTMLDivElement | null) => {
  if (!elementRef) {
    return;
  }
  const scrollHeiht = document.body.scrollTop + (elementRef.getBoundingClientRect()?.top ?? 0);
  window.scrollTo({top: scrollHeiht, behavior: 'smooth'});
};
