import { defineStore, storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import { useCalendarStore } from '@/stores/calendar';

export const useFinanceStore = defineStore('finance', () => {
  const calendarStore = useCalendarStore();
  // calendarStore의 상태를 반응형으로 가져옵니다.
  const { currentYear, currentMonth } = storeToRefs(calendarStore);

  const categories = ref([]);
  const transactions = ref([]);
  const isLoading = ref(false);

  // 1. 데이터 로드 (경로는 서버 설정에 맞게 /db 또는 /transactions로 확인 필요)
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

  // 2. 월 변경 함수 (calendarStore의 기능을 활용해 중복 제거)
  const setMonth = (delta) => {
    // financeStore에서 직접 계산하는 대신 calendarStore의 기능을 호출하세요.
    calendarStore.changeMonth(delta);
  };

  // 3. 필터링된 내역 (연도-월 형식 맞춤)
  const filteredTransactions = computed(() => {
    const target = `${currentYear.value}-${String(currentMonth.value).padStart(2, '0')}`;
    return transactions.value.filter(
      (t) => t.date && t.date.startsWith(target),
    );
  });

  // 4. 리포트용 카테고리별 지출 데이터
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
      const categoryInfo = categories.value.find((c) => c.id === id);
      return {
        name: categoryInfo ? categoryInfo.label : '기타',
        amount: amount,
        color: categoryInfo && categoryInfo.color ? categoryInfo.color : null,
      };
    });
  });

  // 5. 요약 데이터 계산
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
