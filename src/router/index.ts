import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/About.vue'),
    },
    {
      path: '/departments',
      name: 'Departments',
      component: () => import('@/views/Departments.vue'),
    },
    {
      path: '/doctors',
      name: 'Doctors',
      component: () => import('@/views/Doctors.vue'),
    },
    {
      path: '/guide',
      name: 'Guide',
      component: () => import('@/views/Guide.vue'),
    },
    {
      path: '/news',
      name: 'News',
      component: () => import('@/views/News.vue'),
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('@/views/Contact.vue'),
    },
  ],
})

export default router
