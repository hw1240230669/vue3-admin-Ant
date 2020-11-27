<template>
    <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      v-if="store.state.wholeMenuType == 'left'"
      v-model:collapsed="collapsed" 
      :trigger="null"
      :theme="store.state.wholeMenuCorol" 
      collapsible 
    >
      <MenuSider />
    </a-layout-sider>
    <a-layout style="height:100vh">
      <a-layout-header style="background: #fff; padding: 0;height: 50px; line-height: 50px;"
        :style="store.state.wholeMenuCorol == 'dark' ? 'background-color: #001529;' : 'background-color: light;' "
      >
        <MenuUnfoldOutlined class="menu-icon" 
          @click="() => (collapsed = !collapsed)" 
          v-if="store.state.wholeMenuType == 'left'"
          :style="store.state.wholeMenuCorol == 'dark' ? 'color: #fff;' : ''"
        />
        <MenuSider v-if="store.state.wholeMenuType == 'top'" style="float: left;"/>
        <Headre />
      </a-layout-header>
      <Crumbs />
      <a-layout-content
        style="overflow-y: auto;"
        :style="{ margin: '14px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
  <SettingDrawer />
</template>
 
<script lang='ts'>
import Headre from './Header.vue'
import MenuSider from './MenuSider.vue'
import Crumbs from './Crumbs.vue'
import SettingDrawer from '../components/SettingDrawer/index.vue'
import { defineComponent, ref ,reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { MenuUnfoldOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    components:{
        Headre,
        MenuSider,
        MenuUnfoldOutlined,
        SettingDrawer,
        Crumbs
    },
    setup() {
        const collapsed = ref(false)
        const store = useStore()
        return {
            collapsed,store
        }
    }
})
</script>
 
<style lang='scss'>
.ant-layout-sider-children {
    height: 100vh;
}
.menu-icon {
  padding: 0 20px;
  line-height: 50px;
  font-size: 20px;
}
</style>