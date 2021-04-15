<template>
    <form class="card-1" @submit.prevent="onSubmit">
        <search-input v-model.lazy="searchWord" @input="onInput"></search-input>
        <engine-selector></engine-selector>
        <action icon="submit"></action>
    </form>
</template>

<script>
import SearchInput from './search-input';
import Action from './action';
import EngineSelector from './engine-selector';
import searchEngine from '@/utils/search-engine';

export default {
    components: { SearchInput, Action, EngineSelector },
    data: function() {
        return {
            searchWord: '',
        }
    },
    methods: {
        onInput: function(val) {
            searchEngine.complete('baidu', val, (data) => {
                console.log(data)
            })
        },
        onSubmit: function() {
            let url = searchEngine.target('baidu', this.searchWord);
            window.open(url).focus();
        }
    },
    created: function() {
        this.onInput = this.$_.debounce(this.onInput, 100);
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