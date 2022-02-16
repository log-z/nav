<template>
    <footer>
        <div class="info">{{description}}</div>
    </footer>
</template>

<script>
export default {
    computed: {
        description: function() {
            return this.$store.state.config.config.description;
        }
    }
}
</script>

<style>
footer {
    --bg-color: #eee;  /*gray*/
    /*--bg-color: #ffecb8;*/ /*yellow*/
    padding: 32px;
    background-color: var(--bg-color);
    text-align: center;
}

footer .info {
    opacity: 0.5;
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
	footer {
		--bg-color: #131313;
	}
}

/* 强制暗色模式 */
.vue-app[scheme=dark] footer {
	--bg-color: #131313;
}
</style>
