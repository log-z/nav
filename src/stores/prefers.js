import { ref } from 'vue';
import { defineStore } from 'pinia'

export const usePrefersStore = defineStore('prefers', () => {
  // 配色方案
  const colorScheme = ref('light')
  // 搜索引擎
  const searchEngine = ref('baidu')
  // 特性
  const feature = ref({
    // 毛玻璃特性
    glassmorphism: true,
  })

  return { colorScheme, searchEngine, feature }
}, {
  persist: true,
})
