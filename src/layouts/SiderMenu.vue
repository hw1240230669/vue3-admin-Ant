<template>
  <div >
    <a-menu
      :selectedKeys="selectedKeys"
      :default-open-keys="openkeys"
      :mode="store.state.wholeMenuType == 'left' ? 'inline' : 'horizontal'"
      :theme="store.state.wholeMenuCorol"
      @click="menuClick"
    >
      <template v-for="item in menuList" :key="item.menuId">
        <template v-if="!item.list">
          <a-menu-item :key="item.menuId" @click="() => router.push({ name:item.url })" style="margin: 0;">
            <PieChartOutlined />
            <span>{{ item.name }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.menuId" />
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script lang='ts'>
import {
  PieChartOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';
import SubMenu from './SubMenu.vue'
import { defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter,useRoute } from 'vue-router'
import { UserMenu } from '../api/user'
import { IMenuInfo } from '../typings/user'
interface IMenu {
    menuList:IMenuInfo[],
    selectedKeys:number[],
    openkeys:number[],
    openkeysList:number[]
}
export default defineComponent({
    components: {
      'sub-menu': SubMenu,
      PieChartOutlined,
      DesktopOutlined,
      InboxOutlined,
      AppstoreOutlined,
    },
    setup() {
      const router = useRouter()
      const route = useRoute()
      const store = useStore()

      const state:IMenu =  reactive({
        menuList : [], // 菜单List
        selectedKeys: [], // 选中的那个菜单
        openkeys:[], // 打开那个菜单
        openkeysList:[]
      })

      state.menuList = store.state.user.MenuList

      function menukeys (list:IMenuInfo[]) {
        for(let i of list) {
          if (i.list == null) {
            state.selectedKeys = [i.menuId]
            state.openkeysList.push(i.menuId)
            state.openkeys = state.openkeysList
            CrumbsList(state.openkeys as [])
            return false
          } else if(i.list.length >= 1) {
            state.openkeysList.push(i.menuId)
            menukeys(i.list)
          }
        }
      }

      let oepnMenuKeys = JSON.parse(sessionStorage.getItem('menuSelect') as string)
      if (oepnMenuKeys) {
        state.selectedKeys = oepnMenuKeys.selectedKeys
        state.openkeys = oepnMenuKeys.openkeys
        CrumbsList(oepnMenuKeys.openkeys)
      } else {
        menukeys(state.menuList)
      }

      // 面包屑循环
      function CrumbsList (list:[]) {
        let data:string[] = []
        list.forEach((item)=>{
          xunhuan(state.menuList,item)
          data.push(xunhuan(state.menuList,item))
        })
        store.commit('user/set_Crumbslist',data.reverse())
        // console.log(store.state.user.Crumbslist)
      }
      // 面包屑循环 - 1
      function xunhuan (list:IMenuInfo[],type:number):string{
        for( let i of list) {
            if (i.menuId === type) {
              return i.name
            } else if (i.list) {
              return xunhuan(i.list as IMenuInfo[],type)
            }
        }
        return ''
      }

      function menuClick (item:any) {
        const menuKeys = {
          selectedKeys : [item.key],
          openkeys : item.keyPath
        }
        sessionStorage.setItem('menuSelect',JSON.stringify(menuKeys))
        state.selectedKeys = [item.key]
        state.openkeys = item.keyPath
        CrumbsList(item.keyPath)
      }

      return {
        ...toRefs(state),
        router,
        menuClick,
        store
      }
    }
})

</script>

<style>

</style>
