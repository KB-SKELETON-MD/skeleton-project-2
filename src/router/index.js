import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Report from '@/pages/Report.vue';
import MyPages from '@/pages/MyPages.vue';
import Settings from '@/pages/Settings.vue';
import Transactions from '@/pages/Transactions.vue';
import NotFound from '@/pages/NotFound.vue';
import Income from '@/pages/Income.vue';
import Expense from '@/pages/Expense.vue';
import Add from '@/pages/Add.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/report',
      name: 'report',
      component: Report,
    },
    {
      path: '/myPages',
      name: 'myPages',
      component: MyPages,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: Transactions,
    },
    {
      path: '/income',
      name: 'income',
      component: Income,
    },
    {
      path: '/expense',
      name: 'expense',
      component: Expense,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '/add',
      name: 'add',
      component: Add,
    },
  ],
});

export default router;
