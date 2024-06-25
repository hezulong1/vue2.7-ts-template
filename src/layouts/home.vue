<template>
  <div>
    <span>{{ message }}</span>
    <button type="button" @click="onDidClick">{{ locale }}</button>
    <button v-repeat-click="onDidAdd" type="button">{{ num }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type DirectiveOptions } from 'vue';
import { useLocale } from '@/composables/locale';
import { useData } from '@/store';
import repeatClick from '@/directives/repeat-click';

defineOptions({
  directives: {
    repeatClick: repeatClick as DirectiveOptions,
  },
  i18n: {
    messages: {
      'zh-Hans': {
        happy: '快乐',
      },
      'en': {
        happy: 'Happy',
      },
    },
  },
});

const siteData = useData();
const { t, locale } = useLocale(false);

const num = ref(0);
const message = computed(() => t('happy'));

function onDidAdd() {
  num.value++;
}

function onDidClick(e: MouseEvent) {
  siteData.localeName.value = locale.value === 'zh-Hans' ? 'en' : 'zh-Hans';
}
</script>
