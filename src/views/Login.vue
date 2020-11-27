<template>
  <div class="login-box">
    <div class="box-card">
      <div class="login-content">
        <a-form :model="ruleForm" v-bind="layout">
          <a-form-item label="账号:">
            <a-input v-model:value="ruleForm.phone" placeholder="请输入账号">
              <template #prefix><UserOutlined style="color:rgba(0,0,0,.25)"/></template>
            </a-input>
          </a-form-item>
          <a-form-item label="密码:">
            <a-input v-model:value="ruleForm.password" type="password" placeholder="Password">
              <template #prefix><LockOutlined style="color:rgba(0,0,0,.25)"/></template>
            </a-input>
          </a-form-item>
          <a-form-item label="验证码:">
             <div style="display: flex;">
                  <a-input  v-model:value="ruleForm.verification" :maxlength=4 style="width:80px;"></a-input>
                  <img style="height:40px; width:100px;margin-left: 10px;" src="http://yh.dev.ibaifang.in/captcha.html?seed=0.9629915804318707">
              </div>
          </a-form-item>
          <a-button type="primary" style="width:100%;" shape="round" :size="'large'" @click="clickLogin" >登入</a-button>
        </a-form>
      </div>

      <div class="login-content right-login">
        <img
          src="https://img.51miz.com/preview/element/00/01/13/93/E-1139349-60DD30D8.jpg!/quality/90/unsharp/true/compress/true/fw/840"
        />
      </div>
    </div>
  </div>
</template>
 
<script lang='ts'>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { UserLogin , UserInfo } from '../api/user'
import { ILogin } from '../typings/user'
import { setToken } from '@/util/index'
import { addRouterMenu } from '@/router/index'
export default defineComponent({
  components:{
    UserOutlined,
    LockOutlined
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const ruleForm = ref<ILogin>({
      phone: "",
      password: "",
      verification: ""
    })

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    }

    const clickLogin = () => {
      UserLogin(ruleForm.value).then( async ({ data }) => {
        setToken(data.data.token)
        await store.dispatch('user/getMenuList')
        addRouterMenu('/')
        // router.push({path:'/'})
      })
    };
    
    return {
      ruleForm,
      clickLogin,
      layout
    };
  },
});
</script>
 
<style lang='scss'>
.login-box {
  min-width: 1260px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: "";
    background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605246218552&di=45966e4c1ea93568700fd72b7b1aa5a3&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F59bcc99530b6e.jpg");
    background-size: cover;
  }
  .box-card {
    width: 1000px;
    height: 720px;
    background: rgba(0, 0, 0, 0.8);
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
    border: none;
    display: flex;
    border-radius: 5px;
    .login-content {
      flex: 1;
      color: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      .ant-form-item label {
        color: #fff;
        font-size: 17px;
        margin-right: 25px;
      }
      .ant-form-item-control {
        width: 190px;
      }
    }
    .right-login {
      background-image: linear-gradient(#11c98d, #237d96);
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      img {
        width: 50%;
        height: 50%;
      }
    }
  }
}
</style>