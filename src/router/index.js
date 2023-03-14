import { createRouter, createWebHashHistory } from 'vue-router'
import GlobalFeed from '@/views/GlobalFeed'

const routes = [
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: () => import('@/views/YourFeed.vue')
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: () => import('@/views/TagFeed.vue')
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: GlobalFeed
  },
  {
    path: '/settings',
    name: 'settings',
    component: GlobalFeed
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: GlobalFeed
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: GlobalFeed
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: () => import('@/views/ArticleView.vue')
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: GlobalFeed
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
