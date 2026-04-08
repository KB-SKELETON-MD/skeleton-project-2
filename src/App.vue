<template>
  <div id="app" class="app-shell" @click="handleAppClick">
    <Header />

    <div class="panel-layer">
      <CalendarPanel v-if="isCalendarOpen" />
      <ProfilePanel v-if="isProfileOpen" />
    </div>

    <main class="page-area">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import Header from '@/components/Header.vue';
import CalendarPanel from '@/components/CalendarPanel.vue';
import ProfilePanel from '@/components/ProfilePanel.vue';
import { useCalendarStore } from '@/stores/calendar';

const calendarStore = useCalendarStore();
const { isCalendarOpen, isProfileOpen } = storeToRefs(calendarStore);

const handleAppClick = (event) => {
  const clickedInsideHeader = event.target.closest('.top-bar');
  const clickedInsidePanel = event.target.closest('.panel');

  if (!clickedInsideHeader && !clickedInsidePanel) {
    calendarStore.closeAllPanels();
  }
};
</script>

<style>
.app-shell {
  min-height: 100vh;
  background: #fffafb;
  position: relative;
}

.panel-layer {
  position: absolute;
  top: 10px; /* 헤더 높이 바로 아래 */
  right: 10px; /* 헤더 버튼 쪽에 맞춤 */
  z-index: 2000;
}

.page-area {
  position: relative;
}
</style>
