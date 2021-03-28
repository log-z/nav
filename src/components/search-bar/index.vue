<template>
    <form class="card-1">
        <search-input></search-input>
        <engine-selector></engine-selector>
        <action icon="submit"></action>
    </form>
</template>

<script>
import SearchInput from './search-input';
import Action from './action';
import EngineSelector from './engine-selector';

export default {
    components: { SearchInput, Action, EngineSelector },
    data: function() {
        return {
        }
    }
}
</script>

<style>
/* 搜索框表单 */
form {
    width: auto;
    min-height: unset;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: box-shadow 0.3s, background 0.2s;
    background: var(--bg-color);
}
</style>