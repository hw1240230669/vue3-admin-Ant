<template>
    <a-breadcrumb class="crumbs">
        <a-breadcrumb-item v-for="(item,index) in store.state.user.Crumbslist" :key="index">
            {{item}}
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>
 
<script lang='ts'>
import { useStore } from 'vuex'
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
      const store = useStore()
      return {
          store
      }
  }
})
</script>
 
<style lang='scss' scoped>
.crumbs {
    margin-left: 16px;
    margin-top: 14px;
}
</style>