<template>
  <div class="account-book-page">
    <header class="top-bar">
      <div class="brand-area">
        <img src="@/assets/logos.png" alt="가계쀼 로고" class="logo-icon" />
        <span class="brand-name">가계쀼</span>
      </div>

      <div class="top-actions">
        <button class="icon-btn">🔍</button>
        <button class="icon-btn">📅</button>
        <button class="profile-circle"></button>
      </div>
    </header>

    <div class="add-wrap">
      <h2 class="title">거래 내역 추가</h2>

      <div class="input-group">
        <input
          type="text"
          v-model.trim="newItem.text"
          placeholder="거래 내용을 입력하세요"
          @keyup.enter="addItem"
        />

        <input
          type="number"
          v-model.number="newItem.amount"
          placeholder="금액"
          @keyup.enter="addItem"
        />

        <select v-model="newItem.type">
          <option value="expense">지출</option>
          <option value="income">수입</option>
        </select>

        <button class="add-btn" @click="addItem">추가</button>
      </div>

      <ul class="list">
        <li v-for="item in items" :key="item.id" class="list-item">
          <span>
            {{ item.type === 'expense' ? '지출' : '수입' }} / {{ item.memo }} /
            {{ item.amount.toLocaleString() }}원
          </span>
          <button class="delete-btn" @click="deleteItem(item.id)">삭제</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const API_URL = 'http://localhost:3000/transactions';

const newItem = ref({
  text: '',
  amount: null,
  type: 'expense',
});

const items = ref([]);

const fetchItems = async () => {
  try {
    const response = await axios.get(API_URL);
    items.value = response.data;
  } catch (error) {
    console.error('데이터 불러오기 실패:', error);
  }
};

const addItem = async () => {
  if (!newItem.value.text || !newItem.value.amount) return;

  const newData = {
    date: new Date().toISOString().slice(0, 10),
    type: newItem.value.type,
    categoryId: newItem.value.type === 'expense' ? 114 : 1,
    amount: newItem.value.amount,
    memo: newItem.value.text,
    isFixed: false,
  };

  try {
    await axios.post(API_URL, newData);
    await fetchItems();

    newItem.value = {
      text: '',
      amount: null,
      type: 'expense',
    };
  } catch (error) {
    console.error('데이터 추가 실패:', error);
  }
};

const deleteItem = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    items.value = items.value.filter((item) => item.id !== id);
  } catch (error) {
    console.error('데이터 삭제 실패:', error);
  }
};

onMounted(() => {
  fetchItems();
});
</script>

<style scoped>
.add-wrap {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
}

.title {
  margin-bottom: 16px;
}

.input-group {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
}

.input-group input,
.input-group select,
.input-group button {
  height: 48px;
  padding: 0 14px;
  box-sizing: border-box;
  font-size: 16px;
}

.input-group input {
  min-width: 0;
}

.input-group input:first-child {
  flex: 2 1 320px;
}

.input-group input:nth-child(2) {
  flex: 1.5 1 220px;
}

.input-group select {
  flex: 0 0 120px;
}

.add-btn {
  flex: 0 0 90px;
  background: #ff7aa2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.list {
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
  padding: 12px 14px;
  border: 1px solid #3d3939;
  background-color: rgb(255, 231, 235);
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
}

.delete-btn {
  background: #ff5c5c;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  white-space: nowrap;
  cursor: pointer;
}

@media (max-width: 768px) {
  .add-wrap {
    padding: 16px;
  }

  .input-group {
    gap: 12px;
  }

  .input-group input:first-child,
  .input-group input:nth-child(2),
  .input-group select,
  .add-btn {
    flex: 1 1 100%;
  }

  .list-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .delete-btn {
    align-self: flex-end;
  }
}
</style>
