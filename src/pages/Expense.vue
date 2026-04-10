<template>
  <div class="page-container">
    <header class="list-header">
      <button class="back-btn" @click="$router.back()">◀</button>
      <h2>{{ store.currentMonth }}월 지출 내역</h2>
    </header>

    <div class="search-box">
      <input
        v-model.trim="searchQuery"
        type="text"
        class="search-input"
        placeholder="메모, 날짜, 금액으로 검색"
      />
      <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">
        ✕
      </button>
    </div>

    <div class="list-wrapper">
      <div v-if="expenseList.length === 0" class="empty-msg">
        해당 달의 지출 내역이 없습니다.
      </div>

      <div v-else-if="searchedExpenseList.length === 0" class="empty-msg">
        검색 결과가 없습니다.
      </div>

      <div
        v-for="item in searchedExpenseList"
        :key="item.id"
        class="list-item card-surface"
      >
        <div class="item-info">
          <span class="item-date">{{ item.date }}</span>
          <span class="item-memo">{{ item.memo }}</span>
        </div>
        <div class="item-amount expense-text">
          - {{ item.amount.toLocaleString() }}원
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useFinanceStore } from '@/stores/finance';

const store = useFinanceStore();
const searchQuery = ref('');

const expenseList = computed(() =>
  store.filteredTransactions.filter((t) => t.type === 'expense'),
);

const searchedExpenseList = computed(() => {
  const keyword = searchQuery.value.toLowerCase().trim();

  if (!keyword) return expenseList.value;

  return expenseList.value.filter((item) => {
    const dateText = String(item.date ?? '').toLowerCase();
    const memoText = String(item.memo ?? '').toLowerCase();
    const amountText = String(item.amount ?? '');
    const formattedAmountText = Number(item.amount ?? 0).toLocaleString();

    return (
      dateText.includes(keyword) ||
      memoText.includes(keyword) ||
      amountText.includes(keyword) ||
      formattedAmountText.includes(keyword)
    );
  });
});
</script>

<style scoped>
.page-container {
  padding: 20px;
}

.list-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.back-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.search-box {
  position: relative;
  margin-bottom: 18px;
}

.search-input {
  width: 100%;
  padding: 12px 42px 12px 14px;
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

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  margin-bottom: 12px;
  border-radius: 12px;
  border: 1px solid #eee;
  background: #fff;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-date {
  font-size: 0.8rem;
  color: #888;
}

.item-memo {
  font-weight: 600;
}

.empty-msg {
  text-align: center;
  padding: 50px 0;
  color: #999;
}

.expense-text {
  color: #d14c4c;
  font-weight: bold;
  font-size: 1.1rem;
}
</style>
