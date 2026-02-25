<template>
  <div class="nav-search-input">
    <input
      ref="inputRef"
      name="nav-search-input"
      class="nav-search-input__input"
      type="text"
      autocomplete="off"
      autofocus="autofocus"
      spellcheck="false"
      :placeholder="placeholder"
      :value="modelValue"
      @input="input"
      @focus="emit('focus')"
      @blur="emit('blur')"
      @keydown.escape.exact.prevent="inputRef.blur() && emit('blur')"
      @keydown.down.exact.prevent="emit('complete-next')"
      @keydown.up.exact.prevent="emit('complete-prev')"
      @keydown.down.ctrl.exact.prevent="emit('eng-next')"
      @keydown.up.ctrl.exact.prevent="emit('eng-prev')"
    >
  </div>
</template>

<script>
export default {
  name: 'NavSearchInput',
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
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()

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

const placeholder = computed(() => configStore.config.search?.placeholder)

const input = (event) => {
  const val = event.target.value
  emit('update:modelValue', val)
  emit('input', val)
}
const focus = () => inputRef.value.focus()
const hasFocus = () => inputRef.value == document.activeElement

// 监听快捷键
const SHORTCUT_KEYS = ['Escape', '/']
const IGNORE_ELEMENT = ['INPUT', 'TEXTAREA']
const keydownHandler = (event) => {
  if (SHORTCUT_KEYS.includes(event.key) && !IGNORE_ELEMENT.includes(event.target.nodeName)) {
    focus()
    event.preventDefault()
  }
}

onMounted(() => {
  document.addEventListener('keydown', keydownHandler)
})

onUnmounted(() => {
  document.removeEventListener('keydown', keydownHandler)
})

defineExpose({
  focus,
  hasFocus,
})
</script>

<style>
.nav-search-input__input {
  width: calc(100% - 2 * var(--h-spacing));
  padding: var(--v-spacing) var(--h-spacing);
  border: none;
  font-size: 1rem;
  line-height: 1.5rem;
  background: transparent;
}
</style>