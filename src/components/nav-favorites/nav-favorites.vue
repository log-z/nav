<template>
  <div class="nav-favorites">
    <nav-favorite-group
      v-for="g in groups"
      :key="g.name"
      :info="g" />
  </div>
</template>

<script>
export default {
  name: 'navFavorites'
}
</script>
<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import NavFavoriteGroup from './nav-favorite-group';

const store = useStore()
const groups = ref(store.state.config.config.favorites.groups)
</script>

<style>
.nav-favorites {
  --favorite-col-width: 25%;
  width: var(--content-width);
  padding: var(--content-pandding);
  margin-bottom: 2rem;
}
</style>
