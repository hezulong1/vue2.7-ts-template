import { hasOwn } from '@vue/shared';

export { hasOwn };

/**
 * 为了 TS 更好的提示
 */
export function keysOf<T extends object>(obj: T): Array<keyof T & (string | number | boolean | null | undefined)> {
  return Object.keys(obj) as any;
}

/**
 * 检查 `obj` 中是否存在 `key`
 *
 * @param obj 被查询的对象
 * @param key `obj` 中存在的键
 */
export function isKeyof<T extends object>(obj: T, key: keyof any): key is keyof T {
  return key in obj;
}

/**
 * 合并单个对象
 */
export function objectAssign<T extends object = object, S extends object = T>(to: T, _from: S) {
  for (const key in _from) {
    if (hasOwn(_from, key)) {
      to[key] = _from[key];
    }
  }
  return to;
}

/**
 * 将多个对象合并成一个新对象
 */
export function objectsMerge<T extends object>(arr: T[]) {
  const res = {} as object;
  for (const element of arr) {
    if (element) {
      objectAssign(res, element);
    }
  }
  return res;
}
