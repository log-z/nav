<template>
  <div class="nav-icon">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NavIcon'
}
</script>
<script setup>
</script>

<style>
.nav-icon > span {
  display: block;
}
</style>
