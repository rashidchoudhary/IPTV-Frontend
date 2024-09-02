import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getJWT = () => {
    return localStorage.getItem('token'); 
};

export const fetchSeries = createAsyncThunk('series/fetchSeries', async () => {
    const response = await axios.get('http://localhost:2024/series', {
        headers: {
            Authorization: `Bearer ${getJWT()}`,
        },
    });
    return response.data.data;
});

export const addSeries = createAsyncThunk('series/addSeries', async (series) => {
    
    const response = await axios.post('http://localhost:2024/series', series, {
        headers: {
            Authorization: `Bearer ${getJWT()}`,
            'Content-Type': 'multipart/form-data'
        },
    });
    return response.data.data;
});

export const editSeries = createAsyncThunk('series/editSeries', async ({ id, series }) => {
    console.log(id);
    const response = await axios.patch(`http://localhost:2024/series/${id}`, series, {
        headers: {
            Authorization: `Bearer ${getJWT()}`,
            'Content-Type': 'multipart/form-data'
        },
    });
    return response.data.data;
});

export const deleteSeries = createAsyncThunk('series/deleteSeries', async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:2024/series/${id}`, {
        headers: {
            Authorization: `Bearer ${getJWT()}`,
        },
    });
    return id;
});
export const fetchSeriesById = createAsyncThunk('series/fetchSeriesById', async (id) => {
    try {
        const response = await axios.get(`http://localhost:2024/series/${id}`, {
            headers: {
                Authorization: `Bearer ${getJWT()}`,
            },
        });
        return response.data.data; 
    } catch (error) {
        console.error(`Error fetching series with ID: ${id}`, error);
        throw error;
    }
});


const seriesSlice = createSlice({
    name: 'series',
    initialState: {
        seriesList: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSeries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSeries.fulfilled, (state, action) => {
                state.loading = false;
                state.seriesList = action.payload;
            })
            .addCase(fetchSeries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addSeries.fulfilled, (state, action) => {
                state.seriesList.push(action.payload);
            })
            .addCase(editSeries.fulfilled, (state, action) => {
                const updatedSeries = action.payload;
                const index = state.seriesList.findIndex((series) => series._id === updatedSeries._id);
                if (index !== -1) {
                    state.seriesList[index] = updatedSeries;
                }
            })
            .addCase(deleteSeries.fulfilled, (state, action) => {
                state.seriesList = state.seriesList.filter((series) => series._id !== action.payload);
            });
    },
});

export default seriesSlice.reducer;
