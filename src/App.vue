<template>
  <div
    class="vue-app"
    :style="themeStyle"
    :scheme="scheme.current"
  >
    <div class="vue-app__header-warrpar">
      <header>
        <div class="vue-app__logo-warppar">
          <!-- 配色方案提示器 -->
          <div
            class="vue-app__scheme-hint"
            :class="{show: scheme.showHint}"
          >
            {{ scheme.current.toUpperCase() }}
          </div>
          <!-- LOGO -->
          <nav-logo
            @mouseenter="toggleScheme"
            @mouseleave="clearToggleScheme" />
        </div>
        <div class="vue-app__search-warppar">
          <!-- 搜索 -->
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
import NavLogo from '@/components/nav-logo';
import NavSearch from '@/components/nav-search';
import NavFavorteList from '@/components/nav-favorites';
import NavFoot from '@/components/nav-foot';
import { computed, reactive } from 'vue';

const store = useStore()

// 主题样式
const themeStyle = reactive({
  conf: computed(() => store.state.config.config.theme?._final),
  '--light-primary-color': computed(() => themeStyle.conf?.['light@primary.color']),
  '--light-bg-color': computed(() => themeStyle.conf?.['light@base.background.color']),
  '--light-footer-bg-color': computed(() => themeStyle.conf?.['light@footer.background.color']),
  '--light-hover-bg-color': computed(() => themeStyle.conf?.['light@highlight.background.color']),
  '--dark-primary-color': computed(() => themeStyle.conf?.['dark@primary.color']),
  '--dark-bg-color': computed(() => themeStyle.conf?.['dark@base.background.color']),
  '--dark-footer-bg-color': computed(() => themeStyle.conf?.['dark@footer.background.color']),
  '--dark-hover-bg-color': computed(() => themeStyle.conf?.['dark@highlight.background.color']),
})

// 配色方案
const schemes = ['auto', 'light', 'dark']
const scheme = reactive({
  current: computed(() => store.state.prefers.colorScheme),
  showHint: false,
})
// 切换配色方案
let timeoutScheme = null
const toggleScheme = () => {
  timeoutScheme = setTimeout(() => {
    let nextIdx = schemes.findIndex(s => s === scheme.current) + 1
    const nextScheme = schemes[nextIdx % schemes.length]
    store.commit('prefers/colorScheme', nextScheme)

    scheme.showHint = true
    setTimeout(() => {scheme.showHint = false}, 800)
  }, 1000)
}
const clearToggleScheme = () => {
  clearTimeout(timeoutScheme);
}

// 拉取最新配置
store.dispatch('config/update')
</script>

<style>
.vue-app {
  --light-color: rgba(0, 0, 0, 0.86);
  --light-bg-color: #f5f5f5;
  --light-primary-color: #c3c3c3;
  --light-footer-bg-color: #eee;
  --light-hover-bg-color: rgba(0, 0, 0, 0.05);
  --dark-color: rgba(255, 255, 255, 0.55);
	--dark-bg-color: #171717;
  --dark-primary-color: #5a5a5a;
  --dark-footer-bg-color: #131313;
  --dark-hover-bg-color: rgb(255 255 255 / 5%);

  --color: var(--light-color);
  --bg-color: var(--light-bg-color);
  --primary-color: var(--light-primary-color);
  --footer-bg-color: var(--light-footer-bg-color);
  --hover-bg-color: var(--light-hover-bg-color);
  
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
  position: relative;
}

.vue-app__search-warppar {
  width: unset;
  margin-top: 3rem;
  position: relative;
}

.vue-app__scheme-hint {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color);
  font-size: 5rem;
  font-weight: bold;
  letter-spacing: 3rem;
  padding-left: 3rem;
  -webkit-user-select: none;
  user-select: none;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}
.vue-app__scheme-hint.show {
  opacity: 0.1;
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
	.vue-app[scheme=auto] {
    --color: var(--dark-color);
    --bg-color: var(--dark-bg-color);
    --primary-color: var(--dark-primary-color);
    --footer-bg-color: var(--dark-footer-bg-color);
    --hover-bg-color: var(--dark-hover-bg-color);
    background-color: #222222;
	}

	.vue-app[scheme=auto] ::selection {
		background-color: rgba(255, 255, 255, 0.2);
	}

	.vue-app[scheme=auto] ::-webkit-input-placeholder {
		opacity: 0.75;
	}
	.vue-app[scheme=auto] ::-moz-placeholder {
		opacity: 0.75;
	}

	.vue-app[scheme=auto] img {
    filter: brightness(0.7);
	}
}



/******** 强制暗色模式 ********/

.vue-app[scheme=dark] {
  --color: var(--dark-color);
  --bg-color: var(--dark-bg-color);
  --primary-color: var(--dark-primary-color);
  --footer-bg-color: var(--dark-footer-bg-color);
  --hover-bg-color: var(--dark-hover-bg-color);
	background-color: #222222;
}
.vue-app[scheme=dark] ::selection {
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
</style>
