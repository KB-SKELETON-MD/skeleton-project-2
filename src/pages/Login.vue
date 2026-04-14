<template>
  <div class="login-page">
    <div class="login-card">
      <h2>로그인</h2>

      <input
        v-model="username"
        type="text"
        placeholder="아이디 입력"
        class="login-input"
      />

      <input
        v-model="password"
        type="password"
        placeholder="비밀번호 입력"
        class="login-input"
        @keyup.enter="handleLogin"
      />

      <p v-if="authStore.errorMessage" class="error-text">
        {{ authStore.errorMessage }}
      </p>

      <button @click="handleLogin" class="login-btn">로그인</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  if (!username.value.trim() || !password.value.trim()) {
    authStore.errorMessage = '아이디와 비밀번호를 입력해주세요.';
    return;
  }

  const success = await authStore.login(
    username.value.trim(),
    password.value.trim(),
  );

  if (success) {
    router.push('/');
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fffafb;
}

.login-card {
  width: 360px;
  background: white;
  padding: 32px 24px;
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid #f3d6df;
}

.login-card h2 {
  margin: 0 0 20px;
  text-align: center;
  color: #ff6f91;
}

.login-input {
  width: 100%;
  padding: 12px 14px;
  margin-bottom: 12px;
  border: 1px solid #f0d7df;
  border-radius: 12px;
  outline: none;
  font-size: 14px;
  box-sizing: border-box;
}

.login-btn {
  width: 100%;
  border: none;
  background: #ff8fab;
  color: white;
  padding: 12px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
}

.login-btn:hover {
  background: #ff759b;
}

.error-text {
  margin: 0 0 12px;
  color: #d65a7a;
  font-size: 13px;
}
</style>
