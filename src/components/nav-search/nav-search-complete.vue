<template>
  <div
    class="nav-search-complete nav-card-2"
    :class="rootClass"
    :style="rootStyle"
  >
    <div
      ref="listWarpper"
      class="nav-search-complete__list-warpper"
    >
      <ol>
        <li
          v-for="(item, index) in $_.drop(list)"
          :key="index + IDX_BEGIN"
          :class="{'active': isActive(index + IDX_BEGIN)}"
          @mousedown.left="selecte(index + IDX_BEGIN)"
        >
          {{ item }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavSearchComplete',
}
</script>
<script setup>
import { computed, reactive, ref, watch } from 'vue';
import $_ from 'lodash'

const IDX_BEGIN = 1

const listWarpper = ref();
const props = defineProps({
  list: {
    type: Array,
    default: function() {
      return []
    }
  },
})
const emit = defineEmits([ 'selecte', 'change' ])

const isHidden = () => props.list.length <= IDX_BEGIN
const rootClass = reactive({
  hidden: computed(isHidden)
})
const rootStyle = reactive({
  height: computed(() => isHidden() ? '0' : listWarpper.value?.offsetHeight + 'px')
})

const status = reactive({
  active: 0
})

watch(props, () => status.active = 0)

const selecte = (index) => {
  status.active = index;
  emit('selecte', props.list[status.active]);
}
const isActive = (index) => {
  return status.active == index;
}
const next = () => {
  status.active = (status.active += 1) % props.list.length;
  emit('change', props.list[status.active]);
}
const prev = () => {
  status.active = (status.active -= 1) % props.list.length;
  if (status.active < 0) {
    status.active = props.list.length - 1
  }
  emit('change', props.list[status.active]);
}

defineExpose({
  next,
  prev
})
</script>

<style>
/* 自动完成 */
.nav-search-complete {
	margin-top: var(--v-spacing);
	position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  background: var(--bg-color);
  backdrop-filter: var(--bg-filter);
	z-index: 1;
  overflow: hidden;
  transition: height 0.15s ease-out, opacity 0.15s ease-out;
}
/* 自动完成 - 隐藏状态 */
.nav-search-complete.hidden {
  opacity: 0;
  pointer-events: none;
}

/* 自动完成列表 */
.nav-search-complete__list-warpper > ol {
	margin: 0;
	padding: var(--v-spacing) 0;
	list-style: none;
	text-align: left;
}

/* 自动完成选项 */
.nav-search-complete__list-warpper > ol > li {
	padding: var(--v-spacing) var(--h-spacing);
	cursor: pointer;
  line-height: 1.3rem;
	transition: background-color 0.1s ease-out;
}
.nav-search-complete__list-warpper > ol > li.active,
.nav-search-complete__list-warpper > ol > li:hover {
	background: var(--hover-bg-color);
}
</style>
