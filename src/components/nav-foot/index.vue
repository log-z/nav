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
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const description = ref(store.state.config.config.description)
</script>

<style>
.nav-foot {
  --bg-color: #eee;  /*gray*/
  /*--bg-color: #ffecb8;*/ /*yellow*/
  padding: 32px;
  background-color: var(--bg-color);
  text-align: center;
}

.nav-foot__info {
  opacity: 0.5;
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
	.nav-foot {
		--bg-color: #131313;
	}
}

/* 强制暗色模式 */
.vue-app[scheme=dark] .nav-foot {
	--bg-color: #131313;
}
</style>
