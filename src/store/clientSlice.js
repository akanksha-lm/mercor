import { createSlice } from "@reduxjs/toolkit";
import { apiKeys } from "../contants/constants";

const clientSlice = createSlice({
  name: "client",
  initialState: {
    clientId: apiKeys[0],
    remainingRequests: 50,
    currentClientIdIndex: 0,
  },
  reducers: {
    setRemainingRequests: (state, action) => {
      state.remainingRequests = action.payload;
      if (state.remainingRequests === 0) {
        state.currentClientIdIndex++;
        if (state.currentClientIdIndex >= apiKeys.length) {
          state.currentClientIdIndex = 0;
        }
        state.clientId = apiKeys[state.currentClientIdIndex];
        state.remainingRequests = 50; // Reset remaining requests for the new client ID
      }
    },
  },
});

export const { setRemainingRequests } = clientSlice.actions;

export default clientSlice.reducer;
