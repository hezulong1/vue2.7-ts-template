import { isNumber, isString, isStringNumber } from './type';

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
