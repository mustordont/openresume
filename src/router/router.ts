import Vue from 'vue';
import Router from 'vue-router';
import LoginComponent from '../views/Login.vue';
import AuthProviderComponent from '../views/AuthProvider.vue';
import ResumeProviderComponent from '../views/ResumeProvider.vue';
import {authGuard} from './auth';

Vue.use(Router);

export const router: Router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginComponent,
      meta: {auth: false},
    },
    {
      path: '/auth/:id',
      name: 'auth',
      component: AuthProviderComponent,
      props: true,
      meta: {auth: false},
    },
    {
      path: '/',
      children: [
        {
          path: 'provider/:id',
          name: 'resume',
          component: ResumeProviderComponent,
        },
      ],
      beforeEnter: authGuard,
      meta: {auth: true},
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: 'about' */ '../views/About.vue'),
    },
  ],
});
