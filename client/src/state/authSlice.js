import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  user:{},
  initialState,
  reducers: {
    login: (state,action) => {
      state.isLoggedIn = true;
      state.user = action.payload; 
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;