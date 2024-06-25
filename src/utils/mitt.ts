import Vue from 'vue';

const emitter = new Vue();

export const on = emitter.$on.bind(emitter);
export const off = emitter.$off.bind(emitter);
export const emit = emitter.$emit.bind(emitter);
