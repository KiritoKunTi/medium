import { createStore } from 'vuex'
import auth from '@/store/modules/auth.js'
import feed from '@/store/modules/feed'
import popularTags from '@/store/modules/popularTags'

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
    popularTags,
  }
})
