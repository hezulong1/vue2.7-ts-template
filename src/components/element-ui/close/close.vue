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

<script setup lang="ts">
import { computed } from 'vue';
import { Close } from 'element-icons';
import { ElIcon } from '../icon';

defineOptions({
  name: 'ElClose',
});

const props = defineProps<{
  ariaLabel?: string;
  tabindex?: Numberish;
  id?: string;
}>();
const emit = defineEmits<{
  (type: 'click', event: PointerEvent): void;
  (type: 'enter', event: KeyboardEvent): void;
}>();

const attrAriaLabel = computed(() => props.ariaLabel ? props.ariaLabel : undefined);

function handleClick(event: MouseEvent) {
  emit('click', event as unknown as PointerEvent);
}

function handleEnter(event: KeyboardEvent) {
  emit('enter', event);
}
</script>
