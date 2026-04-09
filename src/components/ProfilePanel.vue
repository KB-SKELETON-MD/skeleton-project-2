<template>
  <div class="panel profile-panel" @click.stop>
    <!-- D-Day -->
    <div class="couple-dday">
      <p class="section-label">💖 함께한지</p>
      <h3 class="dday-count">+{{ dDay }}일</h3>
      <p class="next-milestone">
        {{ nextMilestone }}일까지 {{ daysLeft }}일 남음
      </p>
    </div>

    <!-- 분기별 버킷리스트 -->
    <div class="bucket-section">
      <p class="section-label">🎯 우리 목표</p>
      <p class="quarter-label">{{ currentQuarter }}분기 목표</p>

      <ul class="bucket-list">
        <li
          v-for="item in bucketList"
          :key="item.id"
          :class="{ done: item.completed }"
        >
          <label class="bucket-item">
            <input type="checkbox" v-model="item.completed" />
            <span>{{ item.text }}</span>
          </label>
        </li>
      </ul>
    </div>

    <!-- 로그아웃 -->
    <button class="logout">🚪 로그아웃</button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const startDate = new Date('2025-01-28');

// D-day
const dDay = computed(() => {
  const today = new Date();
  const diffTime = today - startDate;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
});

const nextMilestone = computed(() => {
  return Math.ceil(dDay.value / 100) * 100;
});

const daysLeft = computed(() => {
  return nextMilestone.value - dDay.value;
});

// 현재 분기 계산
const currentQuarter = computed(() => {
  const month = new Date().getMonth() + 1;

  if (month <= 3) return 1;
  if (month <= 6) return 2;
  if (month <= 9) return 3;
  return 4;
});

// 분기별 기본 목표
const quarterGoals = {
  1: [
    { id: 1, text: '💰 같이 30만원 모으기', completed: false },
    { id: 2, text: '☕ 카페 데이트 5번 하기', completed: false },
    { id: 3, text: '📸 커플 사진 20장 찍기', completed: false },
  ],
  2: [
    { id: 4, text: '🌸 봄 여행 가기', completed: false },
    { id: 5, text: '🍽 맛집 6곳 가기', completed: false },
    { id: 6, text: '🎬 영화관 데이트 3번', completed: false },
  ],
  3: [
    { id: 7, text: '✈️ 여름 여행 가기', completed: false },
    { id: 8, text: '💍 커플 아이템 맞추기', completed: false },
    { id: 9, text: '💸 데이트비 50만원 모으기', completed: false },
  ],
  4: [
    { id: 10, text: '🎄 연말 데이트 계획', completed: false },
    { id: 11, text: '💌 서로 편지 쓰기', completed: false },
    { id: 12, text: '🍰 기념일 케이크 먹기', completed: false },
  ],
};

// 현재 리스트
const bucketList = ref([]);

// localStorage key 생성
const getStorageKey = (q) => `bucket_${q}`;

// 분기 바뀔 때 로드
watch(
  currentQuarter,
  (q) => {
    const saved = localStorage.getItem(getStorageKey(q));

    if (saved) {
      bucketList.value = JSON.parse(saved);
    } else {
      bucketList.value = quarterGoals[q].map((item) => ({ ...item }));
    }
  },
  { immediate: true },
);

// 체크 상태 변경 시 저장
watch(
  bucketList,
  (newList) => {
    localStorage.setItem(
      getStorageKey(currentQuarter.value),
      JSON.stringify(newList),
    );
  },
  { deep: true },
);
</script>

<style scoped>
.panel {
  position: absolute;
  right: 24px;
  width: 280px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid #f3d6df;
  padding: 18px;
  z-index: 1200;
}

.couple-dday {
  padding-bottom: 14px;
  border-bottom: 1px solid #f3e4e8;
  margin-bottom: 14px;
}

.section-label {
  margin: 0 0 8px 0;
  font-size: 15px;
  font-weight: 700;
  color: #444;
}

.dday-count {
  margin: 0;
  font-size: 26px;
  font-weight: 800;
  color: #2d1f26;
}

.next-milestone {
  margin: 8px 0 0;
  font-size: 13px;
  color: #888;
}

.bucket-section {
  margin-bottom: 16px;
}

.quarter-label {
  margin: 0 0 10px 0;
  font-size: 13px;
  color: #d16a82;
  font-weight: 600;
}

.bucket-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.bucket-list li + li {
  margin-top: 10px;
}

.bucket-item {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 15px;
  color: #333;
}

.bucket-item input[type='checkbox'] {
  width: 16px;
  height: 16px;
  accent-color: #ff8fab;
}

.done span {
  text-decoration: line-through;
  color: #aaa;
}

.logout {
  margin-top: 8px;
  width: 100%;
  border: none;
  background: #ffe3eb;
  padding: 12px;
  border-radius: 12px;
  color: #d65a7a;
  font-weight: 600;
  cursor: pointer;
}

.logout:hover {
  background: #ffd5e2;
}
</style>
