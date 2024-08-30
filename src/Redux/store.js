// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import genreReducer from "./Slices/genreSlice.js";

const store = configureStore({
    reducer: {
        genres: genreReducer,
    },
});
export default store;