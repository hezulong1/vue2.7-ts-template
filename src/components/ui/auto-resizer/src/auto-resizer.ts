import type { ElementSize } from '@vueuse/core';

export interface AutoResizerProps {
  disabled?: boolean;
  onResize?: (size: ElementSize) => void;
}

export interface AutoResizerEmits {
  (type: 'resize', size: ElementSize): void;
}
