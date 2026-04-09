import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const errorMessage = ref('');

  const loadUser = () => {
    const saved = localStorage.getItem('user');
    user.value = saved ? JSON.parse(saved) : null;
  };

  const login = async (username, password) => {
    try {
      errorMessage.value = '';

      const response = await axios.get('/db.json');
      const users = response.data.users || [];

      const foundUser = users.find(
        (item) => item.username === username && item.password === password,
      );

      if (!foundUser) {
        errorMessage.value = '아이디 또는 비밀번호가 올바르지 않습니다.';
        return false;
      }

      user.value = {
        id: foundUser.id,
        username: foundUser.username,
        name: foundUser.name,
      };

      localStorage.setItem('user', JSON.stringify(user.value));
      return true;
    } catch (error) {
      console.error('로그인 실패:', error);
      errorMessage.value = '로그인 중 오류가 발생했습니다.';
      return false;
    }
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem('user');
  };

  const setErrorMessage = (message) => {
    errorMessage.value = message;
  };

  return {
    user,
    errorMessage,
    login,
    logout,
    loadUser,
    setErrorMessage,
  };
});
