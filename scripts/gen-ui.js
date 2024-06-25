import path from 'node:path';
import fs from 'fs-extra';
import dayjs from 'dayjs';
import * as helper from './helper.js';

const DEST = helper.resolve('src/components/ui');
const data = fs.readJSONSync(path.join(DEST, 'auto-register.json'));

const componentNames = [];
const entriesOfComponent = Object.entries(data.components).map((d) => {
  const src = `./${d[0]}`;
  const imports = helper.uniq(helper.toStringArray(d[1]));
  componentNames.push(...imports);
  return [src, imports];
});

const pluginNames = [];
const entriesOfPlugin = Object.entries(data.plugins).map((d) => {
  const src = `./${d[0]}`;
  const imports = d[1].name;
  const extractors = d[1].extractors;
  pluginNames.push(imports);
  return [src, imports, extractors];
});

const BANNER = `
// Auto-Generated
// Date: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}
// DON'T EDIT THIS!!!
`.trim();

// #region generate index.ts
{
  const template = `
${BANNER}

import type { VueConstructor, PluginFunction } from 'vue';

// Components
$import-components

// Plugins
$import-plugins

const components = [
$components
];

const plugins = [
$plugins
] as PluginFunction<any>[];

let isInstalled = false;
export default function install(Vue: VueConstructor) {
  if (isInstalled) return;
  isInstalled = true;

  components.forEach(c => Vue.component(c.name!, c));
  plugins.forEach(p => Vue.use(p));
}
`.trimStart();

  const varImportComponents = entriesOfComponent
    .map(([src, imports]) => `import { ${imports.join(', ')} } from '${src}';`)
    .join('\n');
  const varComponents = componentNames
    .map(name => `${helper.indent(2)}${name},`)
    .join('\n');
  const varImportPlugins = entriesOfPlugin
    .map(([src, imports]) => `import { ${imports} } from '${src}';`)
    .join('\n');
  const varPlugins = pluginNames
    .map(name => `${helper.indent(2)}${name},`)
    .join('\n');
  const code = template
    .replace('$import-components', varImportComponents)
    .replace('$components', varComponents)
    .replace('$import-plugins', varImportPlugins)
    .replace('$plugins', varPlugins);

  fs.writeFileSync(path.join(DEST, 'index.ts'), code, { encoding: 'utf8' });
}
// #endregion

// #region generate volar.d.ts
{
  const template = `
${BANNER}

export {};

// Read more: https://github.com/vuejs/core/pull/3399
declare module 'vue' {
  export interface GlobalComponents {
$components
  }

  interface ComponentCustomProperties {
$plugins
  }
}
`.trimStart();

  const varComponents = [
    ...entriesOfComponent.map(
      ([src, exports]) => exports.map(name => `${helper.indent(4)}${name}: typeof import('${src}')['${name}'];`).join('\n'),
    ),
    ...entriesOfComponent.map(
      ([src, exports]) => exports.map(name => `${helper.indent(4)}['${helper.hyphenate(name)}']: typeof import('${src}')['${name}'];`).join('\n'),
    ),
  ].join('\n');
  const varPlugins = entriesOfPlugin
    .map(([src, exportName, extractors]) => {
      void 0;

      return Object.entries(extractors).map((extractor) => {
        const dir = extractor[0].split('.').map(d => `['${d}']`).join('');
        return `${helper.indent(4)}${extractor[1]}: typeof import('${src}')${dir};`;
      }).join('\n');
    })
    .join('\n');
  const code = template
    .replace('$components', varComponents)
    .replace('$plugins', varPlugins);

  fs.writeFileSync(path.join(DEST, 'volar.d.ts'), code, { encoding: 'utf8' });
}
// #endregion

console.log('✨ Done.');
