import type { Directive } from 'vue';

const LOADING_DIRECTIVE_CLASS_NAME = 'loading-directive';

export const vLoading: Directive<HTMLElement> = (el, { value = true }) => {
  if (value) {
    el.classList.add(LOADING_DIRECTIVE_CLASS_NAME);
    return;
  }

  el.classList.remove(LOADING_DIRECTIVE_CLASS_NAME);
};
