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
      path: '/products',
      name: 'Products',
      component: () => import('@/views/Products.vue'),
    },
    {
      path: '/patient-service',
      name: 'PatientService',
      component: () => import('@/views/PatientService.vue'),
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
    {
      path: '/product/:productCode',
      name: 'ProductDetail',
      component: () => import('@/views/ProductDetail.vue'),
    },
    {
      path: '/news/:newsNo',
      name: 'NewsDetail',
      component: () => import('@/views/NewsDetail.vue'),
    },
    {
      path: '/careers',
      name: 'Careers',
      component: () => import('@/views/Careers.vue'),
    },
    {
      path: '/careers/:recruitNo',
      name: 'JobDetail',
      component: () => import('@/views/JobDetail.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router