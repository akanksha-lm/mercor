import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "client",
  initialState: {
    clientId: null,
  },
  reducers: {
    setClientId: (state, action) => {
      state.clientId = action.payload;
    },
  },
});

export const { setClientId } = clientSlice.actions;

export default clientSlice.reducer;
