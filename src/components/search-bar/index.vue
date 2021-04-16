<template>
    <div class="search">
        <form :class="fromClass" @submit.prevent="submit">
            <search-input v-model.lazy="searchWord" :event="inputEvent"
                @input="input" @focus="focus" @blur="blur"
                @eng-next="engineNext" @eng-prev="enginePrev"
                @complete-next="completeNext" @complete-prev="completePrev">
            </search-input>
            <engine-selector :engine="engine" :event="engineEvent"
                @change="engineChange">
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
            inputEvent: new Vue(),
            engineEvent: new Vue(),
            complete: [],
            completeEvent: new Vue(),
            isFocus: true,
        }
    },
    computed: {
        fromClass: function() {
            return this.isFocus ? 'card-2' : 'card-1';
        },
        engine: function() {
            return this.$store.state.prefers.searchEngine;
        }
    },
    methods: {
        input: function(val) {
            if (!val) {
                this.complete = []
                return
            }

            searchEngine.complete(this.engine, val, (data) => {
                if (data.wd === this.searchWord && data.eng === this.engine) {
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
            let url = searchEngine.target(this.engine, this.searchWord);
            window.open(url).focus();
        },
        engineNext: function() {
            this.engineEvent.$emit('next');
        },
        enginePrev: function() {
            this.engineEvent.$emit('prev');
        },
        engineChange: function(eng) {
            this.$store.commit('prefers/searchEngine', eng);
            this.complete = [];
            this.input(this.searchWord);
            this.inputEvent.$emit('focus');
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
    mounted: function() {
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
