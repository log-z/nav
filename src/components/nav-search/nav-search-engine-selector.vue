<template>
  <div class="nav-search-engine-selector">
    <!-- 按钮 -->
    <nav-icon
      class="nav-search-engine-selector__action"
      @click="next"
    >
      <Baidu
        v-if="status.eng == 'baidu'" />
      <Google
        v-if="status.eng == 'google'" />
      <Bing
        v-if="status.eng == 'bing'" />
      <Wikipedia
        v-if="status.eng == 'wikipedia'" />
    </nav-icon>
    <!-- 气泡 -->
    <div class="nav-search-engine-selector__popover">
      <div class="nav-search-engine-selector__popover-wrapper nav-card-2">
        <div class="nav-search-engine-selector__popover_item"
          v-for="eng in engineList"
          :key="eng"
          :class="{active: eng == status.eng}"
          @click="select(eng)"
        >
          <nav-icon v-if="eng == 'baidu'">
            <CLBaidu />
          </nav-icon>
          <nav-icon v-if="eng == 'google'">
            <CLGoogle />
          </nav-icon>
          <nav-icon v-if="eng == 'bing'">
            <CLBing />
          </nav-icon>
          <nav-icon v-if="eng == 'wikipedia'">
            <CLWikipedia />
          </nav-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navSearchEngineSelector'
}
</script>

<script setup>
import { computed, defineEmits, defineExpose, defineProps, reactive } from 'vue';
import { useStore } from 'vuex';

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
const select = (eng) => {
  status.eng = eng;
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
.nav-search-engine-selector {
  --v-popover: 2rem;
  display: flex;
  justify-items: center;
  align-items: center;
  cursor: pointer;
}

.nav-search-engine-selector__popover {
  position: absolute;
  height: var(--v-popover);
  right: 0;
  top: calc(0px - var(--v-popover) - var(--v-spacing));
  padding-bottom: var(--v-spacing);
  cursor: auto;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
}
.nav-search-engine-selector:hover .nav-search-engine-selector__popover {
  opacity: 100;
  pointer-events: auto;
}

.nav-search-engine-selector__popover-wrapper {
  height: 100%;
  padding: 0 var(--v-spacing);
  background-color: var(--bg-color);
  cursor: pointer;
  display: flex;
  align-items: center;
}

.nav-search-engine-selector__popover_item {
  padding: 0 0.2rem;
  opacity: 0.5;
  filter: grayscale(50%);
  transition: transform 0.1s ease-in-out, filter 0.1s ease-in-out;
}
.nav-search-engine-selector__popover_item:hover,
.nav-search-engine-selector__popover_item.active {
  transform: scale(1.3);
}
.nav-search-engine-selector__popover_item.active {
  filter: unset;
  opacity: 1;
}
</style>