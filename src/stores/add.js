import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import { useFinanceStore } from './finance'; // 메인 창고 임포트

export const useAddStore = defineStore('add', () => {
  const financeStore = useFinanceStore();
  const API_URL = 'http://localhost:3000/transactions';

  // 1. 상태 (State)
  const newItem = ref({
    text: '',
    amount: null,
    type: 'expense',
  });

  // 2. 데이터 공유 (Getters)
  // financeStore의 transactions를 그대로 가져와서 리스트에 보여줍니다.
  //   const items = computed(() => financeStore.transactions);
  const items = computed(() => {
    return [...financeStore.transactions].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date).getTime();
      const dateB = new Date(b.createdAt || b.date).getTime();

      if (dateB !== dateA) {
        return dateB - dateA; // 최신 날짜가 위로
      }

      return b.id - a.id; // 날짜 같으면 id 큰 게 위로
    });
  });

  // 3. 데이터 추가 (Actions)
  const addItem = async () => {
    if (!newItem.value.text || !newItem.value.amount) return;

    const newData = {
      date: new Date().toISOString().slice(0, 10),
      type: newItem.value.type,
      // 기존 로직 유지: 지출이면 114(기타), 수입이면 1(급여)
      categoryId: newItem.value.type === 'expense' ? 114 : 1,
      amount: newItem.value.amount,
      memo: newItem.value.text,
      isFixed: false,
    };

    try {
      // 서버에 저장
      await axios.post(API_URL, newData);

      // 메인 창고(finance.js)의 데이터를 새로고침 (이게 핵심!)
      await financeStore.fetchData();

      // 입력창 초기화
      newItem.value = { text: '', amount: null, type: 'expense' };
    } catch (error) {
      console.error('데이터 추가 실패:', error);
    }
  };

  // 4. 데이터 삭제 (Actions)
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // 삭제 후 메인 창고 새로고침
      await financeStore.fetchData();
    } catch (error) {
      console.error('데이터 삭제 실패:', error);
    }
  };

  return {
    newItem,
    items,
    addItem,
    deleteItem,
    fetchItems: financeStore.fetchData, // 기존 fetchItems를 메인 창고 함수로 연결
  };
});
