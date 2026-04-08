<template>
  <div class="page-container">
    <header class="list-header">
      <button class="back-btn" @click="$router.back()">◀</button>
      <h2>{{ financeStore.currentMonth }}월 수입 내역</h2>
    </header>

    <div class="list-wrapper">
      <div v-if="incomeList.length === 0" class="empty-msg">
        해당 달의 수입 내역이 없습니다.
      </div>
      <div
        v-for="item in incomeList"
        :key="item.id"
        class="list-item card-surface"
      >
        <div class="item-info">
          <span class="item-date">{{ item.date }}</span>
          <span class="item-memo">{{ item.memo }}</span>
        </div>
        <div class="item-amount income-text">
          + {{ item.amount.toLocaleString() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useFinanceStore } from '@/stores/finance';
const financeStore = useFinanceStore();

const incomeList = computed(() =>
  financeStore.filteredTransactions.filter((t) => t.type === 'income'),
);
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

/* 수입: 밝은 초록 계열 */
.income-text {
  color: #4cd170;
  font-weight: bold;
  font-size: 1.1rem;
}
</style>
