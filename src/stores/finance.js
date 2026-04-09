import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useFinanceStore = defineStore('finance', () => {
  const categories = ref([]);
  const transactions = ref([]);
  const currentYear = ref(2025);
  const currentMonth = ref(3);
  const isLoading = ref(false);
  const selectedCategoryId = ref(null);

  const fetchData = async () => {
    try {
      isLoading.value = true;
      const response = await axios.get('/db.json');
      transactions.value = response.data.transactions || [];
      categories.value = response.data.categories || [];
    } catch (e) {
      console.error('데이터 로드 실패:', e);
    } finally {
      isLoading.value = false;
    }
  };

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

  const filteredTransactions = computed(() => {
    const target = `${currentYear.value}-${String(currentMonth.value).padStart(2, '0')}`;

    let list = transactions.value.filter(
      (t) => t.date && t.date.startsWith(target),
    );

    if (selectedCategoryId.value) {
      list = list.filter((t) => t.categoryId === selectedCategoryId.value);
    }

    return list;
  });

  return {
    transactions,
    categories,
    currentYear,
    currentMonth,
    isLoading,
    fetchData,
    setMonth,
    totalIncome,
    totalExpense,
    netProfit,
    filteredTransactions,
    selectedCategoryId,
    setCategory,
    filteredTransactions,
  };
});
