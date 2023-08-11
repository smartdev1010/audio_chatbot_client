import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
  isCall: 0,
  settings: {},
  currenturl: "",
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
    startCall: (state) => {
      state.isCall = 1;
    },
    endCall: (state) => {
      state.isCall = 0;
    },
    setSettings: (state, payload) => {
      state.settings = payload.payload;
    },
    setUrl: (state, payload) => {
      console.log(payload.payload["url"]);
      state.currenturl = payload.payload["url"];
      console.log(state.currenturl);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addHistory, startCall, endCall, setSettings, setUrl } =
  historySlice.actions;

export default historySlice.reducer;
