import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordNameGeneric,
} from 'vue-router';

import routes from './routes';
import { useAuthStore } from 'src/stores/auth-store';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  /**
   * check if the route is a public route (no need auth)
   * @param urlName Name of the route
   * @returns true if is a public route
   */
  const isPublicRoute = (urlName: RouteRecordNameGeneric): boolean => {
    return urlName == 'Login' || urlName == 'Register';
  };

  // redirect to login
  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (!isPublicRoute(to.name) && !authStore.isAuthenticated)
      next({ name: 'Login' });
    else next();
  });
  return Router;
});
