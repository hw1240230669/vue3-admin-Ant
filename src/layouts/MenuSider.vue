<template>
    <div class="MenuSider" :style="type ? 'flex-direction: column;' : 'flex-direction: row;'" style="display: flex;">
        <div class="logo" :style="type ? '' : 'width: 200px;'"
        >ANT-ADMIN-VUE3</div>
        <SiderMenu />
    </div>
</template>
 
<script lang='ts'>
import { defineComponent, ref,watch} from 'vue'
import { useStore } from 'vuex'
import SiderMenu from './SiderMenu.vue'

export default defineComponent({
    components:{
        SiderMenu
    },
    setup() {
        const store = useStore()
        const type = ref()
        watch(() => store.state.wholeMenuType, (newValue) => {
            if(newValue == 'left'){
                type.value = true
            } else {
                type.value = false
            }
        }, {immediate: true})
        return {
            store,
            type
        }
    }
})
</script>
 
<style lang='scss'>
.logo {
    height: 50px;
    color: #fff;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    overflow: hidden;
    background-color: #1DA57A;
}
.ant-menu-dark.ant-menu-horizontal {
    height: 50px;
    width: 60vw;
}
.ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
    height: 50px;
    line-height: 50px;
}
.ant-menu-horizontal {
    line-height: 50px
}
.ant-menu-dark.ant-menu-horizontal > .ant-menu-item, .ant-menu-dark.ant-menu-horizontal > .ant-menu-submenu {
    height: 50px;
}
.ant-menu-dark.ant-menu-inline .ant-menu-item, .ant-menu-dark.ant-menu-inline .ant-menu-submenu-title {
    height: 50px;
    line-height: 50px;
}
.ant-menu-vertical .ant-menu-item:not(:last-child), .ant-menu-vertical-left .ant-menu-item:not(:last-child), .ant-menu-vertical-right .ant-menu-item:not(:last-child), .ant-menu-inline .ant-menu-item:not(:last-child) {
    margin: 0;
}
.ant-menu-vertical.ant-menu-sub .ant-menu-item, .ant-menu-vertical-left.ant-menu-sub .ant-menu-item, .ant-menu-vertical-right.ant-menu-sub .ant-menu-item {
    margin: 0;
    height: 50px;
    line-height: 50px;
}
.ant-menu-item .ant-menu-item-selected {
    margin: 0;
}
</style>