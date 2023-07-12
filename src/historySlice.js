import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistory: (state, payload) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.history = [
        ...state.history,
        {
          type: payload.payload.type,
          value: payload.payload.value,
        },
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addHistory } = historySlice.actions;

export default historySlice.reducer;
