import axios from '../util/axios'
import { ILogin } from '../typings/user'

// 登入login
export const UserLogin = (data:ILogin) => {
    return axios.post('/270743/login',data)
}

// 用户信息
export const UserInfo = () => {
    return new Promise((resolve,reject) => {
        axios.get('/270743/userInfo').then(res => {
            if(res.data.code == 200) {
                resolve(res)
            } else {
                reject(new Error(res.data.msg))
            } 
        }).catch(error => {
            reject(new Error(error))
        })
    })
}

// 用户动态菜单
export const UserMenu = () => {
    return axios.get('/270743/userMenu')
}
