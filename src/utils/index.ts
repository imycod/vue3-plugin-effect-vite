let t: any = null;
export function debounce(callback: Function, delay: number = 500) {
  clearTimeout(t);
  t = setTimeout(callback, delay);
}
