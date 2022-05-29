<template>
  <nav-search-action
    :icon="status.eng"
    @click.capture="next" />
</template>

<script>
export default {
  name: 'navSearchEngineSelector'
}
</script>

<script setup>
import { computed, defineEmits, defineExpose, defineProps, reactive } from 'vue';
import { useStore } from 'vuex';
import navSearchAction from './nav-search-action';

const store = useStore()
const emit = defineEmits([ 'change' ])
const props = defineProps({
  engine: {
    type: String,
    default: function() {
      return 'baidu'
    }
  },
})

const status = reactive({
  eng: props.engine,
})

const engineList = computed(() => store.state.config.config.searchEngine.list)
const next = () => {
  let i = (engineList.value.indexOf(status.eng) + 1) % engineList.value.length;
  if (i < 0) i = 0;
  status.eng = engineList.value[i];
  notify();
}
const prev = () => {
  let i = (engineList.value.indexOf(status.eng) - 1) % engineList.value.length;
  if (i < 0) i = engineList.value.length - 1;
  status.eng = engineList.value[i];
  notify();
}
const notify = () => {
  emit('change', status.eng);
}

defineExpose({
  next,
  prev,
})
</script>

<style>
</style>