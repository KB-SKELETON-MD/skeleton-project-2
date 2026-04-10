<template>
  <div class="page-container">
    <header class="list-header">
      <button class="back-btn" @click="$router.back()">◀</button>
      <h2>{{ store.currentMonth }}월 수입 내역</h2>
    </header>

    <div class="search-box">
      <input
        v-model.trim="searchQuery"
        type="text"
        class="search-input"
        placeholder="메모, 날짜, 금액으로 검색"
      />
      <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">
        ✕
      </button>
    </div>
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
      <div v-if="incomeList.length === 0" class="empty-msg">
        해당 달의 수입 내역이 없습니다.
      </div>

      <div v-else-if="searchedIncomeList.length === 0" class="empty-msg">
        검색 결과가 없습니다.
      </div>

      <div
        v-for="item in searchedIncomeList"
        :key="item.id"
        class="list-item card-surface"
      >
        <div class="item-info">
          <span class="item-date">{{ item.date }}</span>
          <span class="item-memo">{{ item.memo }}</span>
        </div>
        <div class="item-amount income-text">
          + {{ item.amount.toLocaleString() }}원
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onUnmounted } from 'vue';
import { useFinanceStore } from '@/stores/finance';

const store = useFinanceStore();
const searchQuery = ref('');

const filteredCategories = computed(() =>
  store.categories.filter((t) => t.type === 'income'),
);

const incomeList = computed(() =>
  store.filteredTransactions.filter((t) => t.type === 'income'),
);

const searchedIncomeList = computed(() => {
  const keyword = searchQuery.value.toLowerCase().trim();

  if (!keyword) return incomeList.value;

  return incomeList.value.filter((item) => {
    const dateText = String(item.date ?? '').toLowerCase();
    const memoText = String(item.memo ?? '').toLowerCase();
    const amountText = String(item.amount ?? '');
    const formattedAmountText = Number(item.amount ?? 0).toLocaleString();

    return (
      dateText.includes(keyword) ||
      memoText.includes(keyword) ||
      amountText.includes(keyword) ||
      formattedAmountText.includes(keyword)
    );
  });
});
// 페이지를 떠날 때 다른 페이지에 영향 주지 않도록 필터 리셋
onUnmounted(() => store.setCategory(null));
</script>

<style scoped>
.page-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.list-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 25px;
  padding: 5px 0;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: #fff;
  border: 1px solid #fbc2d7;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #ff7aa2;
  font-size: 14px;
  box-shadow: 0 2px 5px rgba(251, 194, 215, 0.3);
}

.search-box {
  position: relative;
  margin-bottom: 18px;
}

.search-input {
  width: 100%;
  padding: 12px 42px 12px 14px;
  border: 1px solid #f3c7d5;
  border-radius: 12px;
  outline: none;
  font-size: 0.95rem;
  background: #fff;
  box-sizing: border-box;
}

.search-input:focus {
  border-color: #ff8fb1;
}

.clear-btn {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
  color: #999;
  font-size: 0.95rem;
}

.back-btn:hover {
  background-color: #fbc2d7;
  color: white;
  transform: translateX(-3px);
}
.list-header h2 {
  font-size: 1.4rem;
  font-weight: 800;
  color: #444;
  margin: 0;
  letter-spacing: -0.5px;
}

/* 3. 자동 줄바꿈 카테고리 필터 바 */
.category-filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 8px;
  padding: 10px 0 25px 0;
  width: 100%;
}

.filter-btn {
  flex: 0 1 auto;
  padding: 8px 16px;
  border-radius: 50px;
  border: 1px solid #f1f1f1;
  background-color: #ffffff;
  font-size: 0.9rem;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
}

.filter-btn.active {
  background-color: #ff7aa2; /* 테마 유지를 위해 핑크 유지 */
  color: white;
  border-color: #ff7aa2;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(255, 122, 162, 0.3);
}

/* 4. 리스트 아이템 디자인 */
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  margin-bottom: 12px;
  border-radius: 16px;
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
  font-size: 1.05rem;
}

.item-date {
  font-size: 0.85rem;
  color: #999;
}

/* 5. 수입 전용: 초록색 텍스트 포인트 */
.income-text {
  color: #4cd170; /* 수입의 상징 초록색 */
  font-weight: bold;
  font-size: 1.15rem;
  white-space: nowrap;
}

.empty-msg {
  text-align: center;
  padding: 80px 0;
  color: #bbb;
}

/* 반응형 미디어 쿼리 */
@media (max-width: 600px) {
  .page-container {
    padding: 15px;
  }
  .list-header h2 {
    font-size: 1.25rem;
  }
  .filter-btn {
    padding: 6px 12px;
    font-size: 0.85rem;
  }
  .item-amount {
    font-size: 1rem;
  }
}
</style>
