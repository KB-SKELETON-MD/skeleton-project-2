import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useFinanceStore } from './finance'; // 메인 창고 임포트

export const useReportStore = defineStore('report', () => {
  const financeStore = useFinanceStore();

  // 1. 기본 데이터는 financeStore에서 빌려옵니다.
  const currentYear = computed(() => financeStore.currentYear);
  const currentMonth = computed(() => financeStore.currentMonth);
  const income = computed(() => financeStore.totalIncome);
  const expense = computed(() => financeStore.totalExpense);
  const revenue = computed(() => financeStore.netProfit);

  // 2. 리포트 페이지 전용: 그래프 높이 계산 로직
  const max_height = 150;

  const max_value = computed(() => {
    // 수입, 지출, 순수익(절대값) 중 가장 큰 값을 기준으로 비율 설정
    const values = [income.value, expense.value, Math.abs(revenue.value)];
    return Math.max(...values, 1);
  });

  const incomeHeight = computed(
    () => (income.value / max_value.value) * max_height,
  );
  const expenseHeight = computed(
    () => (expense.value / max_value.value) * max_height,
  );
  const revenueHeight = computed(
    () => (Math.abs(revenue.value) / max_value.value) * max_height,
  );

  return {
    currentYear,
    currentMonth,
    income,
    expense,
    revenue,
    incomeHeight,
    expenseHeight,
    revenueHeight,
    // 월 변경 함수도 financeStore의 것을 그대로 연결
    changeMonth: financeStore.setMonth,
    fetchData: financeStore.fetchData,
  };
});
