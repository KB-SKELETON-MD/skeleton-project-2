import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Report from '@/pages/Report.vue';
import Transactions from '@/pages/Transactions.vue';
import NotFound from '@/pages/NotFound.vue';
import Income from '@/pages/Income.vue';
import Expense from '@/pages/Expense.vue';
import Add from '@/pages/Add.vue';
import Login from '@/pages/Login.vue';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
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
      path: '/add',
      name: 'add',
      component: Add,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // 새로고침 대비: guard 실행 전에 localStorage에서 유저 복원
  authStore.loadUser();

  // 로그인 페이지는 통과
  if (to.path === '/login') {
    next();
    return;
  }

  // 로그인 안 되어 있으면 로그인 페이지로 이동
  if (!authStore.user) {
    next('/login');
  } else {
    next();
  }
});

export default router;
