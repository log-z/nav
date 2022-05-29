<template>
  <a
    class="website"
    :class="{ 'card-1': status.isActive }"
    :href="website.url"
    @mouseover="active"
    @mouseout="cancel"
    @touchstart="active"
    @touchend="cancel"
    @touchcancel="cancel"
  >
    <div class="img">
      <img
        class="icon"
        :src="iconUrl"
        v-if="website.icon"
      >
      <div v-if="!website.icon">
        {{ website.title.charAt(0) }}
      </div>
    </div>
    <div class="text">
      <div class="title">
        {{ website.title }}
      </div>
      <div class="subtitle">
        {{ website.subtitle }}
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'navFavoriteItem',
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
import { computed, defineProps, reactive } from 'vue'
import $_ from 'lodash'
import { useStore } from 'vuex'

const store = useStore()
const props = defineProps()

const status = reactive({
  isActive: false,
})

const iconUrl = computed(() => {
  const path = props.website.icon;
  if ($_.isEmpty(path)) {
    return '#'
  } else if (/^(http[s]?:)?\/\//.test(path)) {
    return path
  } else {
    const baseUrl = store.getters['config/baseUrl'];
    const prefix = store.state.config.config.favorites.iconPrefix
    return baseUrl + prefix + path
  }
})

const active = () => {
  status.isActive = true
}
const cancel = () => {
  status.isActive = false
}
</script>

<style>
/* 收藏卡片 */
.website {
  --icon-size: 2.8rem;
  margin: 0;
  margin-right: var(--normal-distance);
  margin-bottom: var(--normal-distance);
  display: flex;
  text-decoration: none;
  transition: box-shadow 0.3s, background-color 0.3s, border-radius 0.3s;
}
.website.card-1 {
  background: var(--hover-bg-color);
}

/* 收藏卡片的图片 */
.website>.img {
  width: var(--icon-size);
  height: var(--icon-size);
  margin: var(--normal-distance);
  flex-shrink: 0;
  font-size: var(--icon-size);
  display: flex;
  justify-content: center;
  align-items: center;
}

.website img.icon {
  height: 100%;
  width: 100%;
}

.website>.text {
  margin-right: 1rem;
  flex-grow: 1;
  align-self: center;
  overflow: hidden;
  white-space: nowrap;
}

/* 收藏卡片的名称 */
.website .title {
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.website .subtitle {
  margin-top: 0.1rem;
  font-size: 0.8rem;
  opacity: 0.7;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 平板屏幕 */
@media (max-width: 840px) {
	.website {
		--icon-size: 2.6rem;
	}
}

/* 大手机屏幕 */
@media (max-width: 532px) {
	.website {
		--icon-size: 2.2rem;
	}
}
</style>
