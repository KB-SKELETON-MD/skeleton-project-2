import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useFinanceStore = defineStore('finance', () => {
  const categories = ref([]);
  const transactions = ref([]);
  const currentYear = ref(2025);
  const currentMonth = ref(3);

  const income = computed(() => {
    return transactions.value
      .filter((t) => {
        const d = new Date(t.date);
        return (
          d.getFullYear() === currentYear.value &&
          d.getMonth() + 1 === currentMonth.value &&
          t.type === 'income'
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);
  });
  const categoryTotals = computed(() => {
    const totals = {};

    // 이번 달 지출만 필터링해서 카테고리별로 합산
    transactions.value
      .filter((t) => {
        const d = new Date(t.date);
        return (
          d.getFullYear() === currentYear.value &&
          d.getMonth() + 1 === currentMonth.value &&
          t.type === 'expense'
        );
      })
      .forEach((t) => {
        if (!totals[t.category]) totals[t.category] = 0;
        totals[t.category] += t.amount;
      });

    // db.json의 categories 배열 정보(색상 등)와 합치기
    return Object.entries(totals).map(([name, amount]) => {
      const categoryInfo = categories.value.find((c) => c.name === name);
      return {
        name,
        amount,
        color: categoryInfo ? categoryInfo.color : '#cccccc', // 색상 정보가 없으면 회색
      };
    });
  });

  const expense = computed(() => {
    return transactions.value
      .filter((t) => {
        const d = new Date(t.date);
        return (
          d.getFullYear() === currentYear.value &&
          d.getMonth() + 1 === currentMonth.value &&
          t.type === 'expense'
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);
  });

  const revenue = computed(() => income.value - expense.value);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/transactions');
      axios.get('http://localhost:3000/categories');
      transactions.value = response.data;
    } catch (error) {
      console.error('창고 데이터 로드 실패:', error);
    }
  };

  const changeMonth = (delta) => {
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

  return {
    currentYear,
    currentMonth,
    income,
    expense,
    revenue,
    fetchData,
    changeMonth,
  };
});
