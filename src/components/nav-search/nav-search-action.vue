<template>
  <div class="nav-search-action">
    <div
      class="sprites-res nav-search-action__icon nav-search-action__icon-submit"
      v-if="icon == 'submit'"
    ></div>
    <div
      class="sprites-res nav-search-action__icon nav-search-action__icon-baidu"
      v-if="icon == 'baidu'"
    ></div>
    <div
      class="sprites-res nav-search-action__icon nav-search-action__icon-google"
      v-if="icon == 'google'"
    ></div>
    <div
      class="sprites-res nav-search-action__icon nav-search-action__icon-dogedoge"
      v-if="icon == 'dogedoge'"
    ></div>
    <div
      class="sprites-res nav-search-action__icon nav-search-action__icon-wikipedia"
      v-if="icon == 'wikipedia'"
    ></div>
    <div
      class="sprites-res nav-search-action__icon nav-search-action__icon-bing"
      v-if="icon == 'bing'"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'navSearchAction',
  props: {
    icon: {
      type: String,
      default: function() {
        return ''
      }
    },
  }
}
</script>

<style>
.nav-search-action__icon {
  width: 30px;
  height: 30px;
  opacity: 0.2;
  cursor: pointer;
  transition: opacity 0.3s;
}
.nav-search-action__icon:hover {
	opacity: 0.35;
}
.nav-search-action__icon-submit {
	background-position: 0 -30px;
}
.nav-search-action__icon-baidu {
	background-position: 0 0;
}
.nav-search-action__icon-google {
	background-position: -30px 0;
}
.nav-search-action__icon-dogedoge {
	background-position: -60px 0;
}
.nav-search-action__icon-wikipedia {
	background-position: -90px 0;
}
.nav-search-action__icon-bing {
	background-position: -120px 0;
}
</style>