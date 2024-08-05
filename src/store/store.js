import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./clientSlice";
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    client: clientReducer,
    search: searchReducer,
  },
});

export default store;
