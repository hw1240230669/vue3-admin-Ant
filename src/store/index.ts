import { createStore } from 'vuex'
import user from './modules/user'
export default createStore({
  state: {
    wholeMenuCorol:'dark',
    wholeMenuType:'left'
  },
  mutations: {
    set_wholeMenuCorol(state,data) {
      state.wholeMenuCorol = data
    },
    set_wholeMenuType(state,data) {
      state.wholeMenuType = data
    }
  },
  actions: {
  },
  modules: {
    user
  }
})
