<template>
    <input class="input" type="text" :value="value" @input="onInput"
    autocomplete="off" autofocus="autofocus" spellcheck="false"
    placeholder="👴 来点什么？">
</template>

<script>
export default {
    model: {
        prop: 'value',
        event: 'input',
    },
    props: {
        value: {
            type: String,
            default: function() {
                return '';
            }
        }
    },
    methods: {
        onInput: function(event) {
            this.$emit('input', event.target.value)
        }
    }
}
</script>

<style scoped>
.input {
    width: 0;
    padding: 10px 18px;
    border: none;
    font-size: 1rem;
    line-height: 20px;
    flex-grow: 1;
    background: transparent;
}
</style>