import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticate } from "../utils";

export const signup = createAsyncThunk(
  "user/signup",
  async ({ payload, clearForm }) => {
    const user = await authenticate("signup", payload);
    if (user.token) {
      clearForm();
      return user;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: JSON.parse(localStorage.getItem("user")) || {},
  },
  reducers: {},
  extraReducers: {
    [signup.fulfilled]: (state, action) => {
      state.data = action.payload || {};
    },
  },
});

export default userSlice.reducer;
