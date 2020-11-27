<template>
  <a-drawer
    placement="right"
    :closable="false"
    v-model:visible="visible"
    width="300px"
  >
    <template #handle>
        <div class="handle">
            <div class="box" @click.stop="() => (visible = !visible)">
                <SettingFilled />
            </div>
        </div>
    </template>

    <div>
        <h2>整体风格定制</h2>
        <a-radio-group v-model:value="navTheme">
            <a-radio value='dark'>黑色</a-radio>
            <a-radio value='light'>白色</a-radio>
        </a-radio-group>

        <h2>导航模式</h2>
        <a-radio-group v-model:value="navLayout">
            <a-radio value='left'>左侧</a-radio>
            <a-radio value='top'>顶部</a-radio>
        </a-radio-group>
    </div>
  </a-drawer>
</template>

<script lang='ts'>
import { SettingFilled } from '@ant-design/icons-vue';
import { defineComponent,ref,reactive, toRefs, watch} from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
    components:{
        SettingFilled
    },
    setup() {
        const store = useStore()

        const state =  reactive({
            visible:false,
            navTheme:"dark",
            navLayout:'left'
        })

        watch(() => state.navTheme, (newValue) => {
            store.commit('set_wholeMenuCorol',newValue)
        }, {immediate: true})
        watch(() => state.navLayout, (newValue) => {
            store.commit('set_wholeMenuType',newValue)
        }, {immediate: true})
        return {
            ...toRefs(state)
        }
    }
})
</script>

<style lang="scss" scoped>
.handle {
    position: absolute;
    top: 240px;
    right: 300px;
    width: 48px;
    height: 48px;
    background: #1980ff;
    color: #ffffff;
    font-size: 20px;
    text-align: center;
    line-height: 48px;
    border-radius: 3px 0 0 3px;
    .box {
        width: 100%;
        height: 100%;
        border-radius: 3px 0 0 3px;
    }
}
</style>