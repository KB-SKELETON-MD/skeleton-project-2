<template>
  <div class="page-container">
    <header class="list-header">
      <button class="back-btn" @click="$router.back()">◀</button>
      <h2>{{ store.currentMonth }}월 지출 내역</h2>
    </header>

    <div class="category-filter-bar">
      <button
        :class="['filter-btn', { active: store.selectedCategoryId === null }]"
        @click="store.setCategory(null)"
      >
        전체
      </button>
      <button
        v-for="cat in filteredCategories"
        :key="cat.id"
        :class="['filter-btn', { active: store.selectedCategoryId === cat.id }]"
        @click="store.setCategory(cat.id)"
      >
        {{ cat.label }}
      </button>
    </div>
    <div class="list-wrapper">
      <div v-if="expenseList.length === 0" class="eempty-msg">
        해당 달의 지출 내역이 없습니다.
      </div>
      <div
        v-for="item in expenseList"
        :key="item.id"
        class="list-item card-surface"
      >
        <div class="item-info">
          <span class="item-date">{{ item.date }}</span>
          <span class="item-memo">{{ item.memo }}</span>
        </div>
        <div class="item-amount expense-text">
          - {{ item.amount.toLocaleString() }}원
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onUnmounted } from 'vue';
import { useFinanceStore } from '@/stores/finance';
import { useRouter } from 'vue-router';

const store = useFinanceStore();
const router = useRouter();
const filteredCategories = computed(() =>
  store.categories.filter((c) => c.type === 'expense'),
);

const expenseList = computed(() =>
  store.filteredTransactions.filter((t) => t.type === 'expense'),
);

const handleBack = () => {
  store.setCategory(null);
  router.back();
};

onUnmounted(() => store.setCategory(null));
</script>

<style scoped>
.page-container {
  padding: 20px;
}
.list-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}
.back-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  margin-bottom: 12px;
  border-radius: 12px;
  border: 1px solid #eee;
  background: #fff;
}
.item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.item-date {
  font-size: 0.8rem;
  color: #888;
}
.item-memo {
  font-weight: 600;
}

/* 텅 비었을 때 메시지 스타일 추가 */
.empty-msg {
  text-align: center;
  padding: 50px 0;
  color: #999;
}

/* 지출: 빨간색 계열 (Income.vue의 초록색과 대비) */
.expense-text {
  color: #d14c4c;
  font-weight: bold;
  font-size: 1.1rem;
}

.category-filter-bar {
  display: flex;
  gap: 10px;
  overflow-x: auto; /* 카테고리가 많으면 옆으로 스크롤 */
  padding: 10px 0 20px;
  -ms-overflow-style: none; /* 스크롤바 숨기기 */
  scrollbar-width: none;
}
.category-filter-bar::-webkit-scrollbar {
  display: none;
}

.filter-btn {
  white-space: nowrap;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: #f9f9f9;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn.active {
  background: #ff7aa2; /* 가계쀼 포인트 컬러 */
  color: white;
  border-color: #ff7aa2;
}
</style>
