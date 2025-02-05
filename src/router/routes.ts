import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Homepage',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },

  // public routes
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/LoginPage.vue'),
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import('pages/RegisterPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
