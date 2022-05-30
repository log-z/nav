<template>
  <div class="nav-search-input">
    <input
      class="nav-search-input__input"
      type="text"
      autocomplete="off"
      autofocus="autofocus"
      spellcheck="false"
      placeholder="👴 来点什么？"
      ref="inputRef"
      :value="modelValue"
      @input="input"
      @focus="emit('focus')"
      @blur="emit('blur')"
      @keydown.down.exact.prevent="emit('complete-next')"
      @keydown.up.exact.prevent="emit('complete-prev')"
      @keydown.down.ctrl.exact.prevent="emit('eng-next')"
      @keydown.up.ctrl.exact.prevent="emit('eng-prev')"
    >
  </div>
</template>

<script>
export default {
  name: 'navSearchInput',
  props: {
    modelValue: {
      type: String,
      default: function() {
        return ''
      }
    },
  }
}
</script>
<script setup>
import { defineEmits, defineExpose, ref } from 'vue';

const inputRef = ref()
const emit = defineEmits([
  'input',
  'focus',
  'blur',
  'complete-next',
  'complete-prev',
  'eng-next',
  'eng-prev',
  'update:modelValue',
])

const input = (event) => {
  const val = event.target.value
  emit('update:modelValue', val)
  emit('input', val)
}
const focus = () => inputRef.value.focus()
const hasFocus = () => inputRef.value == document.activeElement

defineExpose({
  focus,
  hasFocus,
})
</script>

<style>
.nav-search-input__input {
  width: 100%;
  padding: var(--v-spacing) var(--h-spacing);
  border: none;
  font-size: 1rem;
  line-height: 1.5rem;
  background: transparent;
}
</style>