import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  shouldFetch: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setShouldFetch(state, action) {
      state.shouldFetch = action.payload;
    },
    clearSearch(state) {
      state.searchQuery = "";
      state.shouldFetch = false;
    },
  },
});

export const { updateSearchQuery, setShouldFetch, clearSearch } =
  searchSlice.actions;

export default searchSlice.reducer;
