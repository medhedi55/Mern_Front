import { createSlice } from '@reduxjs/toolkit';

function loadItems() {
  try {
    const items = JSON.parse(localStorage.getItem('techstore_cart'));
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

function updateTotals(state) {
  state.totalCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function recalculateTotals(state) {
  updateTotals(state);
  localStorage.setItem('techstore_cart', JSON.stringify(state.items));
}

const initialState = {
  items: loadItems(),
  totalCount: 0,
  totalPrice: 0,
  discountPercent: 0,
};
updateTotals(initialState);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, { payload }) {
      const existing = state.items.find((item) => item.id === payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...payload, quantity: 1 });
      }
      recalculateTotals(state);
    },
    removeItem(state, { payload }) {
      const existing = state.items.find((item) => item.id === payload);
      if (existing?.quantity > 1) {
        existing.quantity -= 1;
      } else if (existing) {
        state.items = state.items.filter((item) => item.id !== payload);
      }
      recalculateTotals(state);
    },
    clearCart(state) {
      state.items = [];
      state.discountPercent = 0;
      recalculateTotals(state);
    },
    applyPromoCode(state, { payload }) {
      if (payload === 'POLY2027') {
        state.discountPercent = 20;
      }
    },
  },
});

export const { addItem, removeItem, clearCart, applyPromoCode } = cartSlice.actions;
export default cartSlice.reducer;
