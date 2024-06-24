import type { DefineComponent, Component, DefineAsyncComponent } from 'vue';

export {};

interface TransitionProps {
  /**
   * 用于自动生成 CSS 过渡类名。例如：name: 'fade' 将自动拓展为 `.fade-enter`，`.fade-enter-active` 等。
   *
   * @default 'v'
   */
  name: string;
  /**
   * 是否在初始渲染时使用过渡
   *
   * @default false
   */
  appear: boolean;
  /**
   * 是否使用 CSS 过渡类，如果设置为 false，将只通过组件事件触发注册的 JavaScript 钩子
   *
   * @default true
   */
  css: boolean;
  /**
   * 控制离开/进入过渡的时间序列。有效的模式有 "out-in" 和 "in-out"；默认同时进行
   */
  mode: 'out-in' | 'in-out';
  type: string;
  enterClass: string;
  leaveClass: string;
  enterToClass: string;
  leaveToClass: string;
  enterActiveClass: string;
  leaveActiveClass: string;
  appearClass: string;
  appearActiveClass: string;
  appearToClass: string;
  duration: string | number | { enter?: number; leave?: number };
}

type TransitionGroupProps = Pick<TransitionProps, 'mode'> & {
  /** 默认为 span */
  tag: string;
  /** 覆盖移动过渡期间应用的 CSS 类 */
  moveClass: string;
};

declare module 'vue' {
  /**
   * 补充 vue 中提供的组件特性
   */
  export interface GlobalComponents {
    KeepAlive: DefineComponent<{
      /**
       * 只有名称匹配的组件会被缓存
       */
      include?: string | RegExp | Array<string>;
      /**
       * 任何名称匹配的组件都不会被缓存
       */
      exclude?: string | RegExp | Array<string>;
      /**
       * 最多可以缓存多少组件实例
       */
      max?: string | number;
    }>;
    Transition: DefineComponent<Partial<TransitionProps>>;
    TransitionGroup: DefineComponent<Partial<TransitionGroupProps>>;
    Component: DefineComponent<{
      is?: string | DefineComponent | Component | DefineAsyncComponent;
      inlineTemplate?: boolean;
    }>;
    Slot: DefineComponent<{
      /** 用于命名插槽 */
      name?: string;
    }>;
  }
}
