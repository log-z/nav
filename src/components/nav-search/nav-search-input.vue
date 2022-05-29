<template>
  <input
    class="input"
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
const focus = () => {
  inputRef.value.focus();
}

defineExpose({
  focus
})
</script>

<style scoped>
.input {
  width: 0;
  padding: var(--v-spacing) var(--h-spacing);
  border: none;
  font-size: 1rem;
  line-height: 1.5rem;
  flex-grow: 1;
  background: transparent;
}
</style>