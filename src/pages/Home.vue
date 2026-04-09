<template>
  <div class="dashboard-page" v-if="!store.isLoading">
    <button class="quick-add-btn" @click="$router.push('/add')">
      <span class="plus-icon">+</span>
    </button>

    <section class="month-selector-container">
      <div class="selector-controls">
        <button class="month-arrow" @click="store.setMonth(-1)">◀</button>
        <h2 class="current-month">
          {{ store.currentYear }}년 {{ store.currentMonth }}월
        </h2>
        <button class="month-arrow" @click="store.setMonth(1)">▶</button>
      </div>
    </section>

    <section class="summary-grid">
      <div class="summary-card income" @click="$router.push('/income')">
        <p><strong>총수입</strong></p>
        <strong>+ {{ store.totalIncome.toLocaleString() }}원</strong>
      </div>

      <div class="summary-card expense" @click="$router.push('/expense')">
        <p><strong>지출</strong></p>
        <strong>- {{ store.totalExpense.toLocaleString() }}원</strong>
      </div>

      <div class="summary-card profit">
        <p><strong>순수익</strong></p>
        <strong
          :style="{
            color: store.netProfit >= 0 ? '#0284c7' : '#d14c4c',
          }"
        >
          {{ store.netProfit >= 0 ? '+' : ''
          }}{{ store.netProfit.toLocaleString() }}원
        </strong>
      </div>
    </section>

    <section class="bottom-row">
      <article class="card-pink transaction-list">
        <h3><strong>최근 거래 내역</strong></h3>
        <div
          v-for="item in latestItems"
          :key="item.id"
          class="transaction-item"
        >
          <span>{{ item.date.slice(5) }}</span>
          <span>{{ item.memo }}</span>
          <span :class="item.type">{{ item.amount.toLocaleString() }}원</span>
        </div>
      </article>

      <article class="card-pink chart-box" @click="$router.push('/report')">
        <Chart />
        <p class="tap-guide">상세 리포트 보기</p>
      </article>

      <aside class="action-area">
        <button class="add-btn" @click="$router.push('/add')">
          + 추가하기
        </button>
        <div class="illust-wrap" style="text-align: center">
          <img src="@/assets/couple.png" alt="커플사진" class="couple-img" />
        </div>
      </aside>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useFinanceStore } from '@/stores/finance';
import Chart from '@/components/Chart.vue';

const store = useFinanceStore();

const latestItems = computed(() =>
  [...store.filteredTransactions].reverse().slice(0, 5),
);
1;
onMounted(() => {
  if (store.transactions.length === 0) store.fetchData();
});
</script>

<style></style>
