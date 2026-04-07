<template>
  <div>
    <Header />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import Header from './pages/Header.vue';
</script>

<style lang="scss" scoped></style>
