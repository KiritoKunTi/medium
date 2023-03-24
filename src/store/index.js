import {createStore} from 'vuex'
import auth from '@/store/modules/auth.js'
import feed from '@/store/modules/feed'
import popularTags from '@/store/modules/popularTags'
import article from '@/store/modules/article'
import createArticle from '@/store/modules/createArticle'
import editArticle from '@/store/modules/editArticle'
import settings from '@/store/modules/settings'
import addToFavorites from '@/store/modules/addToFavorites'
import userProfile from '@/store/modules/userProfile'
import followUser from '@/store/modules/followUser'
import comments from '@/store/modules/comments'

export default createStore({
  state: {},
  getters: {},
  mutations: {
    // sync
  },
  actions: {
    // async
  },
  modules: {
    auth,
    feed,
    popularTags,
    article,
    createArticle,
    editArticle,
    settings,
    addToFavorites,
    userProfile,
    followUser,
    comments,
  },
})
