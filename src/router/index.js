import {createRouter, createWebHashHistory} from 'vue-router'
import store from '@/store'
import { getterTypes } from '@/store/modules/auth'
import GlobalFeed from '@/views/GlobalFeed'
import HomeView from '@/views/HomeView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/feeds',
    children: [
      {
        path: '/feeds',
        name: 'globalFeed',
        component: GlobalFeed,
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/RegisterView.vue'),
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue'),
      },
      {
        path: '/feed',
        name: 'yourFeed',
        component: () => import('@/views/YourFeed.vue'),
      },
      {
        path: '/tags/:slug',
        name: 'tag',
        component: () => import('@/views/TagFeed.vue'),
      },
      {
        path: '/articles/new',
        name: 'createArticle',
        component: () => import('@/views/CreateArticle.vue'),
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('@/views/SettingsView.vue'),
      },
      {
        path: '/profiles/:slug',
        name: 'userProfile',
        component: () => import('@/views/UserProfile.vue'),
      },
      {
        path: '/profiles/:slug/favorites',
        name: 'userProfileFavorites',
        component: () => import('@/views/UserProfile.vue'),
      },
      {
        path: '/articles/:slug',
        name: 'article',
        component: () => import('@/views/ArticleView.vue'),
      },
      {
        path: '/articles/:slug/edit',
        name: 'editArticle',
        component: () => import('@/views/EditArticle.vue'),
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'pageNotFound',
    component: () => import('@/views/ThePageNotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAnonymous = store.getters[getterTypes.isAnonymous];
  const needsToLogIn = ['createArticle', 'settings', 'editArticle']
  if(isAnonymous && needsToLogIn.includes(to.name)) {
    next({name: 'login'})
  }
  next()
})

export default router
