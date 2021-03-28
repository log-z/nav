<template>
    <div class="favorite-list">
        <group v-for="fav in favorites" :key="fav.name" :info="fav"></group>
    </div>
</template>

<script>
import Group from './group';
import Favorites from '@/assets/data/favorites.json'

export default {
    components: { Group },
    data: function() {
        return {
            favorites: Favorites,
        }
    },
}
</script>

<style>
.favorite-list {
    --favorite-col-width: 25%;
    --website-icon-size: 2.8rem;
    width: var(--content-width);
    padding: var(--content-pandding);
    margin-bottom: 2rem;
}
</style>
