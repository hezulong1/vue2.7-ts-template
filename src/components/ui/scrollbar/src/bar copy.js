import { on, off } from 'element-ui/src/utils/dom';
import { isUndefined } from 'element-ui/src/utils/types';
import { renderThumbStyle, BAR_MAP } from './util';

/* istanbul ignore next */
export default {
  name: 'Bar',

  props: {
    vertical: Boolean,
    size: String,
    move: Number,
    always: Boolean,
    ratio: Number
  },

  data() {
    return {
      _originalOnSelectStart: this.$isServer ? null : document.onselectstart,
      cursorDown: false,
      cursorLeave: false,
      visible: false
    };
  },

  computed: {
    bar() {
      return BAR_MAP[this.vertical ? 'vertical' : 'horizontal'];
    },

    wrap() {
      return this.$parent.wrap;
    },

    offsetRatio() {
      // offsetRatioX = original width of thumb / current width of thumb / ratioX
      // offsetRatioY = original height of thumb / current height of thumb / ratioY
      // instance height = wrap height - GAP
      const offset = this.$el[this.bar.offset];
      const scrollSize = this.wrap ? this.wrap[this.bar.scrollSize] : undefined;
      const originalThumb = isUndefined(scrollSize) ? 0 : offset * offset / scrollSize;
      return originalThumb / this.$refs.thumb[this.bar.offset] / this.ratio;
    }
  },

  render(h) {
    const { size, move, bar, always, visible } = this;

    return (
      <transition name="el-scrollbar-fade">
        <div
          class={ ['el-scrollbar__bar', 'is-' + bar.key, { 'is-always': always }] }
          v-show={ always || visible }
          onMousedown={ this.clickTrackHandler } >
          <div
            ref="thumb"
            class="el-scrollbar__thumb"
            onMousedown={ this.clickThumbHandler }
            style={ renderThumbStyle({ size, move, bar }) }>
          </div>
        </div>
      </transition>
    );
  },

  methods: {
    clickThumbHandler(e) {
      // prevent click event of right button
      if (e.ctrlKey || e.button === 2) {
        return;
      }
      this.startDrag(e);
      this[this.bar.axis] = (e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]));
    },

    clickTrackHandler(e) {
      const offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]);
      const thumbHalf = (this.$refs.thumb[this.bar.offset] / 2);
      const thumbPositionPercentage = ((offset - thumbHalf) * 100 * this.offsetRatio / this.$el[this.bar.offset]);

      this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100);
    },

    startDrag(e) {
      e.stopImmediatePropagation();
      this.cursorDown = true;

      on(document, 'mousemove', this.mouseMoveDocumentHandler);
      on(document, 'mouseup', this.mouseUpDocumentHandler);
      document.onselectstart = () => false;
    },

    mouseMoveDocumentHandler(e) {
      if (this.cursorDown === false) return;
      const prevPage = this[this.bar.axis];

      if (!prevPage) return;

      const offset = ((this.$el.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]) * -1);
      const thumbClickPosition = (this.$refs.thumb[this.bar.offset] - prevPage);
      const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 * this.offsetRatio / this.$el[this.bar.offset]);

      this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100);
    },

    mouseUpDocumentHandler(e) {
      this.cursorDown = false;
      this[this.bar.axis] = 0;
      off(document, 'mousemove', this.mouseMoveDocumentHandler);
      // document.onselectstart = null;
      this.restoreOnselectstart();
      if (this.cursorLeave) this.visible = false;
    },

    mouseMoveScrollbarHandler() {
      this.cursorLeave = false;
      this.visible = !!this.size;
    },

    mouseLeaveScrollbarHandler() {
      this.cursorLeave = true;
      this.visible = this.cursorDown;
    },

    restoreOnselectstart() {
      if (document.onselectstart !== this._originalOnSelectStart) {
        document.onanimationstart = this._originalOnSelectStart;
      }
    }
  },

  onBeforeMount() {
    this.restoreOnselectstart();
    off(document, 'mouseup', this.mouseUpDocumentHandler);
  },

  mounted() {
    const { $el: scrollbarDOM } = this.$parent;
    if (!scrollbarDOM) return;

    on(scrollbarDOM, 'mousemove', this.mouseMoveScrollbarHandler);
    on(scrollbarDOM, 'mouseleave', this.mouseLeaveScrollbarHandler);

    this.$on('hook:destroyed', () => {
      off(scrollbarDOM, 'mousemove', this.mouseMoveScrollbarHandler);
      off(scrollbarDOM, 'mouseleave', this.mouseLeaveScrollbarHandler);
    });
  },

  destroyed() {
    off(document, 'mouseup', this.mouseUpDocumentHandler);
  }
};
