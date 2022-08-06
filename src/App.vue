<template>
  <div class="vue-app" :scheme="scheme">
    <div class="vue-app__header-warrpar">
      <header>
        <div class="vue-app__logo-warppar">
          <nav-logo
            @mouseenter="toggleScheme"
            @mouseleave="clearToggleScheme" />
        </div>
        <div class="vue-app__search-warppar">
          <nav-search />
        </div>
      </header>
    </div>
    <div class="vue-app__favorites-warppar">
      <nav-favorte-list />
    </div>
    <nav-foot />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import NavLogo from './components/nav-logo';
import NavSearch from './components/nav-search';
import NavFavorteList from './components/nav-favorites';
import NavFoot from './components/nav-foot';
import { computed } from 'vue';

const store = useStore()

const scheme = computed(() => store.state.prefers.colorScheme)

let timeoutScheme = null
const toggleScheme = () => {
  timeoutScheme = setTimeout(() => {
    const value = scheme.value == 'light' ? 'dark' : 'light'
    store.commit('prefers/colorScheme', value)
  }, 1000)
}
const clearToggleScheme = () => {
  clearTimeout(timeoutScheme);
}

store.dispatch('config/update')
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
  --primary-color: #75aad6; /*blue*/
  /*--primary-color: #61abbe;*/ /*sky*/
  /*--primary-color: #a7bfd8;*/ /*snow*/
  /*--primary-color: #808e9b;*/ /*gray*/
  /*--primary-color: #ffce64;*/ /*yellow*/
  /*--primary-color: #e41427;*/ /*red*/
  /*--primary-color: #96be61;*/ /*green*/
  /*--primary-color: #82b59d;*/ /*pool*/
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

.vue-app__header-warrpar {
	width: var(--content-width);
  margin: 0 auto;
}
.vue-app__header-warrpar > header {
	padding: var(--content-pandding);
	margin: 6rem auto 7rem;
}

.vue-app__logo-warppar {
  display: flex;
  justify-content: center;
}

.vue-app__search-warppar {
  width: unset;
  margin-top: 3rem;
  position: relative;
}

.vue-app__favorites-warppar {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  border-radius: 16px 16px 0 0;
  background: var(--bg-color);
}

/* 大手机屏幕 */
@media (max-width: 532px) {
	.vue-app__search-warppar {
		margin-top: 1rem;
	}
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
	.vue-app {
		--color: rgba(255, 255, 255, 0.55);
		--bg-color: #171717;
		--primary-color: #406d97; /*blue*/
    /*--primary-color: #515e6b;*/ /*snow*/
    /*--primary-color: #981622;*/ /*red*/
		/*--primary-color: #577d23;*/ /*green*/
		/*--primary-color: #2f7955;*/ /*pool*/
    /*--primary-color: #904c11;*/ /*sunset-glow*/
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
	.nav-sprites-res {
		filter: invert(1);
	}
}



/******** 强制暗色模式 ********/

.vue-app[scheme=dark] {
	--color: rgba(255, 255, 255, 0.55);
	--bg-color: #171717;
		--primary-color: #406d97; /*blue*/
	/*--primary-color: #515e6b;*/ /*snow*/
  /*--primary-color: #981622;*/ /*red*/
	/*--primary-color: #577d23;*/ /*green*/
	/*--primary-color: #2f7955;*/ /*pool*/
	/*--primary-color: #904c11;*/ /*sunset-glow*/
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
.vue-app[scheme=dark] .nav-sprites-res {
	filter: invert(1);
}
</style>
