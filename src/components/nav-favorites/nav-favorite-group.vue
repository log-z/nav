<template>
  <div class="nav-favorite-group">
    <h2 class="nav-favorite-group__title">{{ info.name }}</h2>
    <ul>
      <li
        v-for="item in info.websites"
        :key="item.title"
      >
        <nav-favorite-item :website="item" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'navFavoriteGroup',
  props: {
    info: {
      type: Object,
      default: function() {
        return {
          name: 'Group',
          websites: [],
        }
      }
    }
  },
}
</script>
<script setup>
import NavFavoriteItem from "./nav-favorite-item";
</script>

<style>
/* 收藏组标题 */
.nav-favorite-group {
	--item-width: 25%;
	padding: 16px 0;
}

.nav-favorite-group__title {
  --text-color: var(--primary-color);
  margin: 24px 0;
  color: var(--text-color);
  font-size: 1.6rem;
  letter-spacing: 0.2rem;
  display: flex;
  align-items: center;
}

/* 收藏组标题 */
.nav-favorite-group__title:before {
  width: 0.4rem;
  height: 1.25rem;
  content: "";
  display: block;
  margin-right: 0.5rem;
  background: var(--text-color);
  border-radius: 999px;
  opacity: 0.3;
}

/* 收藏列表 */
.nav-favorite-group ul {
	padding: 0;
	margin: 0;
	margin-right: calc(0px - var(--normal-distance));
	list-style: none;
	display: flex;
	flex-wrap: wrap;
}

/* 收藏条目 */
.nav-favorite-group li {
	width: var(--item-width);
	display: block;
}

/* 超大屏幕 */
@media (min-width: 1600px) {
	.nav-favorite-group {
		--item-width: 20%;
	}
}

/* 中等屏幕 */
@media (max-width: 1200px) {
	.nav-favorite-group {
		--item-width: 33.333333%;
	}
}

/* 平板屏幕 */
@media (max-width: 840px) {
	.nav-favorite-group {
		--item-width: 50%;
	}
}

/* 大手机屏幕 */
@media (max-width: 532px) {
	.nav-favorite-group {
		--item-width: 50%;
	}
}

/* 小手机屏幕 */
@media (max-width: 330px) {
	.nav-favorite-group {
		--item-width: 100%;
	}
}
</style>
