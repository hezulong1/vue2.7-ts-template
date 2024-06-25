<template>
  <div id="app" data-initialized>
    <router-link to="/">Home</router-link>
    <span style="padding: 0 10px">|</span>
    <router-link to="/a">About</router-link>
    <span style="padding: 0 10px">|</span>
    <select v-model="transitionName">
      <option value="page">page</option>
      <option value="slide">slide</option>
    </select>

    <div style="width: 300px; height: 50px; background: #f7f7f7; overflow: hidden">
      <transition :name="transitionName" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useData } from './store';
import { loadLanguageAsync } from './utils/i18n';

const { localeName } = useData();
watchEffect(async () => {
  await loadLanguageAsync(localeName.value);
});

const transitionName = ref('page');
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  filter: blur(1rem);
  opacity: 0;
}

.slide-leave-active,
.slide-enter-active {
  transition: all 0.3s;
}
.slide-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
