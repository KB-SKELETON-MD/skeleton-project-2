<template>
  <div class="dashboard-page">
    <div class="month-selector">
      <div class="month-bar">
        <button class="arrow-btn" @click="store.changeMonth(-1)">
          <strong>&lt;</strong>
        </button>
        <span class="current-date"
          ><strong
            >{{ store.currentYear }}년 {{ store.currentMonth }}월</strong
          ></span
        >
        <button class="arrow-btn" @click="store.changeMonth(1)">
          <strong>&gt;</strong>
        </button>
      </div>
    </div>

    <div class="charts-wrapper">
      <div class="left-graph">
        <div class="category-expense">
          <img src="@/assets/categoryicon.png" />
          &nbsp;&nbsp;카테고리별 지출
        </div>
        <div class="pie-container">
          <PieChart />
        </div>
      </div>

      <div class="right-graph">
        <div class="total">
          <img src="@/assets/totalicon.png" />
          &nbsp;&nbsp;수입 · 지출 · 순수익
        </div>

        <div class="bar-container">
          <div class="chart-bar">
            <span class="amount-label"
              >{{ store.income.toLocaleString() }}원</span
            >
            <div
              class="income-chart"
              :style="{ height: store.incomeHeight + 'px' }"
            ></div>
            <span class="label-text">총수입</span>
          </div>

          <div class="chart-bar">
            <span class="amount-label"
              >{{ store.expense.toLocaleString() }}원</span
            >
            <div
              class="expense-chart"
              :style="{ height: store.expenseHeight + 'px' }"
            ></div>
            <span class="label-text">지출</span>
          </div>

          <div class="chart-bar">
            <span class="amount-label"
              >{{ store.revenue.toLocaleString() }}원</span
            >
            <div
              class="revenue-chart"
              :style="{ height: store.revenueHeight + 'px' }"
            ></div>
            <span class="label-text">순수익</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import PieChart from '@/components/PieChart.vue';
import { useReportStore } from '@/stores/report';

const store = useReportStore();

onMounted(() => {
  store.fetchData();
});
</script>

<style scoped>
.charts-wrapper {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 20px;
  width: 95%;
  max-width: 1100px;
  margin: 0 auto;
  box-sizing: border-box;
}
.month-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fbc2d7;
  padding: 12px 20px;
  border-radius: 40px;
  border: 1.5px solid var(--border-color);
  width: 95%;
  max-width: 1100px;
  margin: 0 auto 30px auto;
  box-sizing: border-box;
}
.left-graph,
.right-graph {
  display: flex;
  flex-direction: column;
  flex: 0 0 calc(50% - 15px);
  background-color: #fbc2d7;
  border-radius: 40px;
  padding: 40px 15px;
  box-sizing: border-box;
  min-height: 470px;
}
.category-expense,
.total {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 30px;
  align-self: flex-start;
  width: 100%;
}
img {
  width: 22px;
}
.pie-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bar-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  gap: 15px;
  padding-bottom: 20px;
}
.chart-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.amount-label {
  font-size: 10px;
  font-weight: bold;
  color: #666;
  margin-bottom: 5px;
  white-space: nowrap;
}
.label-text {
  font-size: 13px;
  margin-top: 5px;
  color: #333;
}
.income-chart,
.expense-chart,
.revenue-chart {
  width: 60px;
  border-radius: 10px;
  transition: height 0.5s ease;
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
.arrow-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
}
</style>
