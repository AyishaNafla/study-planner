import { createSlice } from "@reduxjs/toolkit";

// Restore the logged-in user from localStorage when the app starts.
const savedUser = localStorage.getItem("user");
const parsedUser = savedUser ? JSON.parse(savedUser) : null;

const initialState = {
  user: parsedUser,
  isLoggedIn: Boolean(parsedUser),
  role: parsedUser ? parsedUser.role || "user" : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.role = action.payload.role || "user";

      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.role = null;

      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;