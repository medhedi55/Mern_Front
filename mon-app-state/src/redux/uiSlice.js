import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { message: '', visible: false },
  reducers: {
    showToast(_state, { payload }) {
      return { message: payload, visible: true };
    },
    hideToast() {
      return { message: '', visible: false };
    },
  },
});

export const { showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;
