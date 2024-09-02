import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getJWT = () => {
    return localStorage.getItem('token');
};

export const fetchGenres = createAsyncThunk('genres/fetchGenres', async () => {
    const response = await axios.get('http://localhost:2024/genre', {
        headers: {
            Authorization: `Bearer ${getJWT()}`,
        },
    });
    return response.data.data; 
});

// Add a new genre
export const addGenre = createAsyncThunk('genres/addGenre', async (genre) => {
    const response = await axios.post('http://localhost:2024/genre', genre, {
        headers: {
            Authorization: `Bearer ${getJWT()}`,
        },
    });
    return response.data.data; 
});

// Edit an existing genre
export const editGenre = createAsyncThunk('genres/editGenre', async ({ id, name }) => {
    const response = await axios.patch(`http://localhost:2024/genre/${id}`, { name }, {
        headers: {
            Authorization: `Bearer ${getJWT()}`,
        },
    });
    return response.data.data;
});

export const deleteGenre = createAsyncThunk('genres/deleteGenre', async (id) => {
    await axios.delete(`http://localhost:2024/genre/${id}`, {
        headers: {
            Authorization: `Bearer ${getJWT()}`,
        },
    });
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
