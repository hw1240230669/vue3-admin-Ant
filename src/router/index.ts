import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { getToken } from '@/util/index'
import user from '@/store/modules/user'
import { IMenuInfo } from '../typings/user'
// 全局路由(无需嵌套上左右整体布局)
const routes: Array<RouteRecordRaw> = [
  { path: '/login', name: 'login', component: () => import('../views/Login.vue') }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
  const token = getToken()
  if (token) {
    if(to.name === 'login') {
      next({path: '/'})
    }
    next()
  } else {
    if (to.name === 'login') next()
    else next({path:'/login'})
  }
})

/* 
 * 动态路由
 * @url 传入需要跳转的地址 
*/
export function addRouterMenu(url:string) {
  const MenuInfo = user.state.MenuList
  let redirect:string = ''
  let menuList = []

  function menukeys (list:any) {
    for(let i of list) {
      if (i.list == null) {
        redirect = '/'+i.url
        return false
      } else if(i.list.length >= 1) {
        menukeys(i.list)
      }
    }
  }
  menukeys(MenuInfo)

  let mainRoutes = {
    path: '/',
    name: 'Main',
    component: () => import('../layouts/BasicLayout.vue'),
    redirect:redirect,
    children: []
  }
  
  function fnAddDynamicMenuRoutes(list:IMenuInfo[]) {
    list.forEach((item) => {
      if (!item.list) {
        let data = {
          path:'/'+item.url,
          name:item.url,
          component: () => import(`../views/${item.url.replace(/-/g, '/')}.vue`)
        }
        menuList.push(data)
      } else if (item.list.length >= 1)  {
        fnAddDynamicMenuRoutes(item.list)
      }
    })
  }

  fnAddDynamicMenuRoutes(MenuInfo)

  menuList.push({
      path: '/:catchAll(.*)',
      component: () => import('../views/404.vue')
  })

  mainRoutes.children = menuList as []
  router.addRoute(mainRoutes)
  router.replace(url)
}

export default router
