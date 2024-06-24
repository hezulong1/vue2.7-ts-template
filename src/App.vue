<template>
  <div id="app" data-initialized>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { useData } from '@/store';
import { loadLanguageAsync } from '@/utils/i18n';

const { localeName } = useData();

watchEffect(async () => {
  await loadLanguageAsync(localeName.value);
});
</script>
