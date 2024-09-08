import { configureStore } from '@reduxjs/toolkit';
import genreReducer from "./Slices/genreSlice.js";
import seriesReducer from "./Slices/seriesSlice.js";
import seasonReducer from "./Slices/seasonSlice.js";

const store = configureStore({
    reducer: {
        genres: genreReducer,
        series: seriesReducer,
        seasons: seasonReducer,
    },
});

export default store;
