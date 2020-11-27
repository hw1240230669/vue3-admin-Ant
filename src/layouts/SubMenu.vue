<template>
  <a-sub-menu :key="menuInfo.menuId" v-bind="$attrs">
      <template #title>
        <span>
          <MailOutlined /><span>{{ menuInfo.name }}</span>
        </span>
      </template>
      <template v-for="item in menuInfo.list" :key="item.menuId">
        <template v-if="!item.list">
          <a-menu-item :key="item.menuId" @click="() => router.push({ name:item.url })">
            <PieChartOutlined />
            <span>{{ item.name }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.menuId" />
        </template>
      </template>
    </a-sub-menu>
</template>
 
<script lang='ts'>
import { PieChartOutlined,  MailOutlined} from '@ant-design/icons-vue';
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
    name: 'SubMenu',
    props: {
        menuInfo: {
        type: Object,
        default: () => ({}),
        },
    },
    components: {
        PieChartOutlined,
        MailOutlined,
    },
    setup() {
      const router = useRouter()
      return {
        router
      }
    }
})
</script>
 
<style lang='scss' scoped>
 
</style>