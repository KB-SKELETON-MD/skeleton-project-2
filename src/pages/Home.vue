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
        <br />
        <h1>
          <b>+ {{ store.totalIncome.toLocaleString() }}원</b>
        </h1>
      </div>

      <div class="summary-card expense" @click="$router.push('/expense')">
        <p><strong>지출</strong></p>
        <br />
        <h1>
          <b>- {{ store.totalExpense.toLocaleString() }}원</b>
        </h1>
      </div>

      <div class="summary-card profit">
        <p><strong>순수익</strong></p>
        <br />
        <h1
          :style="{
            color: store.netProfit >= 0 ? '#0284c7' : '#d14c4c',
          }"
        >
          <b>
            {{ store.netProfit >= 0 ? '+' : ''
            }}{{ store.netProfit.toLocaleString() }}원
          </b>
        </h1>
      </div>
    </section>

    <section class="bottom-row">
      <button
        class="card-pink transaction-list"
        @click="$router.push('/transactions')"
      >
        <p><strong>최근 거래 내역</strong></p>

        <div
          v-for="item in latestItems"
          :key="item.id"
          class="transaction-item"
        >
          <span>{{ item.date.slice(5) }}</span>
          <hr />
          <span>{{ item.memo }}</span>
          <hr />
          <span :class="item.type"
            ><b>{{ item.amount.toLocaleString() }}원</b></span
          >
        </div>
      </button>

      <article class="card-pink chart-box" @click="$router.push('/report')">
        <div class="report-header">
          <p><strong>상세 리포트 보기</strong></p>
        </div>
        <Chart />
      </article>

      <aside class="action-area">
        <button class="add-btn" @click="$router.push('/add')">
          + 추가하기
        </button>
        <div class="illust-wrap" style="text-align: center">
          <img src="@/assets/character.png" alt="커플사진" class="couple-img" />
          <div class="textbox">
            <img src="@/assets/bottomtext.png" alt="커플텍스트" width="200px" />
          </div>
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
  [...store.filteredTransactions]
    .sort((a, b) => {
      const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();

      if (dateDiff !== 0) return dateDiff;

      return b.id - a.id;
    })
    .slice(0, 5),
);
onMounted(() => {
  if (store.transactions.length === 0) store.fetchData();
});
</script>

<style>
.transaction-list {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  padding: 24px 20px;
  border: none;
  background-color: #f8edee;
  border-radius: 24px;
  cursor: pointer;
  text-align: left;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.08);
}

.transaction-list h3 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 700;
}

.transaction-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
}

.transaction-item:last-child {
  border-bottom: none;
}

.transaction-date {
  flex: 0 0 68px;
  font-size: 16px;
  color: #222;
}

.transaction-memo {
  flex: 1;
  font-size: 17px;
  color: #222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.transaction-amount {
  flex: 0 0 110px;
  text-align: right;
  font-size: 18px;
  font-weight: 700;
}
</style>
