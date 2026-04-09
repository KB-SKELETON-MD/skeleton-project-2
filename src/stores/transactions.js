import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref([]);
  const categories = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchTransactions = async () => {
    loading.value = true;
    error.value = null;

    try {
      const [transactionsRes, categoriesRes] = await Promise.all([
        axios.get('http://localhost:3000/transactions'),
        axios.get('http://localhost:3000/categories'),
      ]);

      transactions.value = transactionsRes.data;
      categories.value = categoriesRes.data;
    } catch (err) {
      error.value = '거래 내역을 불러오지 못했습니다.';
      console.error('fetchTransactions 에러:', err);
    } finally {
      loading.value = false;
    }
  };

  const recentTransactions = computed(() => {
    return [...transactions.value]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((transaction) => {
        const category = categories.value.find(
          (item) => item.id === transaction.categoryId,
        );

        return {
          ...transaction,
          categoryLabel: category ? category.label : '알 수 없음',
        };
      });
  });

  return {
    transactions,
    categories,
    loading,
    error,
    fetchTransactions,
    recentTransactions,
  };
});
