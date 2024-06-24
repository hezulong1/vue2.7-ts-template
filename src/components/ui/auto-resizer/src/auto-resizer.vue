<script setup lang="ts">
import type { AutoResizerEmits, AutoResizerProps } from './auto-resizer';

import { ref, watch, watchEffect } from 'vue';
import { tryOnScopeDispose, useElementSize } from '@vueuse/core';

defineOptions({
  name: 'ElAutoResizer',
});

const props = defineProps<AutoResizerProps>();
const emit = defineEmits<AutoResizerEmits>();
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

<template>
  <div ref="resizerRef" class="el-auto-resizer" style="width:100%; height:100%;">
    <slot v-bind="{ width, height }" />
  </div>
</template>
