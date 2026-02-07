<template>
  <div class="nav-search-engine-selector">
    <!-- 按钮 -->
    <nav-icon
      class="nav-search-engine-selector__action"
      @click="next"
    >
      <Baidu
        v-if="status.eng == 'baidu'"
      />
      <Google
        v-if="status.eng == 'google'"
      />
      <Bing
        v-if="status.eng == 'bing'"
      />
      <Qiuwenbaike
        v-if="status.eng == 'qiuwenbaike'"
      />
      <Wikipedia
        v-if="status.eng == 'wikipedia'"
      />
    </nav-icon>
    <!-- 气泡 -->
    <div class="nav-search-engine-selector__popover"
      :class="{peeking: status.peekPopover}"
    >
      <div class="nav-search-engine-selector__popover-wrapper nav-card-2">
        <div
          v-for="eng in engineList"
          :key="eng"
          class="nav-search-engine-selector__popover_item"
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
          <nav-icon v-if="eng == 'qiuwenbaike'">
            <CLQiuwenbaike />
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
  name: 'NavSearchEngineSelector'
}
</script>

<script setup>
import { computed, reactive } from 'vue';
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()

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
  peekPopover: false,
})

const engineList = computed(() => {
  let searchConfig = configStore.config.search
  return searchConfig?.engine?.active === undefined ? [] : searchConfig.engine.active
})
const next = () => {
  let i = (engineList.value.indexOf(status.eng) + 1) % engineList.value.length;
  if (i < 0) i = 0;
  status.eng = engineList.value[i];
  notify();
  peekPopover()
}
const prev = () => {
  let i = (engineList.value.indexOf(status.eng) - 1) % engineList.value.length;
  if (i < 0) i = engineList.value.length - 1;
  status.eng = engineList.value[i];
  notify();
  peekPopover()
}
const select = (eng) => {
  status.eng = eng;
  notify();
  peekPopover()
}
const notify = () => {
  emit('change', status.eng);
}

// 使气泡浮现，并停留片刻
let peekPopoverTimeoutId = null
const peekPopover = () => {
  status.peekPopover = true
  clearTimeout(peekPopoverTimeoutId)
  peekPopoverTimeoutId = setTimeout(() => status.peekPopover = false, 1000)
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
  pointer-events: none;
}
.nav-search-engine-selector:hover .nav-search-engine-selector__popover,
.nav-search-engine-selector__popover.peeking {
  pointer-events: auto;
}

.nav-search-engine-selector__popover-wrapper {
  height: 100%;
  padding: 0 var(--v-spacing);
  background-color: var(--bg-color);
  backdrop-filter: var(--bg-filter);
  cursor: pointer;
  display: flex;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.nav-search-engine-selector:hover .nav-search-engine-selector__popover-wrapper,
.nav-search-engine-selector__popover.peeking .nav-search-engine-selector__popover-wrapper {
  opacity: 100;
}

.nav-search-engine-selector__popover_item {
  padding: 0 0.2rem;
  filter: opacity(80%);
  transition: transform 0.1s ease-in-out, filter 0.1s ease-in-out;
}
.nav-search-engine-selector__popover_item:hover,
.nav-search-engine-selector__popover_item.active {
  transform: scale(1.3);
}
.nav-search-engine-selector__popover_item.active {
  filter: opacity(100%);
}
</style>