import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useFinanceStore = defineStore('finance', () => {
  const categories = ref([]);
  const transactions = ref([]);
  const currentYear = ref(2025);
  const currentMonth = ref(3);
  const isLoading = ref(false);

  const fetchData = async () => {
    try {
      isLoading.value = true;
      const response = await axios.get('http://localhost:3000/db');
      transactions.value = response.data.transactions || [];
      categories.value = response.data.categories || [];
    } catch (e) {
      console.error('데이터 로드 실패:', e);
    } finally {
      isLoading.value = false;
    }
  };

  const categoryExpenseData = computed(() => {
    const totals = {};

    filteredTransactions.value
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const catId = t.categoryId || 'unknown';
        if (!totals[catId]) totals[catId] = 0;
        totals[catId] += t.amount;
      });

    return Object.entries(totals).map(([id, amount]) => {
      const categoryInfo = categories.value.find((c) => c.id === Number(id));

      return {
        name: categoryInfo ? categoryInfo.label : '기타',
        amount: amount,
        color: categoryInfo && categoryInfo.color ? categoryInfo.color : null,
      };
    });
  });

  const setMonth = (delta) => {
    currentMonth.value += delta;
    if (currentMonth.value > 12) {
      currentMonth.value = 1;
      currentYear.value++;
    }
    if (currentMonth.value < 1) {
      currentMonth.value = 12;
      currentYear.value--;
    }
  };

  const filteredTransactions = computed(() => {
    const target = `${currentYear.value}-${String(currentMonth.value).padStart(2, '0')}`;
    return transactions.value.filter(
      (t) => t.date && t.date.startsWith(target),
    );
  });

  const totalIncome = computed(() =>
    filteredTransactions.value
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0),
  );

  const totalExpense = computed(() =>
    filteredTransactions.value
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0),
  );

  const netProfit = computed(() => totalIncome.value - totalExpense.value);

  return {
    categories,
    transactions,
    currentYear,
    currentMonth,
    isLoading,
    fetchData,
    setMonth,
    totalIncome,
    totalExpense,
    netProfit,
    filteredTransactions,
    categoryExpenseData,
  };
});
