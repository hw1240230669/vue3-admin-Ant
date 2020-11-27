import Cookies from 'js-cookie'

export const setToken = (token:string,toKenName:string = 'token') => {
    Cookies.set(toKenName,token)
}

export const getToken = (toKenName:string = 'token') => {
    return Cookies.get(toKenName)
}

export const clearLoginInfo = () => {
    Cookies.remove('token')
}