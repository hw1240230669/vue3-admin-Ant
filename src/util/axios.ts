import axios,{AxiosRequestConfig} from 'axios'
import { getToken } from '@/util/index'
class HttpRequest {
    getTnsideConfig() {
        const config = {
            baseURL: 'http://rap2api.taobao.org/app/mock',
            headers: {}
        }
        return config
    }

    interceptors(instance:any) {
        // 请求拦截器
        instance.interceptors.request.use((config:AxiosRequestConfig) => {
            config.headers['token'] = getToken()
            return config
        }, (erros:string) => {
            return Promise.reject(erros)
        })
        // 响应拦截器
        instance.interceptors.response.use((res:AxiosRequestConfig) => {
            const { data } = res
            return { data }
        }, (erros:string) => {
            return Promise.reject(erros)
        })
    }

    request(options:object) {
        const instance = axios.create()
        options = Object.assign(this.getTnsideConfig(), options)
        this.interceptors(instance)
        return instance(options)
    }

}

const get = function(url:string,params?:object,headers?:object) {
    return new HttpRequest().request({
        url,
        method: 'get',
        headers,
        params
    })
}

const post = function(url:string,data:object,headers?:object) {
    return new HttpRequest().request({
        url,
        method: 'post',
        headers,
        data
    })
}
export default {
    get,
    post
}