import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getJWT = () => {
    return localStorage.getItem('token');
};

// Fetch all seasons
export const fetchSeasons = createAsyncThunk('seasons/fetchSeasons', async () => {
    const response = await axios.get('http://localhost:2024/season', {
        headers: {
            Authorization: `Bearer ${getJWT()}`, // Fixed template literal syntax
        },
    });
    return response.data.data; // Ensure this returns the correct data array
});

// Fetch a season by ID
export const fetchSeasonById = createAsyncThunk('seasons/fetchSeasonById', async (id) => {
    console.log("Season id in slice is", id)
    const response = await axios.get(`http://localhost:2024/season/${id}`, { // Fixed template literal syntax
        headers: {
            Authorization: `Bearer ${getJWT()}`, // Fixed template literal syntax
        },
    });
    return response.data.data;
});

// Add a new season
export const addSeason = createAsyncThunk('seasons/addSeason', async (season) => {
    const response = await axios.post('http://localhost:2024/season', season, {
        headers: {
            Authorization: `Bearer ${getJWT()}`, // Fixed template literal syntax
        },
    });
    return response.data.data;
});

// Edit an existing season
export const editSeason = createAsyncThunk('seasons/editSeason', async ({ id, name, description, series_id }) => {
    const response = await axios.patch(`http://localhost:2024/season/${id}`, { name, description, series_id }, { // Fixed template literal syntax
        headers: {
            Authorization: `Bearer ${getJWT()}`, // Fixed template literal syntax
        },
    });
    return response.data.data;
});

// Delete a season
export const deleteSeason = createAsyncThunk('seasons/deleteSeason', async (id) => {
    await axios.delete(`http://localhost:2024/season/${id}`, { // Fixed template literal syntax
        headers: {
            Authorization: `Bearer ${getJWT()}`, // Fixed template literal syntax
        },
    });
    return id;
});

const seasonSlice = createSlice({
    name: 'seasons',
    initialState: {
        seasons: [],
        season: null, // To hold the single season fetched by ID
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSeasons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSeasons.fulfilled, (state, action) => {
                state.loading = false;
                state.seasons = action.payload;
            })
            .addCase(fetchSeasons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchSeasonById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSeasonById.fulfilled, (state, action) => {
                state.loading = false;
                state.season = action.payload;
            })
            .addCase(fetchSeasonById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addSeason.fulfilled, (state, action) => {
                state.seasons.push(action.payload);
            })
            .addCase(editSeason.fulfilled, (state, action) => {
                const updatedSeason = action.payload;
                const index = state.seasons.findIndex((season) => season._id === updatedSeason._id);
                if (index !== -1) {
                    state.seasons[index] = updatedSeason;
                }
            })
            .addCase(deleteSeason.fulfilled, (state, action) => {
                state.seasons = state.seasons.filter((season) => season._id !== action.payload);
            });
    },
});

export default seasonSlice.reducer;
