<template>
  <footer class="nav-foot">
    <div class="nav-foot__info">{{description}}</div>
  </footer>
</template>

<script>
export default {
  name: 'navFoot'
}
</script>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const description = computed(() => store.state.config.config.description)
</script>

<style>
.nav-foot {
  padding: 32px;
  background-color: var(--footer-bg-color);
  text-align: center;
}

.nav-foot__info {
  opacity: 0.5;
}
</style>
