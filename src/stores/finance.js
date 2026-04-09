import { defineStore, storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import { useCalendarStore } from '@/stores/calendar';

export const useFinanceStore = defineStore('finance', () => {
  const calendarStore = useCalendarStore();
  const { currentYear, currentMonth } = storeToRefs(calendarStore);

  const categories = ref([]);
  const transactions = ref([]);
  const isLoading = ref(false);

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

  const setMonth = (arg1, arg2) => {
    if (typeof arg2 !== 'number') {
      calendarStore.changeMonth(arg1);
      return;
    }

    calendarStore.setMonth(arg1, arg2);
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
  };
});
