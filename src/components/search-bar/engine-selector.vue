<template>
    <action :icon="engine"></action>
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
        }
    },
}
</script>

<style>
</style>