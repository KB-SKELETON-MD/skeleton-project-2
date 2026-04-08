<template>
  <div class="panel profile-panel" @click.stop>
    <!-- 상단 사용자 정보 -->
    <div class="profile-top">
      <div class="avatar">G</div>
      <div>
        <p class="name">규민님</p>
        <p class="email">gumin@example.com</p>
      </div>
    </div>

    <!-- 요약 -->
    <div class="summary">
      <p>💰 수입: 1,200,000원</p>
      <p>💸 지출: 800,000원</p>
    </div>

    <!-- 메뉴 -->
    <div class="menu-list">
      <button class="menu-item" @click="goTransactions">📄 거래내역</button>
      <button class="menu-item" @click="goReport">📊 리포트</button>
      <button class="menu-item" @click="goSettings">⚙️ 설정</button>
    </div>

    <!-- 로그아웃 -->
    <button class="logout">🚪 로그아웃</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCalendarStore } from '@/stores/calendar';

const router = useRouter();
const store = useCalendarStore();

const goTransactions = () => {
  store.closeAllPanels();
  router.push('/transactions');
};

const goReport = () => {
  store.closeAllPanels();
  router.push('/report');
};

const goSettings = () => {
  store.closeAllPanels();
  router.push('/settings');
};
</script>

<style scoped>
.panel {
  position: absolute;
  top: 84px;
  right: 24px;
  width: 280px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid #f3d6df;
  padding: 18px;
  z-index: 1200;
}

/* 사용자 정보 */
.profile-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #ff8fab;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.name {
  margin: 0;
  font-weight: 700;
}

.email {
  margin: 4px 0 0;
  color: #888;
  font-size: 13px;
}

/* 요약 */
.summary {
  margin: 12px 0;
  font-size: 14px;
}

/* 메뉴 */
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}

.menu-item {
  width: 100%;
  text-align: left;
  border: none;
  background: #fff4f7;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}

/* 로그아웃 */
.logout {
  margin-top: 14px;
  width: 100%;
  border: none;
  background: #ffe3eb;
  padding: 10px;
  border-radius: 10px;
  color: #d65a7a;
  cursor: pointer;
}
</style>
