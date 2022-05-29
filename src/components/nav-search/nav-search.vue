<template>
  <div class="search">
    <form
      :class="fromClass"
      @submit.prevent="submit"
    >
      <nav-search-input
        v-model="data.searchWord"
        ref="inputRef"
        @input="input"
        @focus="focus"
        @blur="blur"
        @eng-next="engineNext"
        @eng-prev="enginePrev"
        @complete-next="completeNext"
        @complete-prev="completePrev" />
      <nav-search-engine-selector
        ref="engineSelectorRef"
        :engine="engine"
        @change="engineChange" />
      <nav-search-action
        icon="submit"
        @click="submit" />
    </form>
    <nav-search-complete
      ref="completeRef"
      :list="data.complete"
      @selecte="completeSelect"
      @change="completeChange" />
  </div>
</template>

<script>
export default {
  name: 'navSearch'
}
</script>
<script setup>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import $_ from 'lodash'
import NavSearchInput from './nav-search-input';
import NavSearchAction from './nav-search-action';
import NavSearchEngineSelector from './nav-search-engine-selector';
import NavSearchComplete from './nav-search-complete';
import searchEngine from '@/utils/search-engine';

const store = useStore()

const inputRef = ref()
const engineSelectorRef = ref()
const completeRef = ref()

const data = reactive({
  searchWord: '',
  complete: [],
  isFocus: true,
})

const fromClass = computed(() => data.isFocus ? 'card-2' : 'card-1')
const engine = computed(() => store.state.prefers.searchEngine)

let input = $_.debounce((val) => {
  if (!val) {
    data.complete = []
    return
  }

  searchEngine.complete(engine.value, val, (res) => {
    if (res.wd === data.searchWord && res.eng === engine.value) {
      data.complete = [
        data.searchWord,
        ...res.list.filter(v => Boolean(v))
      ];
    }
  })
}, 100)
const focus = () => {
  data.isFocus = true;
  input(data.searchWord);
}
const blur = () => {
  data.isFocus = false;
  data.complete = [];
}
const submit = () => {
  let url = searchEngine.target(engine.value, data.searchWord);
  window.open(url)?.focus();
}
const engineNext = () => {
  engineSelectorRef.value.next();
}
const enginePrev = () => {
  engineSelectorRef.value.prev();
}
const engineChange = (eng) => {
  store.commit('prefers/searchEngine', eng);
  data.complete = [];
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
.search {
  --v-spacing: 0.6rem;
  --h-spacing: 1rem;
}

/* 搜索框表单 */
.search form {
  width: auto;
  min-height: unset;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: box-shadow 0.3s, background-color 0.2s;
  background: var(--bg-color);
}
</style>
