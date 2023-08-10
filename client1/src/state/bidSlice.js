
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bid: null,
  remainingTime: 0,
};

const bidSlice = createSlice({
  name: 'bid',
  initialState,
  reducers: {
    setBid: (state, action) => {
      state.bid = action.payload;
      state.remainingTime = calculateRemainingTime(action.payload.endTime);
    },
    updateRemainingTime: (state) => {
      state.remainingTime -= 1;
    },
  },
});

export const { setBid, updateRemainingTime } = bidSlice.actions;
export default bidSlice.reducer;

function calculateRemainingTime(endTime) {
  const currentTime = new Date().getTime();
  const remainingSeconds = Math.floor((endTime - currentTime) / 1000);
  return remainingSeconds > 0 ? remainingSeconds : 0;
}
