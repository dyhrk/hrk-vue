import { createWebHistory, createRouter } from 'vue-router'
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/index'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/menu',
    component: () => import('@/views/system/menu'),
    hidden: true
  },
]
export const dynamicRoutes = [
]

const router = createRouter({
  // history: createWebHistory('/admin'),
  history: createWebHistory(),
  routes: constantRoutes,
});

export default router;
