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
import { useStore } from 'vuex';
import NavFavoriteGroup from './nav-favorite-group.vue';

const store = useStore()
const groups = computed(() => {
  let favorites = store.state.config.config.favorites
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
