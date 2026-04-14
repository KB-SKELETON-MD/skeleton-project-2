<template>
  <div class="page-container">
    <header class="list-header">
      <button class="back-btn" @click="$router.back()">◀</button>
      <h2>{{ store.currentMonth }}월 지출 내역</h2>
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
      <div v-if="expenseList.length === 0" class="empty-msg">
        해당 달의 지출 내역이 없습니다.
      </div>

      <div v-else-if="searchedExpenseList.length === 0" class="empty-msg">
        검색 결과가 없습니다.
      </div>

      <div
        v-for="item in searchedExpenseList"
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
import { computed, ref, onUnmounted } from 'vue';
import { useFinanceStore } from '@/stores/finance';

const store = useFinanceStore();
const searchQuery = ref('');

const filteredCategories = computed(() =>
  store.categories.filter((c) => c.type === 'expense'),
);

const expenseList = computed(() =>
  store.filteredTransactions.filter((t) => t.type === 'expense'),
);

const searchedExpenseList = computed(() => {
  const keyword = searchQuery.value.toLowerCase().trim();

  if (!keyword) return expenseList.value;

  return expenseList.value.filter((item) => {
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
onUnmounted(() => store.setCategory(null));
</script>

<style scoped>
/* 1. 전체 컨테이너: 패딩 조절 */
.page-container {
  padding: 20px;
  max-width: 800px; /* 데스크탑에서 너무 퍼지지 않게 제한 */
  margin: 0 auto;
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

/* 1. 헤더 컨테이너: 전체적인 정렬과 간격 */
.list-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 25px;
  padding: 5px 0;
}

/* 2. 뒤로가기 버튼: 동그랗고 입체감 있는 디자인 */
.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: #fff; /* 깨끗한 흰색 배경 */
  border: 1px solid #fbc2d7; /* 테두리는 포인트 핑크 */
  border-radius: 50%; /* 완전 동그랗게 */
  cursor: pointer;
  transition: all 0.2s ease;
  color: #ff7aa2; /* 화살표 색상 */
  font-size: 14px;
  box-shadow: 0 2px 5px rgba(251, 194, 215, 0.3); /* 은은한 그림자 */
}

/* 버튼 위에 마우스 올렸을 때 효과 */
.back-btn:hover {
  background-color: #fbc2d7;
  color: white;
  transform: translateX(-3px); /* 왼쪽으로 살짝 움직이는 애니메이션 */
}

/* 3. 타이틀 텍스트: 굵기 증가와 색상 조절 */
.list-header h2 {
  font-size: 1.4rem;
  font-weight: 800; /* 아주 두껍게 */
  color: #444; /* 너무 까맣지 않은 차콜색 */
  margin: 0;
  letter-spacing: -0.5px; /* 글자 간격 좁혀서 세련되게 */
}

/* 월 숫자에만 포인트를 주고 싶다면? (선택사항) */
.list-header h2::first-letter {
  color: #ff5c8a;
}
/* 1. 카테고리 필터바: 여러 줄로 자연스럽게 배치 */
.category-filter-bar {
  display: flex;
  flex-wrap: wrap; /* ⭐️ 핵심: 공간이 부족하면 다음 줄로 넘김 */
  gap: 10px 8px; /* 위아래 10px, 좌우 8px 간격 */
  padding: 10px 0 25px 0;
  width: 100%;
}

/* 2. 필터 버튼: 크기를 일정하게 유지하면서 예쁘게 */
.filter-btn {
  flex: 0 1 auto; /* 내용에 맞게 크기 조절 */
  padding: 8px 16px;
  border-radius: 50px; /* 더 둥글둥글하게 */
  border: 1px solid #f1f1f1;
  background-color: #ffffff;
  font-size: 0.9rem;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03); /* 아주 살짝 입체감 */
}

/* 3. 활성화된 버튼 (포인트 컬러 적용) */
.filter-btn.active {
  background-color: #ff7aa2;
  color: white;
  border-color: #ff7aa2;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(255, 122, 162, 0.3);
}

/* 마우스 올렸을 때 살짝 강조 */
.filter-btn:hover:not(.active) {
  border-color: #fbc2d7;
  background-color: #fff9fb;
  color: #ff7aa2;
}

/* 4. 지출 목록: 모바일 대응 레이아웃 */
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  margin-bottom: 12px;
  border-radius: 16px;
  border: 1px solid #eee;
  background: #fff;
  transition: transform 0.2s;
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

.list-item:active {
  transform: scale(0.98); /* 터치 시 눌리는 효과 */
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: hidden; /* 메모가 너무 길면 잘리게 방지 */
}

.item-memo {
  font-weight: 600;
  font-size: 1.05rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 긴 메모는 ... 처리 */
}

.item-date {
  font-size: 0.85rem;
  color: #999;
}

.item-amount {
  font-weight: bold;
  font-size: 1.15rem;
  white-space: nowrap;
  margin-left: 10px;
}

/* 📱 모바일 환경 (화면 너비 600px 이하) */
@media (max-width: 600px) {
  .page-container {
    padding: 15px;
  }

  .list-header h2 {
    font-size: 1.25rem;
  }

  .filter-btn {
    padding: 6px 14px;
    font-size: 0.85rem;
  }

  .list-item {
    padding: 15px;
  }

  .item-memo {
    font-size: 0.95rem;
  }

  .item-amount {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .category-filter-bar {
    gap: 8px 6px;
  }
  .filter-btn {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
}

/* 📟 아주 작은 폰 (화면 너비 380px 이하) */
@media (max-width: 380px) {
  .list-item {
    padding: 12px;
  }

  .item-amount {
    font-size: 0.9rem;
  }
}

.empty-msg {
  text-align: center;
  padding: 80px 0;
  color: #bbb;
}

.expense-text {
  color: #d14c4c;
}
</style>
