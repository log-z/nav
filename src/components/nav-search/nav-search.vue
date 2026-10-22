<template>
  <div
    class="nav-search"
    :class="rootClass"
  >
    <form
      :class="fromClass"
      @submit.prevent="submit"
    >
      <nav-search-input
        ref="inputRef"
        v-model="data.searchWord"
        @input="input"
        @focus="focus"
        @blur="blur"
        @eng-next="engineNext"
        @eng-prev="enginePrev"
        @complete-next="completeNext"
        @complete-prev="completePrev"
      />
      <nav-search-engine-selector
        ref="engineSelectorRef"
        :engine="engine"
        @change="engineChange"
      />
      <nav-icon
        class="nav-search__submit"
        @click="submit"
      >
        <CheveronRight />
      </nav-icon>
    </form>
    <nav-search-complete
      ref="completeRef"
      :list="data.complete"
      @selecte="completeSelect"
      @change="completeChange"
    />
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { NavIcon, CheveronRight } from '@/icons-vue'
import NavSearchInput from './nav-search-input.vue';
import NavSearchEngineSelector from './nav-search-engine-selector.vue';
import NavSearchComplete from './nav-search-complete.vue';
import { usePrefersStore } from '@/stores/prefers'
import { debounce } from '@/utils/common'
import { target as engineTarget, complete as engineComplete } from '@/utils/search-engine';

const prefersStore = usePrefersStore()

const MAX_COMPLETE_SUGGESTIONS = 10

const inputRef = ref()
const engineSelectorRef = ref()
const completeRef = ref()

const data = reactive({
  searchWord: '',
  complete: [],
  isFocus: true,
})

const rootClass = computed(() => featureGlassmorphism.value ? 'glassmorphism' : null)
const fromClass = computed(() => data.isFocus ? 'nav-card-1' : 'nav-card-2')
const engine = computed(() => prefersStore.searchEngine)
const featureGlassmorphism = computed(() => prefersStore.feature.glassmorphism)

const input = debounce(async (val) => {
  if (!val) {
    data.complete = []
    return
  }

  try {
    const res = await engineComplete(engine.value, val)
    if (
      res.wd?.toLowerCase() === data.searchWord.toLowerCase() &&
      res.eng === engine.value &&
      inputRef.value.hasFocus()
    ) {
      data.complete = [
        data.searchWord,
        ...res.list.filter(v => Boolean(v)).slice(0, MAX_COMPLETE_SUGGESTIONS),
      ];
    }
  } catch (error) {
    console.error(error)
  }
}, 100)
const focus = () => {
  data.isFocus = true;
  input(data.searchWord);
}
const blur = () => {
  data.isFocus = false;
  data.complete = [data.searchWord];
}
const submit = () => {
  const url = engineTarget(engine.value, data.searchWord);
  window.open(url)?.focus();
}
const engineNext = () => {
  engineSelectorRef.value.next();
}
const enginePrev = () => {
  engineSelectorRef.value.prev();
}
const engineChange = (eng) => {
  prefersStore.searchEngine = eng
  data.complete = [data.searchWord]
  input(data.searchWord);
  inputRef.value.focus();
}
const completeNext = () => {
  completeRef.value.next();
}
const completePrev = () => {
  completeRef.value.prev();
}
const completeChange = (val) => {
  data.searchWord = val;
}
const completeSelect = (val) => {
  data.searchWord = val;
  submit();
}
</script>

<style>
.nav-search {
  --v-spacing: 0.6rem;
  --h-spacing: 1rem;
  position: relative;
}
.nav-search.glassmorphism {
  --bg-color: rgb(245 245 245 / 70%);
  --bg-filter: blur(20px) brightness(.9);
}

/* 搜索框表单 */
.nav-search > form {
  width: auto;
  min-height: unset;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  transition: box-shadow 0.3s, background-color 0.2s;
}
.nav-search > form::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--bg-color);
  border-radius: var(--border-radius);
  z-index: 0;
}
.nav-search.glassmorphism > form::before {
  backdrop-filter: var(--bg-filter);
}

.nav-search > form > * {
  z-index: 1;
}

.nav-search-input {
  flex-grow: 1;
}

.nav-search__submit,
.nav-search-engine-selector__action {
  font-size: 1.7rem;
  opacity: 0.3;
  transition: opacity 0.3s;
}
.nav-search__submit:hover,
.nav-search-engine-selector:hover .nav-search-engine-selector__action {
	opacity: 0.6;
}
.nav-search__submit {
  font-size: 1.28rem;
  padding-right: calc(var(--h-spacing) / 2);
  cursor: pointer;
  display: flex;
  align-items: center;
}


/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  .vue-app[scheme=auto] .nav-search.glassmorphism {
    --bg-color: rgb(22 22 22 / 50%);
  }
}



/******** 强制暗色模式 ********/

.vue-app[scheme=dark] .nav-search.glassmorphism {
  --bg-color: rgb(22 22 22 / 50%);
}
</style>
