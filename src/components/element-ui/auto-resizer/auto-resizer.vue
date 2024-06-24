<template>
  <div ref="resizerRef" class="el-auto-resizer" style="width:100%; height:100%;">
    <slot v-bind="{ width, height }" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
import { tryOnScopeDispose, useElementSize, type ElementSize } from '@vueuse/core';

defineOptions({
  name: 'ElAutoResizer',
});

const props = defineProps<{
  disabled?: boolean;
}>();
const emit = defineEmits<{
  (type: 'resize', size: ElementSize): void;
}>();
const resizerRef = ref<HTMLElement>();

const { width, height, stop } = useElementSize(resizerRef);

watch([width, height], ([widthValue, heightValue]) => {
  emit('resize', { width: widthValue, height: heightValue });
});

watchEffect(() => {
  if (props.disabled) {
    stop();
  }
});

tryOnScopeDispose(stop);
</script>
