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

      <table class="transaction-table">
        <thead>
          <tr>
            <th>날짜</th>
            <th>구분</th>
            <th>내용</th>
            <th>금액</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in store.items" :key="item.id">
            <td>{{ item.date }}</td>
            <td>{{ item.type === 'expense' ? '지출' : '수입' }}</td>
            <td>{{ item.memo }}</td>
            <td class="amount-cell">{{ item.amount.toLocaleString() }}원</td>
            <td>
              <button class="delete-btn" @click="store.deleteItem(item.id)">
                삭제
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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

/* 테이블 전체 */
.transaction-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0 12px;
}

/* 헤더 */
.transaction-table thead th {
  padding: 12px 10px;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  color: #555;
}

/* 본문 셀 */
.transaction-table tbody td {
  padding: 16px 12px;
  text-align: center;
  vertical-align: middle;
  background-color: rgb(255, 231, 235);
  border-top: 1px solid #3d3939;
  border-bottom: 1px solid #3d3939;
  word-break: keep-all;
}

/* 각 행 양 끝 둥글게 */
.transaction-table tbody td:first-child {
  border-left: 1px solid #3d3939;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.transaction-table tbody td:last-child {
  border-right: 1px solid #3d3939;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

/* 열 너비 */
.transaction-table th:nth-child(1),
.transaction-table td:nth-child(1) {
  width: 18%;
}

.transaction-table th:nth-child(2),
.transaction-table td:nth-child(2) {
  width: 12%;
}

.transaction-table th:nth-child(3),
.transaction-table td:nth-child(3) {
  width: 36%;
}

.transaction-table th:nth-child(4),
.transaction-table td:nth-child(4) {
  width: 18%;
}

.transaction-table th:nth-child(5),
.transaction-table td:nth-child(5) {
  width: 16%;
}

/* 금액 오른쪽 정렬 */
.amount-cell {
  text-align: right !important;
  font-weight: 600;
  padding-right: 20px !important;
}

.delete-btn {
  background: #ff5c5c;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  white-space: nowrap;
  cursor: pointer;
}

/* 모바일 */
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

  .transaction-table {
    font-size: 14px;
  }

  .transaction-table thead th,
  .transaction-table tbody td {
    padding: 12px 8px;
  }

  .amount-cell {
    padding-right: 10px !important;
  }

  .delete-btn {
    padding: 6px 10px;
    font-size: 13px;
  }
}
</style>
