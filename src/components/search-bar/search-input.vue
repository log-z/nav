<template>
    <input class="input" type="text" v-model="text"
    autocomplete="off" autofocus="autofocus" spellcheck="false"
    placeholder="👴 来点什么？">
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: function() {
                return '';
            }
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