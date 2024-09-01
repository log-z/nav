<template>
  <footer class="nav-foot">
    <!-- 切换毛玻璃特性 -->
    <button
      class="nav-foot__action"
      @click.prevent="toggleFeatureGlassmorphism"
    >
      {{ featureGlassmorphism ? '毛玻璃' : '纯色' }}
    </button>
    <!-- 描述信息 -->
    <div class="nav-foot__info">
      {{ description }}
    </div>
  </footer>
</template>

<script>
export default {
  name: 'NavFoot'
}
</script>
<script setup>
import { computed } from 'vue';
import { useConfigStore } from '@/stores/config'
import { usePrefersStore } from '@/stores/prefers'

const configStore = useConfigStore()
const prefersStore = usePrefersStore()

// 描述信息
const description = computed(() => configStore.config.description)

// 切换毛玻璃特性
const featureGlassmorphism = computed(() => prefersStore.feature.glassmorphism)
const toggleFeatureGlassmorphism = () => {
  prefersStore.feature.glassmorphism = !featureGlassmorphism.value
}
</script>

<style>
.nav-foot {
  padding: 32px;
  background-color: var(--footer-bg-color);
  text-align: center;
}

.nav-foot__action {
  padding: 0.1rem 0.4em;
  margin-bottom: 0.8rem;
  color: inherit;
  background: none;
  border: 1px solid var(--color);
  opacity: 0.5;
}
.nav-foot__action:hover {
  background: var(--hover-bg-color);
}

.nav-foot__info {
  opacity: 0.5;
}
</style>
