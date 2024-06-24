<script setup lang="ts">
import type { CloseProps, CloseEmits } from './close';

import { computed } from 'vue';
import { Close } from '@element-plus/icons-vue';
import { ElIcon } from '@/components/ui/icon';

defineOptions({
  name: 'ElClose',
});

const props = defineProps<CloseProps>();
const emit = defineEmits<CloseEmits>();

const attrAriaLabel = computed(() => props.ariaLabel ? props.ariaLabel : undefined);

function handleClick(event: MouseEvent) {
  emit('click', event as unknown as PointerEvent);
}

function handleEnter(event: KeyboardEvent) {
  emit('enter', event);
}
</script>

<template>
  <a
    :id="id"
    class="el-close"
    role="button"
    :aria-label="attrAriaLabel"
    :tabindex="tabindex"
    @click.stop="handleClick"
    @keydown.prevent.enter="handleEnter"
  >
    <ElIcon><Close /></ElIcon>
  </a>
</template>
