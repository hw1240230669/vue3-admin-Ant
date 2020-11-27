import { Module } from 'vuex'
import { UserMenu } from '../../api/user'

// Module里的参数 第一个说自己的状态 第二个就是全局的
const user:Module<any,any> = {
    namespaced:true,
    state: {
        userInfo: JSON.parse(localStorage.getItem('userInfo') as string),
        MenuList: JSON.parse(localStorage.getItem('MenuList') as string) ? JSON.parse(localStorage.getItem('MenuList') as string) : [],
        Crumbslist:[]
    },
    mutations:{
        set_userInfo(state,data) {
            state.userInfo = data
        },
        set_MenuList(state,data) {
            state.MenuList = data
        },
        set_Crumbslist(state,data) {
            state.Crumbslist = data
        }
    },
    actions:{
        async getMenuList({commit}){
            return new Promise((resolve,reject) => {
                UserMenu().then(res => {
                    if(res.data.code == 200) {
                        commit('set_MenuList',res.data.data)
                        localStorage.setItem('MenuList',JSON.stringify(res.data.data))
                        resolve()
                    } else {
                        reject(new Error(res.data.data.msg))
                    }
                }).catch(error =>{
                    reject(new Error(error))
               })
            })
         }
    }
}

export default user