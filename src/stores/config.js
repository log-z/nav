import { computed, ref } from 'vue';
import { defineStore } from 'pinia'
import loader from '@/utils/config';

export const useConfigStore = defineStore('config', () => {
  // 配置信息
  const config = ref({})
  // 配置所在URL
  const url = ref(import.meta.env.VITE_DEFAULT_CONFIG_URL)
  // 配置所在BaseURL
  const baseUrl = computed(() => url.value.match(/^.*\//))

  /**
   * 更新配置
   */
  function update() {
    const newUrl = import.meta.env.VITE_DEFAULT_CONFIG_URL
    loader.loadFromUrl(newUrl)
      .then(newConfig => {
        config.value = newConfig
        url.value = newUrl
      })
      .catch(error => console.error(error))
  }

  return { config, url, baseUrl, update }
}, {
  persist: true,
})
