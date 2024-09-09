import { configureStore } from '@reduxjs/toolkit';
import genreReducer from "./Slices/genreSlice.js";
import seriesReducer from "./Slices/seriesSlice.js";
import seasonReducer from "./Slices/seasonSlice.js";
import episodeReducer from "./Slices/episodeSlice.js";
import fileReducer from "./Slices/fileSlice.js";

const store = configureStore({
    reducer: {
        genres: genreReducer,
        series: seriesReducer,
        seasons: seasonReducer,
        episodes: episodeReducer,
        files: fileReducer,
    },
});

export default store;
