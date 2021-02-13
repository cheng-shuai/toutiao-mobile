import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY),
    cachedPages: ['LayoutIndex']
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 将token存储到本地中
      setItem(USER_KEY, state.user)
    },
    // 移除缓存页面
    removeCachePage (state, pageName) {
      const index = state.cachedPages.indexOf(pageName)
      if (index !== -1) {
        state.cachedPages.splice(index, 1)
      }
    },
    // 添加缓存页面
    addCachePage (state, pageName) {
      if (!state.cachedPages.includes(pageName)) {
        state.cachedPages.push(pageName)
      }
    }
  },
  actions: {},
  modules: {}
})
