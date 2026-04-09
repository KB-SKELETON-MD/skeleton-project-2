<template>
  <div class="center-graph">
    <div class="chart-bar">
      <span class="amount-label"
        >{{ store.totalIncome.toLocaleString() }}원</span
      >
      <div class="income-chart" :style="{ height: incomeHeight + 'px' }"></div>
      <span class="label-text">총수입</span>
    </div>

    <div class="chart-bar">
      <span class="amount-label"
        >{{ store.totalExpense.toLocaleString() }}원</span
      >
      <div
        class="expense-chart"
        :style="{ height: expenseHeight + 'px' }"
      ></div>
      <span class="label-text">지출</span>
    </div>

    <div class="chart-bar">
      <span class="amount-label">{{ store.netProfit.toLocaleString() }}원</span>
      <div
        class="revenue-chart"
        :style="{ height: revenueHeight + 'px' }"
      ></div>
      <span>순수익</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useFinanceStore } from '@/stores/finance';

const store = useFinanceStore();
const max_height = 150;

const max_value = computed(() => {
  const values = [
    store.totalIncome,
    store.totalExpense,
    Math.abs(store.netProfit),
  ];
  return Math.max(...values, 10000);
});

const incomeHeight = computed(
  () => (store.totalIncome / max_value.value) * max_height,
);
const expenseHeight = computed(
  () => (store.totalExpense / max_value.value) * max_height,
);
const revenueHeight = computed(
  () => (Math.abs(store.netProfit) / max_value.value) * max_height,
);
</script>

<style scoped>
.amount-label {
  font-size: 11px;
  font-weight: bold;
  color: #666;
  margin-bottom: 5px;
  white-space: nowrap;
}
.center-graph {
  display: flex;
  align-items: flex-end;
  gap: 30px;
  justify-content: center;
  border-radius: 40px;
  padding: 50px 20px;
  background-color: var(--primary-pink);
  min-height: 250px;
  width: 100%;
  height: 100%;
}
.chart-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.income-chart,
.expense-chart,
.revenue-chart {
  width: 35px;
  border-radius: 8px;
  transition: height 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* 튀어오르는 애니메이션 */
}

.income-chart {
  background-color: #4acb6a;
}
.expense-chart {
  background-color: #d73e3e;
}
.revenue-chart {
  background-color: #494dd9;
}
.label-text {
  font-size: 11px;
  margin-top: 8px;
  color: #333;
}
</style>
