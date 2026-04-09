<template>
  <div class="dashboard-page">
    <div class="month-selector">
      <div class="month-bar">
        <button class="arrow-btn" @click="changeMonth(-1)"><</button>
        <span class="current-date"
          >{{ currentYear }}년 {{ currentMonth }}월</span
        >
        <button class="arrow-btn" @click="changeMonth(+1)">></button>
      </div>
    </div>

    <div class="center-graph">
      <div class="chart-bar">
        <span class="amount-label">{{ income.toLocaleString() }}원</span>
        <div
          class="income-chart"
          :style="{ height: incomeHeight + 'px' }"
        ></div>
        <span>총수입</span>
      </div>

      <div class="chart-bar">
        <span class="amount-label">{{ expense.toLocaleString() }}원</span>
        <div
          class="expense-chart"
          :style="{ height: expenseHeight + 'px' }"
        ></div>
        <span>지출</span>
      </div>

      <div class="chart-bar">
        <span class="amount-label">{{ revenue.toLocaleString() }}원</span>
        <div
          class="revenue-chart"
          :style="{ height: revenueHeight + 'px' }"
        ></div>
        <span>순수익</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// --- 1. 상태 변수 선언  ---
const transactions = ref([]); // 서버 데이터를 담을 배열
const currentYear = ref(2025); // 2025년 데이터가 많으므로 2025로 시작
const currentMonth = ref(3); // 데이터가 있는 3월로 기본 설정

// --- 2. 데이터 불러오기 함수 ---
const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/transactions');
    transactions.value = response.data;
  } catch (error) {
    console.error('데이터 로딩 실패:', error);
  }
};

// --- 3. 필터링 및 합계 계산 (Computed) ---
const income = computed(() => {
  if (!transactions.value) return 0;
  return transactions.value
    .filter((t) => {
      const d = new Date(t.date);
      return (
        d.getFullYear() === currentYear.value &&
        d.getMonth() + 1 === currentMonth.value &&
        t.type === 'income'
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);
});

const expense = computed(() => {
  if (!transactions.value) return 0;
  return transactions.value
    .filter((t) => {
      const d = new Date(t.date);
      return (
        d.getFullYear() === currentYear.value &&
        d.getMonth() + 1 === currentMonth.value &&
        t.type === 'expense'
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);
});

const revenue = computed(() => income.value - expense.value);

const max_height = 150;
const max_value = computed(() => {
  const values = [income.value, expense.value, Math.abs(revenue.value)];
  return Math.max(...values, 1);
});

const incomeHeight = computed(
  () => (income.value / max_value.value) * max_height,
);
const expenseHeight = computed(
  () => (expense.value / max_value.value) * max_height,
);
const revenueHeight = computed(
  () => (Math.abs(revenue.value) / max_value.value) * max_height,
);

onMounted(fetchData);

const changeMonth = (delta) => {
  currentMonth.value += delta;
  if (currentMonth.value > 12) {
    currentMonth.value = 1;
    currentYear.value++;
  }
  if (currentMonth.value < 1) {
    currentMonth.value = 12;
    currentYear.value--;
  }
};
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
