import { computed, getCurrentInstance } from 'vue';

export function useLocale(atRoot = true) {
  if (import.meta.env.DEV) {
    if (!getCurrentInstance()) {
      throw new Error('Missing current instance. useLocale() must be called inside <script setup> or setup().');
    }
  }

  const proxy = getCurrentInstance()!.proxy;
  const vm = atRoot ? proxy.$root : proxy;
  const locale = computed(() => vm.$i18n.locale);

  return { locale, t: vm.$t.bind(vm), tc: vm.$tc.bind(vm) };
}
