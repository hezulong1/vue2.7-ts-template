import path from 'node:path';
import fs from 'fs-extra';
import { format } from 'prettier';
import * as helper from './helper.js';

const DIR_SRC = helper.resolve(/* SVG Director */'');
const DIR_DEST = helper.resolve('src/components/global-icons');

// 也可以创建所有的图标
const fileNames = helper.globSync(DIR_SRC, 'file')
  .filter(name => name.endsWith('.svg'))
  .map(name => name.replace('.svg', ''));

const indexTSTemplate = `
// Auto-Generated
// DON'T EDIT THIS!!!

$exports
`.trimStart();
const indexTSExports = fileNames
  .map(name => `export { default as ${helper.pascal(name)} } from './${name}.vue';`)
  .join('\n');
const indexTSContent = indexTSTemplate.replace('$exports', indexTSExports);

fs.ensureDirSync(DIR_DEST);
fs.emptyDirSync(DIR_DEST);
// 写入 index.ts
fs.writeFileSync(path.join(DIR_DEST, 'index.ts'), indexTSContent, 'utf8');
// 写入 <component-name>.vue
fileNames.forEach(async (name) => {
  const dest = path.join(DIR_DEST, `${name}.vue`);
  if (fs.existsSync(dest)) return;

  const raw = await fs.readFile(path.join(DIR_SRC, `${name}.svg`), 'utf8');
  const content = raw.replace('<svg', `<svg width="1em" height="1em" fill="currentColor" aria-label="${name}"`);
  let code = `
<template>
  <!--
    Auto-Generated
    DON'T EDIT THIS!!!
  -->
${content}
</template>
`.trimStart();
  code = await format(code, { parser: 'vue' });

  await fs.writeFile(dest, code, 'utf8');
});

console.log('✨ Done.');
