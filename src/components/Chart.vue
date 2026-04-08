<template>
  <div class="center-graph">
    <div class="chart-bar">
      <span class="amount-label">{{ props.income.toLocaleString() }}원</span>
      <div class="income-chart" :style="{ height: incomeHeight + 'px' }"></div>
      <span>총수입</span>
    </div>

    <div class="chart-bar">
      <span class="amount-label">{{ props.expense.toLocaleString() }}원</span>
      <div
        class="expense-chart"
        :style="{ height: expenseHeight + 'px' }"
      ></div>
      <span>지출</span>
    </div>

    <div class="chart-bar">
      <span class="amount-label">{{ props.revenue.toLocaleString() }}원</span>
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

// ⭐️ 중요: Home.vue가 보내주는 :income, :expense, :revenue를 여기서 받습니다.
const props = defineProps({
  income: { type: Number, default: 0 },
  expense: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
});

const max_height = 150;

const max_value = computed(() => {
  const values = [props.income, props.expense, Math.abs(props.revenue)];
  return Math.max(...values, 1);
});

const incomeHeight = computed(
  () => (props.income / max_value.value) * max_height,
);
const expenseHeight = computed(
  () => (props.expense / max_value.value) * max_height,
);
const revenueHeight = computed(
  () => (Math.abs(props.revenue) / max_value.value) * max_height,
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
.income-chart {
  background-color: #4acb6a;
  width: 40px;
  border-radius: 10px;
  transition: height 0.4s ease;
}
.expense-chart {
  background-color: #d73e3e;
  width: 40px;
  border-radius: 10px;
  transition: height 0.4s ease;
}
.revenue-chart {
  background-color: #494dd9;
  width: 40px;
  border-radius: 10px;
  transition: height 0.4s ease;
}
</style>
