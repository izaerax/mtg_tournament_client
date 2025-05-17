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
      {
        path: 'new-league',
        name: 'NewLeague',
        component: () => import('pages/NewLeaguePage.vue')
      },
      {
        path: 'new-tournament',
        name: 'NewTournament',
        component: () => import('pages/NewTournamentPage.vue')
      },
      {
        path: 'players',
        name: 'Players',
        component: () => import('pages/PlayersPage.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('pages/ProfilePage.vue')
      }
    ],
  },

  // public routes
  {
    path: '/',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
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
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
