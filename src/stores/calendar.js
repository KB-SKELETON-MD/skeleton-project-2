import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCalendarStore = defineStore('calendar', () => {
  const isCalendarOpen = ref(false);
  const isProfileOpen = ref(false);

  const currentYear = ref(2026);
  const currentMonth = ref(4);

  const currentMonthLabel = computed(
    () => `${currentYear.value}년 ${currentMonth.value}월`,
  );

  const toggleCalendar = () => {
    isCalendarOpen.value = !isCalendarOpen.value;
    if (isCalendarOpen.value) {
      isProfileOpen.value = false;
    }
  };

  const closeCalendar = () => {
    isCalendarOpen.value = false;
  };

  const toggleProfile = () => {
    isProfileOpen.value = !isProfileOpen.value;
    if (isProfileOpen.value) {
      isCalendarOpen.value = false;
    }
  };

  const closeProfile = () => {
    isProfileOpen.value = false;
  };

  const closeAllPanels = () => {
    isCalendarOpen.value = false;
    isProfileOpen.value = false;
  };

  const setMonth = (year, month) => {
    currentYear.value = year;
    currentMonth.value = month;
  };

  const changeMonth = (delta) => {
    currentMonth.value += delta;

    if (currentMonth.value > 12) {
      currentMonth.value = 1;
      currentYear.value += 1;
    }

    if (currentMonth.value < 1) {
      currentMonth.value = 12;
      currentYear.value -= 1;
    }
  };

  return {
    isCalendarOpen,
    isProfileOpen,
    currentYear,
    currentMonth,
    currentMonthLabel,
    toggleCalendar,
    closeCalendar,
    toggleProfile,
    closeProfile,
    closeAllPanels,
    setMonth,
    changeMonth,
  };
});
