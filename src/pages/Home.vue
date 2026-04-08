<template>
  <div class="dashboard-page">
    <section class="month-selector-container">
      <div class="selector-controls">
        <button class="month-arrow" @click="changeMonth(-1)">◀</button>
        <h2 class="current-month">{{ currentYear }}년 {{ currentMonth }}월</h2>
        <button class="month-arrow" @click="changeMonth(1)">▶</button>
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

      <article class="card-pink chart-box"></article>

      <aside class="action-area">
        <button class="add-btn">+ 추가하기</button>
        <div class="illust-wrap" style="text-align: center">
          <img src="@/assets/couple.png" alt="커플사진" class="couple-img" />
        </div>
      </aside>
    </section>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCalendarStore } from '@/stores/calendar';

const calendarStore = useCalendarStore();
const { currentYear, currentMonth } = storeToRefs(calendarStore);
const { changeMonth } = calendarStore;
</script>

<style></style>
