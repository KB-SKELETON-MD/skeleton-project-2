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
  position: relative;
}

.page-area {
  position: relative;
}
</style>
