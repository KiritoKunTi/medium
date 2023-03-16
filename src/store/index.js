import { createStore } from 'vuex'
import auth from '@/store/modules/auth.js'
import feed from '@/store/modules/feed'
import popularTags from '@/store/modules/popularTags'
import article from '@/store/modules/article'
import createArticle from './modules/createArticle'

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
    article,
    createArticle,
  }
})
