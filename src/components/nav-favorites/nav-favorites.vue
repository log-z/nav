<template>
  <div class="nav-favorites">
    <nav-favorite-group
      v-for="g in groups"
      :key="g.name"
      :info="g"
    />
  </div>
</template>

<script>
export default {
  name: 'NavFavorites'
}
</script>
<script setup>
import { computed } from 'vue';
import NavFavoriteGroup from './nav-favorite-group.vue';
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()

const groups = computed(() => {
  let favorites = configStore.config.favorites
  return favorites === undefined ? [] : favorites.groups
})
</script>

<style>
.nav-favorites {
  --favorite-col-width: 25%;
  width: var(--content-width);
  padding: var(--content-pandding);
  margin-bottom: 2rem;
}
</style>
