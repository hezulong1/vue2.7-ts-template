import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import vueJsx from '@vitejs/plugin-vue2-jsx';
import legacy from '@vitejs/plugin-legacy';
import autoprefixer from 'autoprefixer';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const postcssPlugins = [_postcss_plugin_local()];
  if (!isDev) {
    postcssPlugins.push(autoprefixer({}));
  }
  return {
    base: isDev ? '/' : './',
    plugins: [
      vue(),
      vueJsx(),
      legacy({
        targets: '>0.3%, Chrome>=58, IE>=10',
      }),
    ],
    resolve: {
      alias: [
        { find: '@/', replacement: `${path.join(rootDir, 'src')}/` },
        // 确保 dayjs 导出的是 esm 格式
        { find: /^(dayjs)(?!\/esm)/, replacement: '$1/esm' },
      ],
    },
    build: {
      outDir: 'out',
      emptyOutDir: true,
      cssTarget: 'chrome58',
      minify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
        },
      },
      postcss: {
        plugins: postcssPlugins,
      },
    },
  };
});

function _postcss_plugin_local() {
  return {
    postcssPlugin: '_postcss_plugin_local',
    AtRule: {
      charset(atRule) {
        atRule.name === 'charset' && atRule.remove();
      },
    },
  };
}
