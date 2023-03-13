import { createStore } from 'vuex'
import auth from '@/store/modules/auth.js'
import feed from '@/store/modules/feed'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: { // sync
  },
  actions: {  // async
  },
  modules: {
    auth,
    feed,
  }
})
