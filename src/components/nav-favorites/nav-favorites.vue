<template>
  <div class="nav-favorites">
    <nav-favorite-group
      v-for="g in groups"
      :key="g.name"
      :info="g"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import NavFavoriteGroup from './nav-favorite-group.vue';
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()

const groups = computed(() => configStore.config.favorites?.groups ?? [])
</script>

<style>
.nav-favorites {
  --favorite-col-width: 25%;
  width: var(--content-width);
  padding: var(--content-pandding);
  margin-bottom: 2rem;
}
</style>
