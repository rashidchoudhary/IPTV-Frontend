import { configureStore } from '@reduxjs/toolkit';
import genreReducer from "./Slices/genreSlice.js";
import seriesReducer from "./Slices/seriesSlice.js"; // Import the series reducer

const store = configureStore({
    reducer: {
        genres: genreReducer,
        series: seriesReducer, // Add the series reducer
    },
});

export default store;
