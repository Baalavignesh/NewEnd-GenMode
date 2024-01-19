import { createSlice } from "@reduxjs/toolkit";

const emptyTokens = {
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: emptyTokens,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
    }
  },
});

export const { setTokens } = authSlice.actions;

export default authSlice.reducer;