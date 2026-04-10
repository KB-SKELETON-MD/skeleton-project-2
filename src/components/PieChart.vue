<template>
  <div class="pie-chart-container">
    <div
      v-if="
        !store.categoryExpenseData || store.categoryExpenseData.length === 0
      "
      class="no-data-wrapper"
    >
      <div class="no-data-icon">💸</div>
      <p>이번 달 지출 내역이 없어요!</p>
    </div>
    <Pie v-else :data="chartData" :options="chartOptions" />
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useFinanceStore } from '@/stores/finance';

ChartJS.register(ArcElement, Tooltip, Legend);
const store = useFinanceStore();

// 1. 창고 데이터를 Chart.js가 이해하는 형식으로 변환
const chartData = computed(() => {
  const dataList = store.categoryExpenseData;
  const myPalette = [
    '#FFADAD',
    '#FFD1DC',
    '#FFEA00',
    '#9BFBC0',
    '#9DB2BF',
    '#A0C4FF',
    '#BDB2FF',
    '#FFC6FF',
    '#C4FB6D',
    '#7FD8A7',
  ];

  return {
    labels: dataList.map((item) => item.name), // ['식비', '교통비'...]
    datasets: [
      {
        data: dataList.map((item) => item.amount), // [50000, 20000...]
        backgroundColor: dataList.map(
          (item, index) => item.color || myPalette[index % myPalette.length],
        ),
        hoverOffset: 20, // 마우스 올렸을 때 튀어나오는 효과
        borderWidth: 0,
        borderColor: '#ffffff',
      },
    ],
  };
});

// 2. 차트의 디자인 및 동작 옵션
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        boxWidth: 15,
        font: { size: 12 },
      },
    },
    tooltip: {
      callbacks: {
        // 마우스 올렸을 때 나오는 숫자 포맷 (원 단위 추가)
        label: (context) => {
          const label = context.label || '';
          const value = context.raw || 0;

          const total = context.chart.data.datasets[0].data.reduce(
            (a, b) => a + b,
            0,
          );
          const percentage = ((value / total) * 100).toFixed(1); // 소수점 첫째자리까지

          return ` ${label}: ${value.toLocaleString()}원 (${percentage}%)`;
        },
      },
    },
  },
};
</script>
<style scoped>
.pie-chart-container {
  width: 100%;
  max-width: 600px;
  height: 300px;
  margin: 0 auto;
  position: relative;
}

.no-data-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000000;
  background-color: #fbc2d7;
  border-radius: 20px;
}

.no-data-icon {
  font-size: 40px;
  margin-bottom: 10px;
}
</style>
