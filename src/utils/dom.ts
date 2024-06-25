import type { AnyFn } from '@vueuse/core';
import { isNumber, isString, isStringNumber } from './type';

export function once<K extends keyof WindowEventMap>(el: Window, type: K, fn: AnyFn): void;
export function once<K extends keyof DocumentEventMap>(el: Document, type: K, fn: AnyFn): void;
export function once<K extends keyof HTMLElementEventMap>(el: HTMLElement, type: K, fn: AnyFn): void;
export function once(el: HTMLElement, type: string, fn: AnyFn): void;
export function once(el: HTMLElement | Window | Document, type: string, fn: AnyFn): void {
  let listener = function (this: typeof el) {
    if (fn) {
      // eslint-disable-next-line no-invalid-this, prefer-rest-params
      fn.apply<typeof el, any, void>(this, arguments);
    }
    el.removeEventListener(type, listener);
  };
  el.addEventListener(type, listener);
}

export function addUnit(value?: string | number, defaultUnit = 'px') {
  if (!value) return '';
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (isString(value)) {
    return value;
  }
  if (import.meta.env.DEV) {
    console.error('[shared] binding value must be a string or number');
  }
}
