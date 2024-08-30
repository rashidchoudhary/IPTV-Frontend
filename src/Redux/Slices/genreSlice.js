// redux/app/genreSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch genres from the backend
export const fetchGenres = createAsyncThunk('genres/fetchGenres', async () => {
    const response = await axios.get('http://localhost:2024/genre');
    return response.data.data; // Ensure this matches your backend response
});

// Add a new genre
export const addGenre = createAsyncThunk('genres/addGenre', async (genre) => {
    const response = await axios.post('http://localhost:2024/genre', genre);
    return response.data.data; // Ensure this matches your backend response
});

// Edit an existing genre
export const editGenre = createAsyncThunk('genres/editGenre', async ({ id, name }) => {
    const response = await axios.patch(`http://localhost:2024/genre/${id}`, { name });
    return response.data.data; // Ensure this matches your backend response
});

// Delete a genre
export const deleteGenre = createAsyncThunk('genres/deleteGenre', async (id) => {
    await axios.delete(`http://localhost:2024/genre/${id}`);
    return id;
});

const genreSlice = createSlice({
    name: 'genres',
    initialState: {
        genres: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenres.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.loading = false;
                state.genres = action.payload;
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addGenre.fulfilled, (state, action) => {
                state.genres.push(action.payload);
            })
            .addCase(editGenre.fulfilled, (state, action) => {
                const updatedGenre = action.payload;
                const index = state.genres.findIndex((genre) => genre._id === updatedGenre._id);
                if (index !== -1) {
                    state.genres[index] = updatedGenre;
                }
            })
            .addCase(deleteGenre.fulfilled, (state, action) => {
                state.genres = state.genres.filter((genre) => genre._id !== action.payload);
            });
    },
});

export default genreSlice.reducer;
