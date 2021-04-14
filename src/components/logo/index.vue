<template>
    <svg id="logo" viewBox="0 0 1000 1000">
        <polygon style="opacity:0.33" points="653.9,507.7 693.1,614.5 862.2,228.2 475.9,397.3 582.2,437 344.5,674.7 191.5,523.1 92.8,565.2 344.8,816.6 344.8,816.6 344.9,816.7 "></polygon>
        <polygon points="698.9,462.7 738.1,569.5 907.2,183.2 520.9,352.3 627.2,392 389.5,629.7 236.5,478.1 137.8,520.2 389.8,771.6 389.8,771.6 389.9,771.7 "></polygon>
    </svg>
</template>

<script>
export default {

}
</script>

<style>
#logo {
    width: 10rem;
    display: block;
    fill: #fff;
    opacity: 0.7;
    transition: transform 30s, fill 0.3s;
}
#logo:hover {
    transform: rotate(108000deg);
}

/* 中等屏幕 */
@media (max-width: 1200px) {
	#logo {
		width: 8rem;
	}
}

/* 大手机屏幕 */
@media (max-width: 532px) {
	#logo {
		width: 6rem;
	}
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
	#logo {
		fill: #000;
	}
}

/* 强制暗色模式 */
.vue-app[scheme=dark] #logo {
	fill: #000;
}
</style>
