<template>
    <div class="favorite-list">
        <group v-for="g in groups" :key="g.name" :info="g"></group>
    </div>
</template>

<script>
import Group from './group';

export default {
    components: { Group },
    computed: {
        groups: function() {
            return this.$store.state.config.config.favorites.groups;
        }
    }
}
</script>

<style>
.favorite-list {
    --favorite-col-width: 25%;
    width: var(--content-width);
    padding: var(--content-pandding);
    margin-bottom: 2rem;
}
</style>
