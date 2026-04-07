<template>
  <Header />
  <div class="container">
    <div class="body">
      <div class="summary-grid summary-card">
        <p><router-link to="/income"> 수입 </router-link></p>
        <p><router-link to="/expense"> 지출 </router-link></p>
        <p>순수익</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from './Header.vue';
</script>

<style></style>
