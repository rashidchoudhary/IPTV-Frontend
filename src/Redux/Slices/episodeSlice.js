import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getJWT = () => {
    return localStorage.getItem('token');
};

export const fetchEpisodes = createAsyncThunk('episodes/fetchEpisodes', async () => {
    const response = await axios.get('http://localhost:2024/episode', {
        headers: {
            Authorization: `Bearer ${getJWT()}`,
        },
    });
    return response.data.data; 
});

export const fetchEpisodeById = createAsyncThunk('episodes/fetchEpisodeById', async (id) => {
    console.log("Episode id in slice is", id)
    const response = await axios.get(`http://localhost:2024/episode/${id}`, {
        headers: {
            Authorization: `Bearer ${getJWT()}`, 
        },
    });
    return response.data.data;
});

export const addEpisode = createAsyncThunk('episodes/addEpisode', async (episode) => {
    const response = await axios.post('http://localhost:2024/episode', episode, {
        headers: {
            Authorization: `Bearer ${getJWT()}`,
        },
    });
    return response.data.data;
});

export const editEpisode = createAsyncThunk('episodes/editEpisode', async ({ id, name, description, season_id }) => {
    const response = await axios.patch(`http://localhost:2024/episode/${id}`, { name, description, season_id }, {
        headers: {
            Authorization: `Bearer ${getJWT()}`, 
        },
    });
    return response.data.data;
});

export const deleteEpisode = createAsyncThunk('episodes/deleteEpisode', async (id) => {
    await axios.delete(`http://localhost:2024/episode/${id}`, {
        headers: {
            Authorization: `Bearer ${getJWT()}`,
        },
    });
    return id;
});

const episodeSlice = createSlice({
    name: 'episodes',
    initialState: {
        episodes: [],
        episode: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEpisodes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEpisodes.fulfilled, (state, action) => {
                state.loading = false;
                state.episodes = action.payload;
            })
            .addCase(fetchEpisodes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchEpisodeById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEpisodeById.fulfilled, (state, action) => {
                state.loading = false;
                state.episode = action.payload;
            })
            .addCase(fetchEpisodeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addEpisode.fulfilled, (state, action) => {
                state.episodes.push(action.payload);
            })
            .addCase(editEpisode.fulfilled, (state, action) => {
                const updatedEpisode = action.payload;
                const index = state.episodes.findIndex((episode) => episode._id === updatedEpisode._id);
                if (index !== -1) {
                    state.episodes[index] = updatedEpisode;
                }
            })
            .addCase(deleteEpisode.fulfilled, (state, action) => {
                state.episodes = state.episodes.filter((episode) => episode._id !== action.payload);
            });
    },
});

export default episodeSlice.reducer;
