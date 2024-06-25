import { watch } from 'vue';
import { createGlobalState, useStorage } from '@vueuse/core';
import { defaultLanguage, availableLocales, loadLanguageAsync } from '@/utils/i18n';

export const useData = createGlobalState(() => {
  const localeName = useStorage('app.locale', defaultLanguage);

  watch(localeName, async (locale) => {
    if (availableLocales.includes(locale)) {
      await loadLanguageAsync(locale);
    } else {
      localeName.value = defaultLanguage;
    }
  });

  return {
    localeName,
  };
});
