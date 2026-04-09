<template>
  <div class="dashboard-page">
    <div class="month-selector">
      <div class="month-bar">
        <button class="arrow-btn" @click="store.changeMonth(-1)"><</button>
        <span class="current-date"
          >{{ store.currentYear }}년 {{ store.currentMonth }}월</span
        >
        <button class="arrow-btn" @click="store.changeMonth(1)">></button>
      </div>
    </div>

    <div class="center-graph">
      <div class="chart-bar">
        <span class="amount-label">{{ store.income.toLocaleString() }}원</span>
        <div
          class="income-chart"
          :style="{ height: store.incomeHeight + 'px' }"
        ></div>
        <span>총수입</span>
      </div>

      <div class="chart-bar">
        <span class="amount-label">{{ store.expense.toLocaleString() }}원</span>
        <div
          class="expense-chart"
          :style="{ height: store.expenseHeight + 'px' }"
        ></div>
        <span>지출</span>
      </div>

      <div class="chart-bar">
        <span class="amount-label">{{ store.revenue.toLocaleString() }}원</span>
        <div
          class="revenue-chart"
          :style="{ height: store.revenueHeight + 'px' }"
        ></div>
        <span>순수익</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useReportStore } from '@/stores/report';

// 리포트 전담 스토어 호출
const store = useReportStore();

onMounted(() => {
  // 메인 데이터가 비어있을 때만 데이터를 가져옵니다.
  // (Home에서 이미 가져왔다면 이 과정은 생략되어 속도가 빨라집니다!)
  if (store.income === 0 && store.expense === 0) {
    store.fetchData();
  }
});
</script>

<style scoped>
.amount-label {
  font-size: 11px;
  font-weight: bold;
  color: #666;
  margin-bottom: 5px;
  white-space: nowrap;
}

.brand-name {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
}

.arrow-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
}

.month-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary-pink);
  padding: 12px 20px;
  border-radius: 40px;
  border: 1.5px solid var(--border-color);
  margin-bottom: 30px;
}

.center-graph {
  display: flex;
  align-items: flex-end;
  gap: 30px;
  justify-content: center;
  border-radius: 40px;
  padding: 50px 20px;
  margin-top: 20px;
  background-color: var(--primary-pink);
  min-height: 250px;
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
