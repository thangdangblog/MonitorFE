import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './pages/Dashboard.vue'
import AddWork from './pages/AddWork.vue'

const routes = [
  {
    path: '/',
    component: Dashboard
  },
  {
    path: '/add',
    component: AddWork
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;