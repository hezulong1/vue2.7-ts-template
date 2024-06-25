import type { ObjectDirective } from 'vue';
import type { NormalizedWheelEvent } from 'normalize-wheel-es';

import normalizeWheel from 'normalize-wheel-es';

const mousewheel = function (
  element: HTMLElement,
  callback: (e: WheelEvent, normalized: NormalizedWheelEvent) => void,
) {
  if (element && element.addEventListener) {
    const fn = function (this: HTMLElement, event: WheelEvent) {
      const normalized = normalizeWheel(event);
      // eslint-disable-next-line no-invalid-this
      callback && callback.apply(this, [event, normalized]);
    };
    element.addEventListener('wheel', fn, false);
  }
};

export default <ObjectDirective<HTMLElement, any>>{
  bind(el, binding) {
    mousewheel(el, binding.value);
  },
};
