<template>
    <div class="search">
        <form :class="fromClass" @submit.prevent="submit">
            <search-input v-model.lazy="searchWord"
                @input="input" @focus="focus" @blur="blur"
                @eng-next="searchEngineNext" @eng-prev="searchEnginePrev"
                @complete-next="completeNext" @complete-prev="completePrev">
            </search-input>
            <engine-selector :engine="searchEngine" :event="searchEngineEvent"
                @change="searchEngineChange">
            </engine-selector>
            <action icon="submit" @click="submit"></action>
        </form>
        <complete :list="complete" :event="completeEvent"
            @selecte="completeSelect" @change="completeChange">
        </complete>
    </div>
</template>

<script>
import Vue from 'vue'
import SearchInput from './search-input';
import Action from './action';
import EngineSelector from './engine-selector';
import searchEngine from '@/utils/search-engine';
import Complete from './complete';

export default {
    components: { SearchInput, Action, EngineSelector, Complete },
    data: function() {
        return {
            searchWord: '',
            searchEngine: 'baidu',
            searchEngineEvent: new Vue(),
            complete: [],
            completeEvent: new Vue(),
            isFocus: true,
        }
    },
    computed: {
        fromClass: function() {
            return this.isFocus ? 'card-2' : 'card-1';
        }
    },
    methods: {
        input: function(val) {
            if (!val) {
                this.complete = []
                return
            }

            searchEngine.complete(this.searchEngine, val, (data) => {
                if (data.wd === this.searchWord && data.eng === this.searchEngine) {
                    this.complete = [this.searchWord, ...data.list]
                }
            })
        },
        focus: function() {
            this.isFocus = true;
            this.input(this.searchWord);
        },
        blur: function() {
            this.isFocus = false;
            this.complete = [];
        },
        submit: function() {
            let url = searchEngine.target(this.searchEngine, this.searchWord);
            window.open(url).focus();
        },
        searchEngineNext: function() {
            this.searchEngineEvent.$emit('next');
        },
        searchEnginePrev: function() {
            this.searchEngineEvent.$emit('prev');
        },
        searchEngineChange: function(eng) {
            this.searchEngine = eng;
            this.complete = [];
            this.input(this.searchWord);
        },
        completeNext: function() {
            this.completeEvent.$emit('next');
        },
        completePrev: function() {
            this.completeEvent.$emit('prev');
        },
        completeChange: function(val) {
            this.searchWord = val;
        },
        completeSelect: function(val) {
            this.searchWord = val;
            this.submit();
        }
    },
    created: function() {
        this.input = this.$_.debounce(this.input, 100);
    }
}
</script>

<style>
.search {
    --v-spacing: 0.6rem;
    --h-spacing: 1rem;
}

/* 搜索框表单 */
.search form {
    width: auto;
    min-height: unset;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: box-shadow 0.3s, background 0.2s;
    background: var(--bg-color);
}
</style>
