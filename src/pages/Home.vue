<template>
  <div class="dashboard-page">
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
    </header>

    <section class="month-selector-container">
      <div class="selector-controls">
        <button class="month-arrow" @click="store.changeMonth(-1)">◀</button>
        <h2 class="current-month">{{ store.currentMonth }}월</h2>
        <button class="month-arrow" @click="store.changeMonth(1)">▶</button>
      </div>
    </section>

    <section class="summary-grid">
      <div class="summary-card income">
        <p><strong>총수입</strong></p>
      </div>
      <div class="summary-card expense">
        <p><strong>지출</strong></p>
      </div>
      <div class="summary-card profit">
        <p><strong>순수익</strong></p>
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

      <article class="card-pink chart-box" @click="router.push('/report')">
        <Chart
          :income="store.income"
          :expense="store.expense"
          :revenue="store.revenue"
        />
      </article>

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
import Chart from '@/components/Chart.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useFinanceStore } from '@/stores/finance';

const store = useFinanceStore();
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentMonth = ref(4);

onMounted(() => {
  store.fetchData();
});
</script>

<style></style>
