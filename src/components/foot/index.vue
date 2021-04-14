<template>
    <footer>
        <div class="info">
            ©2017-2021 logz.ml
        </div>
    </footer>
</template>

<script>
export default {
}
</script>

<style>
footer {
    --bg-color: #eee;
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
