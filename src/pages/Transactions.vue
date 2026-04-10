<template>
  <section class="transactions-page">
    <div class="transactions-card">
      <h2 class="title">최근 거래 내역</h2>

      <div class="search-box">
        <input
          v-model.trim="searchQuery"
          type="text"
          class="search-input"
          placeholder="메모, 카테고리, 날짜, 금액 검색"
        />
        <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">
          ✕
        </button>
      </div>

      <p v-if="loading" class="status-text">불러오는 중...</p>

      <p v-else-if="recentTransactions.length === 0" class="status-text">
        거래 내역이 없습니다.
      </p>

      <p
        v-else-if="filteredRecentTransactions.length === 0"
        class="status-text"
      >
        검색 결과가 없습니다.
      </p>

      <div v-else class="transaction-list">
        <div
          v-for="item in filteredRecentTransactions"
          :key="item.id"
          class="transaction-item"
        >
          <div class="left-box">
            <p class="memo">{{ item.memo }}</p>
            <p class="category">{{ item.categoryLabel }}</p>
            <p class="date">{{ item.date }}</p>
          </div>

          <div class="right-box">
            <p
              class="amount"
              :class="item.type === 'income' ? 'income' : 'expense'"
            >
              {{ item.type === 'income' ? '+' : '-' }}
              {{ item.amount.toLocaleString() }}원
            </p>

            <p class="fixed" v-if="item.isFixed">고정지출/수입</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTransactionStore } from '@/stores/transactions';

const transactionStore = useTransactionStore();
const searchQuery = ref('');

const { recentTransactions, loading } = storeToRefs(transactionStore);
const { fetchTransactions } = transactionStore;

const filteredRecentTransactions = computed(() => {
  const keyword = searchQuery.value.toLowerCase().trim();

  if (!keyword) return recentTransactions.value;

  return recentTransactions.value.filter((item) => {
    const memoText = String(item.memo ?? '').toLowerCase();
    const categoryText = String(item.categoryLabel ?? '').toLowerCase();
    const dateText = String(item.date ?? '').toLowerCase();
    const amountText = String(item.amount ?? '');
    const formattedAmountText = Number(item.amount ?? 0).toLocaleString();
    const typeText = item.type === 'income' ? '수입' : '지출';

    return (
      memoText.includes(keyword) ||
      categoryText.includes(keyword) ||
      dateText.includes(keyword) ||
      amountText.includes(keyword) ||
      formattedAmountText.includes(keyword) ||
      typeText.includes(keyword)
    );
  });
});

onMounted(() => {
  fetchTransactions();
});
</script>

<style scoped>
.transactions-page {
  width: 100%;
  min-height: 100vh;
  background: #ffeef4;
  padding: 40px 20px;
  box-sizing: border-box;
}

.transactions-card {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 24px;
  padding: 32px 24px;
  box-sizing: border-box;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: #ff5c8a;
  margin-bottom: 20px;
}

.search-box {
  position: relative;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 13px 42px 13px 14px;
  border: 1px solid #f3c7d5;
  border-radius: 12px;
  outline: none;
  font-size: 0.95rem;
  background: #fff;
  box-sizing: border-box;
}

.search-input:focus {
  border-color: #ff8fb1;
}

.clear-btn {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
  color: #999;
  font-size: 0.95rem;
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  background: #fff7fa;
  border: 1px solid #ffd6e2;
  border-radius: 18px;
  padding: 18px 20px;
}

.left-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}

.memo {
  font-size: 18px;
  font-weight: 700;
  color: #333333;
}

.category {
  font-size: 14px;
  color: #ff7a9c;
}

.date {
  font-size: 13px;
  color: #888888;
}

.right-box {
  text-align: right;
}

.amount {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 6px;
}

.income {
  color: #3b82f6;
}

.expense {
  color: #ef4444;
}

.fixed {
  font-size: 12px;
  color: #999999;
}

.status-text {
  font-size: 16px;
  color: #666666;
  text-align: center;
  padding: 30px 0;
}

.error-text {
  color: #ef4444;
}
</style>
