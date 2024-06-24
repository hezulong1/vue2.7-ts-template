/// <reference types="vite/client" />
/// <reference types="unplugin-vue-macros/vue2-macros-global" />

interface ImportMetaEnv {

}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  var component: DefineComponent;
  export default component;
}

type Numberish = number | string;
