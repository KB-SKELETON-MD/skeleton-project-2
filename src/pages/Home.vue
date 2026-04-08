<template>
  <div class="dashboard-page" v-if="!store.isLoading">
    <header class="top-bar">
      <div class="brand-area">
        <img src="@/assets/logos.png" alt="가계쀼 로고" class="logo-icon" />
        <span class="brand-name">가계쀼</span>
      </div>

      <div class="top-actions">
        <button class="icon-btn">🔍</button>
        <button class="icon-btn">📅</button>
        <button class="profile-circle"></button>
      </div>

      <button class="quick-add-btn" @click="handleAddAction" title="빠른 추가">
        <span class="plus-icon">+</span>
      </button>
    </header>

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
          :style="{ color: store.netProfit >= 0 ? '#0284c7' : '#d14c4c' }"
        >
          {{ store.netProfit >= 0 ? '+' : ''
          }}{{ store.netProfit.toLocaleString() }}원
        </strong>
      </div>
    </section>

    <section class="bottom-row">
      <article class="card-pink transaction-list">
        <h3><strong>최근 거래 내역</strong></h3>
        <div class="transaction-item">
          <span>정보</span>
        </div>
        <div class="transaction-item">
          <span>정보</span>
        </div>
      </article>

      <article class="card-pink chart-box"></article>

      <aside class="action-area">
        <button class="add-btn" @click="router.push('/add')">+ 추가하기</button>
        <div class="illust-wrap" style="text-align: center">
          <img src="@/assets/couple.png" alt="커플사진" class="couple-img" />
        </div>
      </aside>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useTradeInfoStore } from '@/stores/tradeInfo';

const store = useTradeInfoStore();

onMounted(() => {
  if (store.transactions.length === 0) {
    store.fetchData();
  }
});
</script>

<style></style>
