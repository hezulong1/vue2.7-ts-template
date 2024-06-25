import type { ObjectDirective } from 'vue';

import { once } from '@/utils/dom';
import { isFunction } from '@/utils/type';

export const REPEAT_INTERVAL = 100;
export const REPEAT_DELAY = 600;

export interface RepeatClickOptions {
  interval?: number;
  delay?: number;
  handler: (...args: unknown[]) => unknown;
}

export default <ObjectDirective<HTMLElement, RepeatClickOptions | RepeatClickOptions['handler']>>{
  bind(el, binding) {
    const value = binding.value;
    const { interval = REPEAT_INTERVAL, delay = REPEAT_DELAY } = isFunction(value) ? {} : value;

    let intervalId: ReturnType<typeof setInterval> | undefined;
    let delayId: ReturnType<typeof setTimeout> | undefined;

    const handler = () => (isFunction(value) ? value() : value.handler());

    const clear = () => {
      if (delayId) {
        clearTimeout(delayId);
        delayId = undefined;
      }
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = undefined;
      }
    };

    el.addEventListener('mousedown', (e: MouseEvent) => {
      if (e.button !== 0) return;
      clear();
      handler();

      once(document, 'mouseup', clear);

      delayId = setTimeout(() => {
        intervalId = setInterval(() => {
          handler();
        }, interval);
      }, delay);
    });
  },
};
