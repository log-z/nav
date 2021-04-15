<template>
    <action :icon="eng" @click="next"></action>
</template>

<script>
import Action from './action';

const ENGINES = ['baidu', 'google', 'wikipedia']

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
    methods: {
        next: function() {
            let i = (ENGINES.indexOf(this.eng) + 1) % ENGINES.length;
            if (i < 0) i = 0;
            this.eng = ENGINES[i];
            this.notify();
        },
        prev: function() {
            let i = (ENGINES.indexOf(this.eng) - 1) % ENGINES.length;
            if (i < 0) i = ENGINES.length - 1;
            this.eng = ENGINES[i];
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