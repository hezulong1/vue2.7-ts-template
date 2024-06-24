import Vue from 'vue';

const emitter = new Vue();

export const on = emitter.$on;
export const off = emitter.$off;
export const emit = emitter.$emit;
