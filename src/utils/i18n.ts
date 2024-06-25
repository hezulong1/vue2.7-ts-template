import Vue from 'vue';
import VueI18n, { type Locale } from 'vue-i18n';
import zhHans from '@/langs/zh-Hans';

Vue.use(VueI18n);

export const defaultLanguage = 'zh-Hans';

const i18n = new VueI18n({
  locale: defaultLanguage,
  fallbackLocale: defaultLanguage,
  messages: { [defaultLanguage]: zhHans },
});

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../langs/*.ts'))
    .map(([path, loadLocale]) => [path.match(/([\w-]*)\.ts$/)?.[1], loadLocale]),
) as Record<Locale, () => Promise<{ default: Record<string, string > }>>;

export const availableLocales = Object.keys(localesMap);

const loadedLanguages: string[] = [defaultLanguage];

function setI18nLanguage(lang: Locale) {
  i18n.locale = lang;
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', lang);
  }
  return lang;
}

/**
 * @see https://kazupon.github.io/vue-i18n/zh/guide/lazy-loading.html
 */
export async function loadLanguageAsync(lang: string): Promise<Locale> {
  if (i18n.locale === lang) {
    return setI18nLanguage(lang);
  }

  if (loadedLanguages.includes(lang)) {
    return setI18nLanguage(lang);
  }

  const messages = await localesMap[lang]();
  i18n.setLocaleMessage(lang, messages.default);
  loadedLanguages.push(lang);
  return setI18nLanguage(lang);
}

export default i18n;
