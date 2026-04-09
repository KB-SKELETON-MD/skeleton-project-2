<template>
  <div class="panel calendar-panel" @click.stop>
    <div class="panel-header">
      <button class="year-btn" @click="changeDisplayYear(-1)">‹</button>
      <h3>{{ displayYear }}년</h3>
      <button class="year-btn" @click="changeDisplayYear(1)">›</button>
    </div>

    <div class="month-grid">
      <button
        v-for="month in 12"
        :key="month"
        class="month-item"
        :class="{ active: isSelectedMonth(month) }"
        @click="selectMonth(month)"
      >
        {{ month }}월
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useCalendarStore } from '@/stores/calendar';
import { useRoute, useRouter } from 'vue-router';

const calendarStore = useCalendarStore();
const router = useRouter();
const route = useRoute();
const { currentYear, currentMonth, isCalendarOpen } =
  storeToRefs(calendarStore);

const displayYear = ref(currentYear.value);

watch(isCalendarOpen, (opened) => {
  if (opened) {
    displayYear.value = currentYear.value;
  }
});

const changeDisplayYear = (delta) => {
  displayYear.value += delta;
};

const isSelectedMonth = (month) => {
  return (
    currentYear.value === displayYear.value && currentMonth.value === month
  );
};

const selectMonth = async (month) => {
  calendarStore.setMonth(displayYear.value, month);
  calendarStore.closeCalendar();

  if (route.path !== '/') {
    await router.push('/');
  }
};
</script>

<style scoped>
.panel {
  position: absolute;
  right: 24px;
  width: 320px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid #f3d6df;
  padding: 18px;
  z-index: 1200;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.panel-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.year-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: #fff1f5;
  cursor: pointer;
  font-size: 18px;
}

.month-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.month-item {
  border: none;
  border-radius: 14px;
  background: #fff4f7;
  padding: 14px 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}

.month-item:hover {
  background: #ffe3eb;
}

.month-item.active {
  background: #ff8fab;
  color: white;
}
</style>
