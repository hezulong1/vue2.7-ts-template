import { isObject, isString } from '@vue/shared';

export {
  isArray,
  isFunction,
  isDate,
  isObject,
  isString,
  isPlainObject,
  isSymbol,
  isPromise,
} from '@vue/shared';

export const isNumber = (val: any): val is number => typeof val === 'number';
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean';
export const isNil = (val: any): val is null | undefined => val == null;

export const isEmpty = (val: unknown) =>
  (!val && val !== 0)
  || (Array.isArray(val) && val.length === 0)
  || (isObject(val) && !Object.keys(val).length);

export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') return false;
  return e instanceof Element;
};

export const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false;
  }
  return !Number.isNaN(Number(val));
};
