<template>
  <router-view/>
</template>

<script lang='ts'>
import { defineComponent, ref,computed, watch } from 'vue'
import { addRouterMenu } from '@/router/index'
export default defineComponent({
  setup() {
    var pathname = window.location.pathname;
    var search = window.location.search;
    addRouterMenu(pathname+search)
  }
})
</script>

<style lang="scss">

</style>
