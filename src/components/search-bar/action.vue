<template>
    <div @click="$emit('click')">
        <div class="sprites-res icon icon-submit" v-if="icon == 'submit'"></div>
        <div class="sprites-res icon icon-baidu" v-if="icon == 'baidu'"></div>
        <div class="sprites-res icon icon-google" v-if="icon == 'google'"></div>
        <div class="sprites-res icon icon-dogedoge" v-if="icon == 'dogedoge'"></div>
        <div class="sprites-res icon icon-wikipedia" v-if="icon == 'wikipedia'"></div>
    </div>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: function() {
                return '';
            }
        },
    }
}
</script>

<style scoped>
.icon {
    width: 30px;
    height: 30px;
    opacity: 0.2;
    cursor: pointer;
    transition: opacity 0.3s;
}
.icon:hover {
	opacity: 0.35;
}
.icon-submit {
	background-position: 0 -30px;
}
.icon-baidu {
	background-position: 0 0;
}
.icon-google {
	background-position: -30px 0;
}
.icon-dogedoge {
	background-position: -60px 0;
}
.icon-wikipedia {
	background-position: -90px 0;
}
</style>