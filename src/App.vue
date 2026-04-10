<template>
  <div id="app" class="app-shell" @click="handleAppClick">
    <template v-if="route.path !== '/login'">
      <Header />

      <div class="panel- layer">
        <CalendarPanel v-if="isCalendarOpen" />
        <ProfilePanel v-if="isProfileOpen" />
      </div>
    </template>

    <main class="page-area">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import CalendarPanel from '@/components/CalendarPanel.vue';
import ProfilePanel from '@/components/ProfilePanel.vue';
import { useCalendarStore } from '@/stores/calendar';

const route = useRoute();
const calendarStore = useCalendarStore();
const { isCalendarOpen, isProfileOpen } = storeToRefs(calendarStore);

const handleAppClick = (event) => {
  if (route.path === '/login') return;

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
