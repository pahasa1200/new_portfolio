import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ChatRoutes from '@/router/Chat';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  ...ChatRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL ? process.env.BASE_URL : '/'),
  routes,
});

export default router;
