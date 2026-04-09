<template>
  <section class="transactions-page">
    <div class="transactions-card">
      <h2 class="title">최근 거래 내역</h2>

      <p v-if="loading" class="status-text">불러오는 중...</p>
      <p v-else-if="error" class="status-text error-text">{{ error }}</p>

      <div v-else class="transaction-list">
        <div
          v-for="item in recentTransactions"
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
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useTransactionStore } from '@/stores/transactions';

const transactionStore = useTransactionStore();

const { recentTransactions, loading, error } = storeToRefs(transactionStore);
const { fetchTransactions } = transactionStore;

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
  margin-bottom: 24px;
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff7fa;
  border: 1px solid #ffd6e2;
  border-radius: 18px;
  padding: 18px 20px;
}

.left-box {
  display: flex;
  flex-direction: column;
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
