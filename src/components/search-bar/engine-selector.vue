<template>
    <action :icon="eng" @click="next"></action>
</template>

<script>
import Action from './action';

export default {
    components: { Action },
    props: {
        engine: {
            type: String,
            default: function() {
                return 'baidu';
            }
        },
        event: {
            required: true,
        }
    },
    data: function() {
        return {
            eng: null,
        }
    },
    computed: {
        engineList: function() {
            return this.$store.state.config.config.searchEngine.list;
        }
    },
    methods: {
        next: function() {
            let i = (this.engineList.indexOf(this.eng) + 1) % this.engineList.length;
            if (i < 0) i = 0;
            this.eng = this.engineList[i];
            this.notify();
        },
        prev: function() {
            let i = (this.engineList.indexOf(this.eng) - 1) % this.engineList.length;
            if (i < 0) i = this.engineList.length - 1;
            this.eng = this.engineList[i];
            this.notify();
        },
        notify: function() {
            this.$emit('change', this.eng);
        }
    },
    created: function() {
        this.event.$on('next', this.next);
        this.event.$on('prev', this.prev);
        this.eng = this.engine;
    }
}
</script>

<style>
</style>