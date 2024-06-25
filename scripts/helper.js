import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

import fs from 'fs-extra';
import { normalizePath } from 'vite';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
export const __require = createRequire(import.meta.url);
export const resolve = dir => normalizePath(path.join(rootDir, dir));

/**
 *
 * @param { string } dir
 * @param { 'file' | 'direction'} type
 */
export function globSync(dir, type = 'file') {
  return fs.readdirSync(dir).flatMap((f) => {
    const isDirectory = fs.statSync(`${dir}/${f}`).isDirectory();
    return type === 'file'
      ? isDirectory ? [] : [f]
      : isDirectory ? [f] : [];
  });
}

export const indent = n => ' '.repeat(n);
export const camelize = s => s.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '');
export const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);
export const pascal = s => capitalize(camelize(s));
export const hyphenate = str => str.replace(/\B([A-Z])/g, '-$1').toLowerCase();
export const uniq = a => Array.from(new Set(a));
export const toStringArray = s => (s = s.trim() ? s.replace(/，/g, ',').split(',').map(ss => ss.trim()) : []);
export const stringToLines = s => s.split(/\r\n|\r|\n/);
