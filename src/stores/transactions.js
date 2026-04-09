import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useFinanceStore } from './finance'; // ⭐️ 메인 창고 임포트

export const useTransactionStore = defineStore('transaction', () => {
  const financeStore = useFinanceStore();

  // 1. 데이터를 직접 fetch하지 않고, financeStore의 데이터를 참조합니다.
  const loading = computed(() => financeStore.isLoading);

  // 2. 최근 거래 내역 가공 로직
  const recentTransactions = computed(() => {
    // financeStore에 데이터가 없다면 빈 배열 반환
    if (!financeStore.transactions || financeStore.transactions.length === 0)
      return [];

    return (
      [...financeStore.transactions]
        // 날짜 기준 내림차순 정렬 (최신순)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((transaction) => {
          // financeStore의 categories에서 라벨 찾기
          const category = financeStore.categories.find(
            (item) => item.id === transaction.categoryId,
          );

          return {
            ...transaction,
            // 카테고리 정보가 없으면 '기타' 또는 '알 수 없음' 처리
            categoryLabel: category ? category.label : '기타',
          };
        })
    );
  });

  // 3. 데이터 로드가 필요할 때만 financeStore의 fetchData를 호출합니다.
  const fetchTransactions = () => {
    if (financeStore.transactions.length === 0) {
      financeStore.fetchData();
    }
  };

  return {
    loading,
    recentTransactions,
    fetchTransactions,
  };
});
