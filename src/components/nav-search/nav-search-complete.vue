<template>
  <div
    class="nav-search-complete nav-card-2"
    v-if="list.length > 1"
  >
    <ol>
      <li
        v-for="(item, index) in $_.drop(list)"
        :key="index + 1"
        :class="{'active': isActive(index + 1)}"
        @mousedown.left="selecte(index + 1)"
      >
        {{ item }}
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'navSearchComplete',
}
</script>
<script setup>
import { defineEmits, defineExpose, defineProps, reactive, watch } from 'vue';
import $_ from 'lodash'

const props = defineProps({
  list: {
    type: Array,
    default: function() {
      return []
    }
  },
})
const emit = defineEmits([ 'selecte', 'change' ])

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
	z-index: 1;
}

/* 自动完成列表 */
.nav-search-complete > ol {
	margin: var(--v-spacing) 0;
	padding: 0;
	list-style: none;
	text-align: left;
}

/* 自动完成选项 */
.nav-search-complete > ol > li {
	padding: var(--v-spacing) var(--h-spacing);
	cursor: pointer;
	transition: background-color 0.1s ease-out;
}
.nav-search-complete > ol > li.active,
.nav-search-complete > ol > li:hover {
	background: var(--hover-bg-color);
}
</style>
