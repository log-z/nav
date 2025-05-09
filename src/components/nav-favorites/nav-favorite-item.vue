<template>
  <a
    class="nav-favorite-item"
    :class="{ 'nav-card-1': state.isActive }"
    :href="website.url"
    @mouseover="active"
    @mouseout="cancel"
    @touchstart="active"
    @touchend="cancel"
    @touchcancel="cancel"
  >
    <!-- 图标部分 -->
    <div class="nav-favorite-item__icon_wrapper">
      <div v-if="website.icon">
        <!-- 常规图标 -->
        <img
          class="nav-favorite-item__icon on-normal"
          :src="checkNotBase64(iconUrl) ? iconUrl : state.iconB64"
          alt=""
        >
        <!-- 暗色模式图标 -->
        <img
          class="nav-favorite-item__icon on-dark"
          :src="checkNotBase64(iconUrlOnDark) ? iconUrlOnDark : state.iconB64OnDark"
          alt=""
        >
      </div>
      <!-- 大字图标 -->
      <div v-else>
        {{ website.title?.charAt(0) }}
      </div>
    </div>

    <!-- 文本部分 -->
    <div class="nav-favorite-item__text">
      <!-- 标题 -->
      <div class="nav-favorite-item__title">
        {{ website.title }}
      </div>
      <!-- 副标题 -->
      <div
        v-if="website.subtitle"
        class="nav-favorite-item__subtitle"
      >
        {{ website.subtitle }}
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'NavFavoriteItem',
  props: {
    website: {
      type: Object,
      default: function() {
        return {
          title: 'Title',
          subtitle: 'subtitle',
          icon: null,
          url: '#',
        }
      }
    }
  },
}
</script>
<script setup>
import { computed, onMounted, reactive, watch } from 'vue'
import $_ from 'lodash'
import { useConfigStore } from '@/stores/config'
import { httpAbsPath } from '@/utils/common'
import { imgApi, ghCli, isGithubUrl } from '@/utils/request'
import loadingIcon from '@/assets/img/none.svg'

const configStore = useConfigStore()

const props = defineProps()

const state = reactive({
  isActive: false,
  iconB64: null,
  iconB64OnDark: null,
  iconBlobUrl: null,
  iconBlobUrlOnDark: null,
})

// 图标URL
// 图标URL默认值
const DEFAULT_ICON_URL = '#'
// 图标URL（常规）
const iconUrl = computed(() => {
  const path = state.iconBlobUrl || props.website.icon;
  if ($_.isEmpty(path) || path === DEFAULT_ICON_URL) {
    return DEFAULT_ICON_URL
  }
  if (path.startsWith('blob:')) {
    return path
  }
  
  const baseUrl = configStore.baseUrl
  const prefix = configStore.config.favorites.iconPrefix
  const url = httpAbsPath(path, baseUrl + prefix)
  return fetchIconUrl(url, false)
})
// 图标URL（暗色模式）
const iconUrlOnDark = computed(() => {
  let path = state.iconBlobUrlOnDark || props.website.iconOnDark;
  if ($_.isEmpty(path) || path === DEFAULT_ICON_URL) {
    // 降级到正常图标
    path = state.iconBlobUrl || props.website.icon;
    if ($_.isEmpty(path)) {
      return DEFAULT_ICON_URL
    }
  }
  if (path.startsWith('blob:')) {
    return path
  }

  const baseUrl = configStore.baseUrl
  const prefix = configStore.config.favorites.iconPrefix
  const url = httpAbsPath(path, baseUrl + prefix)
  return fetchIconUrl(url, true)
})

// 对某些站点特殊处理图标URL
const ghIconCache = {}
function fetchIconUrl(url, onDark) {

  // 特殊处理 GitHub URL
  // 避免 GitHub 阻止使用中文语言的浏览器请求
  // 先通过 XHR 请求图标，然后转换为 BlobUrl 进行展示
  if (isGithubUrl(url) && checkNotBase64(url)) {
    const cacheUrl = ghIconCache[url]
    if (cacheUrl) {
      return cacheUrl
    }

    ghCli.get(url)
      .then(resp => {
        const blob = new Blob([resp.data], { type: resp.headers['content-type'] })
        const blobUrl = URL.createObjectURL(blob)
        ghIconCache[url] = blobUrl
        if (onDark) {
          state.iconBlobUrlOnDark = blobUrl
        } else {
          state.iconBlobUrl = blobUrl
        }
      })
      .catch(() => {
        if (onDark) {
          state.iconBlobUrlOnDark = DEFAULT_ICON_URL
        } else {
          state.iconBlobUrl = DEFAULT_ICON_URL
        }
      })
    return loadingIcon
  }

  return url
}

// 图标Base64探测
// 检查图标是否为Base64扩展名的文件
const BASE64_FILE_EXTENSION = '.base64'
function checkNotBase64(url) {
  const path = url.split('?')[0]
  return !path.endsWith(BASE64_FILE_EXTENSION)
}
// 刷新图标Base64（常规）
const refreshIconB64 = (url) => {
  if (checkNotBase64(url)) {
    state.iconB64 = null
    return
  }
  imgApi(url)
    .then(resp => {
      state.iconB64 = resp.data
    })
}
// 刷新图标Base64（暗色模式）
const refreshIconB64OnDark = (url) => {
  if (checkNotBase64(url)) {
    state.iconB64OnDark = null
    return
  }
  imgApi(url)
    .then(resp => {
      state.iconB64OnDark = resp.data
    })
}
// 持续探测及初始化
watch(iconUrl, refreshIconB64)
watch(iconUrlOnDark, refreshIconB64OnDark)
onMounted(() => {
  refreshIconB64(iconUrl.value)
  refreshIconB64OnDark(iconUrlOnDark.value)
})

const active = () => {
  state.isActive = true
}
const cancel = () => {
  state.isActive = false
}
</script>

<style>
/* 收藏卡片 */
.nav-favorite-item {
  --icon-size: 2.8rem;
  margin: 0;
  margin-right: var(--normal-distance);
  margin-bottom: var(--normal-distance);
  display: flex;
  text-decoration: none;
  transition: box-shadow 0.3s, background-color 0.3s, border-radius 0.3s;
}
.nav-favorite-item.nav-card-1 {
  background: var(--hover-bg-color);
}

/* 收藏卡片的图标包装 */
.nav-favorite-item__icon_wrapper {
  width: var(--icon-size);
  height: var(--icon-size);
  margin: var(--normal-distance);
  flex-shrink: 0;
  font-size: var(--icon-size);
  font-family: 'smiley-sans';
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 收藏卡片的图标 */
.nav-favorite-item__icon {
  display: block;
  height: 100%;
  width: 100%;
}
.nav-favorite-item__icon.on-dark {
  display: none;
}

/* 收藏卡片的文本部分 */
.nav-favorite-item__text {
  margin-right: 1rem;
  flex-grow: 1;
  align-self: center;
  overflow: hidden;
  white-space: nowrap;
}

/* 收藏卡片的标题 */
.nav-favorite-item__title {
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 收藏卡片的副标题 */
.nav-favorite-item__subtitle {
  margin-top: 0.1rem;
  font-size: 0.8rem;
  opacity: 0.7;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 平板屏幕 */
@media (max-width: 840px) {
	.nav-favorite-item__website {
		--icon-size: 2.6rem;
	}
}

/* 大手机屏幕 */
@media (max-width: 532px) {
	.nav-favorite-item__website {
		--icon-size: 2.2rem;
	}
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  .vue-app[scheme=auto] .nav-favorite-item__icon.on-normal {
    display: none;
	}
	.vue-app[scheme=auto] .nav-favorite-item__icon.on-dark {
    display: block;
	}
}



/******** 强制暗色模式 ********/

.vue-app[scheme=dark] .nav-favorite-item__icon.on-normal {
  display: none;
}
.vue-app[scheme=dark] .nav-favorite-item__icon.on-dark {
  display: block;
}

</style>
