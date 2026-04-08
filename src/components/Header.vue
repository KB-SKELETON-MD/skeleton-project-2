<template>
  <header class="top-bar">
    <div class="brand-area" @click="goHome">
      <img src="@/assets/logos.png" alt="가계쀼 로고" class="logo-icon" />
      <span class="brand-name">가계쀼</span>
    </div>

    <div class="top-actions">
      <button
        class="icon-btn"
        @click.stop="toggleCalendar"
        aria-label="달력 열기"
      >
        📅
      </button>
      <button class="profile-circle" @click.stop="toggleProfile">G</button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCalendarStore } from '@/stores/calendar';

const router = useRouter();
const calendarStore = useCalendarStore();

const goHome = () => {
  calendarStore.closeAllPanels();
  router.push('/');
};

const toggleCalendar = () => {
  calendarStore.toggleCalendar();
};

const toggleProfile = () => {
  calendarStore.toggleProfile();
};
</script>

<style scoped>
.top-bar {
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  background-color: #ffffff;
  border-bottom: 1px solid #f1d8e0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.brand-area {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.logo-icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.brand-name {
  font-size: 22px;
  font-weight: 800;
  color: #ff6f91;
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-btn {
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  background: #ffe4ec;
  cursor: pointer;
  font-size: 18px;
}

.profile-circle {
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  background: #ff8fab;
  color: white;
  font-weight: 700;
  cursor: pointer;
}
</style>
