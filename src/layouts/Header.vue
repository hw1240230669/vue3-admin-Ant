<template>
    <div class="header">
      <img class="img-header" src="https://www.gaoxiaoa.cn/uploads/allimg/190829/2-1ZR912533V29.gif">
      <a-dropdown class="dropdown">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()" 
          :style="store.state.wholeMenuCorol == 'dark' ? 'color: #fff;' : ''">
          this is my name
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              修改密码
            </a-menu-item>
            <a-menu-item @click="retreat">
              退出
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
</template>
 
<script lang='ts'>
import { defineComponent,ref,watch } from 'vue'
import { useRouter } from 'vue-router'
import { clearLoginInfo } from '@/util/index'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    function retreat() {
      sessionStorage.removeItem('menuSelect')
      clearLoginInfo()
      localStorage.removeItem('MenuList')
      router.push('/login')
      window.location.reload()
    }
    return {
      retreat,
      store,
    }
  }
})
</script>
 
<style lang='scss'>
.header {
  float: right;
  display: flex;
  align-items: center;
  .img-header {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }
  .dropdown {
    margin:0 20px 0 5px;
    color: #000;
  }
}
</style>