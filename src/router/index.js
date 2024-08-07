import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin/AdminView.vue'),
      redirect: '/admin/tag',
      children: [
        {
          path: 'tag',
          name: 'tag',
          component: () => import('../views/Admin/AdminTagView.vue')
        },
        {
          path: 'category',
          name: 'category',
          component: () => import('../views/Admin/AdminCategoryView.vue')
        },
        {
          path: 'bookmark',
          name: 'bookmark',
          component: () => import('../views/Admin/AdminBookMarkView.vue')
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      redirect: '/user/login',
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/User/LoginView.vue')
        },
        {
          path: 'console',
          name: 'console',
          component: () => import('../views/User/UserPage.vue')
        }
      ]
    }
  ]
})

export default router
