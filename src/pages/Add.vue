<template>
  <div class="account-book-page">
    <div class="add-wrap">
      <h2 class="title">거래 내역 추가</h2>

      <div class="input-group">
        <input
          type="text"
          v-model.trim="store.newItem.text"
          placeholder="거래 내용을 입력하세요"
          @keyup.enter="store.addItem"
        />

        <input
          type="number"
          v-model.number="store.newItem.amount"
          placeholder="금액"
          @keyup.enter="store.addItem"
        />

        <select v-model="store.newItem.type">
          <option value="expense">지출</option>
          <option value="income">수입</option>
        </select>

        <button class="add-btn" @click="store.addItem">추가</button>
      </div>

      <ul class="list">
        <li v-for="item in store.items" :key="item.id" class="list-item">
          <span> {{ item.date }} </span>
          <span>{{ item.type === 'expense' ? '지출' : '수입' }} </span>
          <span>{{ item.memo }} </span>
          <span>{{ item.amount.toLocaleString() }}원 </span>
          <button class="delete-btn" @click="store.deleteItem(item.id)">
            삭제
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAddStore } from '@/stores/add';

const store = useAddStore();

onMounted(() => {
  store.fetchItems();
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
  text-align: center;
}

.input-group {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  align-items: stretch;
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
  border: 1px solid #ccc;
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
  height: 48px;
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
