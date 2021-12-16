<template>
    <div class="vue-app" :scheme="scheme">
        <div class="header-warrpar">
            <header>
                <div class="logo-warppar">
                    <logo @mouseenter.native="toggleScheme" @mouseleave.native="clearToggleScheme"></logo>
                </div>
                <div class="search-warppar">
                    <search-bar></search-bar>
                </div>
            </header>
        </div>
        <div class="favorites-warppar">
            <favorte-list></favorte-list>
        </div>
        <foot></foot>
    </div>
</template>

<script>
import Logo from '@/components/logo';
import SearchBar from '@/components/search-bar';
import FavorteList from '@/components/favorite-list';
import Foot from '@/components/foot';

export default {
    components: { Logo, SearchBar, FavorteList, Foot },
    data: function() {
        return {
            timeout_scheme: null,
        }
    },
    computed: {
        scheme: function() {
            return this.$store.state.prefers.colorScheme;
        }
    },
    methods: {
        toggleScheme: function() {
            this.timeout_scheme = setTimeout(() => {
                let scheme = this.scheme == 'light' ? 'dark' : 'light';
                this.$store.commit('prefers/colorScheme', scheme);
            }, 1000);
        },
        clearToggleScheme: function() {
            clearTimeout(this.timeout_scheme);
        },
    },
    created: function() {
        // Update your config
        // this.$store.commit('config/url', 'https://gist.githubusercontent.com/log-Z/000f4e8ca92334e81de69c0207528450/raw/nav-config.json');
        this.$store.dispatch('config/update');
    }
}
</script>

<style>
::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.5;
}
::-moz-placeholder {
    color: inherit;
    opacity: 0.5;
}

.vue-app {
    --color: rgba(0, 0, 0, 0.86);
    --bg-color: #f5f5f5; /*white*/
    /*--bg-color: #fff2cf;*/ /*yellow*/
    /*--primary-color: #324362;*/ /*blue*/
    /*--primary-color: #61abbe;*/ /*sky*/
    --primary-color: #a7bfd8; /*snow*/
    /*--primary-color: #808e9b;*/ /*gray*/
    /*--primary-color: #ffce64;*/ /*yellow*/
    /*--primary-color: #e41427;*/ /*red*/
    /*--primary-color: #96be61;*/ /*green*/
    /*--primary-color: #f1aa6d;*/ /*sunset-glow*/
    --hover-bg-color: rgba(0, 0, 0, 0.05);
    
    color: var(--color);
    background-color: var(--primary-color);
    -webkit-tap-highlight-color: transparent;

    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.vue-app > * {
    flex-shrink: 0;
}

.header-warrpar {
	width: var(--content-width);
    margin: 0 auto;
}
header {
	padding: var(--content-pandding);
	margin: 6rem auto 7rem;
}

.logo-warppar {
    display: flex;
    justify-content: center;
}

.search-warppar {
    width: unset;
    margin-top: 3rem;
    position: relative;
}

.favorites-warppar {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    border-radius: 16px 16px 0 0;
    background: var(--bg-color);
}

/* 大手机屏幕 */
@media (max-width: 532px) {
	.search-warppar {
		margin-top: 1rem;
	}
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
	.vue-app {
		--color: rgba(255, 255, 255, 0.55);
		--bg-color: #171717;
		/*--primary-color: #577d23;*/ /*green*/
        /*--primary-color: #904c11;*/ /*sunset-glow*/
        --primary-color: #515e6b; /*snow*/
		--hover-bg-color: rgba(255, 255, 255, 0.05);
		background-color: #222222;
	}

	::selection {
		background-color: rgba(255, 255, 255, 0.2);
	}

	::-webkit-input-placeholder {
		opacity: 0.75;
	}
	::-moz-placeholder {
		opacity: 0.75;
	}

	img {
        filter: brightness(0.7);
	}

	/* 背景资源 */
	.sprites-res {
		filter: invert(1);
	}
}



/******** 强制暗色模式 ********/

.vue-app[scheme=dark] {
	--color: rgba(255, 255, 255, 0.55);
	--bg-color: #171717;
	/*--primary-color: #577d23;*/ /*green*/
	/*--primary-color: #904c11;*/ /*sunset-glow*/
	--primary-color: #515e6b; /*snow*/
	--hover-bg-color: rgba(255, 255, 255, 0.05);
	background-color: #222222;
}
.vue-app[scheme=dark]e ::selection {
	background-color: rgba(255, 255, 255, 0.2);
}

.vue-app[scheme=dark] ::-webkit-input-placeholder {
	opacity: 0.75;
}
.vue-app[scheme=dark] ::-moz-placeholder {
	opacity: 0.75;
}

.vue-app[scheme=dark] img {
    filter: brightness(0.7);
}

/* 背景资源 */
.vue-app[scheme=dark] .sprites-res {
	filter: invert(1);
}
</style>
