// reference https://github.com/noeldelgado/gemini-scrollbar/blob/master/index.js

import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
import scrollbarWidth from 'element-ui/src/utils/scrollbar-width';
import { isObject, isNumber } from 'element-ui/src/utils/types';
import { isFirefox } from 'element-ui/src/utils/util';
import { addUnit } from 'element-ui/src/utils/dom';
import Bar from './bar';

/* istanbul ignore next */
export default {
  name: 'ElScrollbar',

  components: { Bar },

  props: {
    height: {
      type: [String, Number],
      default: ''
    },
    maxHeight: {
      type: [String, Number],
      default: ''
    },
    native: Boolean,
    wrapStyle: {},
    wrapClass: {},
    viewClass: {},
    viewStyle: {},
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {
      type: String,
      default: 'div'
    },
    always: Boolean,
    minSize: {
      type: Number,
      default: 20
    }
  },

  data() {
    return {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0,
      ratioX: 1,
      ratioY: 1
    };
  },

  computed: {
    wrap() {
      return this.$refs.wrap;
    },

    gutter() {
      if (this.$isServer) return 0;
      if (isFirefox) return 0;
      if (window.navigator.userAgent.match(/webkit/i)) return 0;
      return scrollbarWidth();
    }
  },

  watch: {
    height() {
      if (this.native) return;
      this.$nextTick(this.update);
    },
    maxHeight() {
      if (this.native) return;
      this.$nextTick(this.update);
    }
  },

  render(h) {
    let gutter = this.gutter;
    let style = [];

    const isStringWrapStyle = typeof this.wrapStyle === 'string';

    style.push(this.wrapStyle);
    if (this.height) style.push(isStringWrapStyle === 'string' ? `height: ${addUnit(this.height)}` : {height: addUnit(this.height)});
    if (this.maxHeight) style.push(isStringWrapStyle === 'string' ? `max-height: ${addUnit(this.maxHeight)}` : {maxHeight: addUnit(this.maxHeight)});

    if (gutter) {
      const gutterWith = `-${addUnit(gutter)}`;
      style.push(isStringWrapStyle === 'string' ? `margin-bottom: ${gutterWith}; margin-right: ${gutterWith}` : {
        marginBottom: gutterWith,
        marginRight: gutterWith
      });
      // const gutterStyle = `margin-bottom: ${gutterWith}; margin-right: ${gutterWith};`;

      // if (Array.isArray(this.wrapStyle)) {
      //   style = toObject(this.wrapStyle);
      //   style.marginRight = style.marginBottom = gutterWith;
      // } else if (typeof this.wrapStyle === 'string') {
      //   style += gutterStyle;
      // } else {
      //   style = gutterStyle;
      // }
    }
    const view = h(this.tag, {
      class: ['el-scrollbar__view', this.viewClass],
      style: this.viewStyle,
      ref: 'resize'
    }, this.$slots.default);
    const wrap = (
      <div
        ref="wrap"
        style={ isStringWrapStyle ? style.join(';') : style }
        onScroll={ this.handleScroll }
        class={ [this.wrapClass, 'el-scrollbar__wrap', gutter ? '' : 'el-scrollbar__wrap--hidden-default'] }>
        { [view] }
      </div>
    );
    let nodes;

    if (!this.native) {
      nodes = ([
        wrap,
        <Bar
          move={ this.moveX }
          size={ this.sizeWidth }
          always={ this.always }
          ratio={ this.ratioX }></Bar>,
        <Bar
          vertical
          move={ this.moveY }
          size={ this.sizeHeight }
          always={ this.always }
          ratio={ this.ratioY }></Bar>
      ]);
    } else {
      nodes = ([
        <div
          ref="wrap"
          class={ [this.wrapClass, 'el-scrollbar__wrap'] }
          style={ style }>
          { [view] }
        </div>
      ]);
    }
    return h('div', { class: 'el-scrollbar' }, nodes);
  },

  methods: {
    handleScroll() {
      const wrap = this.wrap;

      this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight * this.ratioY);
      this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth * this.ratioX);

      this.$emit('scroll', {scrollTop: wrap.scrollTop, scrollLeft: wrap.scrollLeft});
    },

    update() {
      const wrap = this.wrap;
      if (!wrap) return;

      const minHeightPercentage = (this.minSize * 100 / wrap.clientHeight);
      const minWidthPercentage = (this.minSize * 100 / wrap.clientWidth);

      const originHeightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight);
      const originWidthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth);

      const heightPercentage = Math.max(minHeightPercentage, originHeightPercentage);
      const widthPercentage = Math.max(minWidthPercentage, originWidthPercentage);

      this.ratioY =
        (originHeightPercentage / (100 - originHeightPercentage)) /
        (heightPercentage / (100 - heightPercentage));
      this.ratioX =
        (originWidthPercentage / (100 - originWidthPercentage)) /
        (widthPercentage / (100 - widthPercentage));
      if (isNaN(this.ratioY)) this.ratioY = 1;
      if (isNaN(this.ratioX)) this.ratioX = 1;

      this.sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : '';
      this.sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : '';
    },

    scrollTo(arg1, arg2) {
      if (this.$isServer) return;
      if (!this.wrap) return;
      if (isObject(arg1)) {
        this.wrap.scrollTo && this.wrap.scrollTo(arg1);
      } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
        this.wrap.scrollTo && this.wrap.scrollTo(arg1, arg2);
      }
    },

    setScrollTop(value) {
      if (this.$isServer) return;
      if (!isNumber(value)) return;
      if (!this.wrap) return;
      this.wrap.scrollTop = value;
    },

    setScrollLeft(value) {
      if (this.$isServer) return;
      if (!isNumber(value)) return;
      if (!this.wrap) return;
      this.wrap.scrollLeft = value;
    }
  },

  mounted() {
    if (this.native) return;
    this.$nextTick(this.update);
    !this.noresize && addResizeListener(this.$refs.resize, this.update);
  },

  beforeDestroy() {
    if (this.native) return;
    !this.noresize && removeResizeListener(this.$refs.resize, this.update);
  }
};
