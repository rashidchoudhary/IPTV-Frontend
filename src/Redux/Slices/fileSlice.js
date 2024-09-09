import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFiles = createAsyncThunk('files/fetchFiles', async () => {
    try {
        const response = await axios.get('http://localhost:2024/file');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to fetch files');
    }
});

const fileSlice = createSlice({
    name: 'files',
    initialState: {
        files: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFiles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFiles.fulfilled, (state, action) => {
                state.files = action.payload;
                state.loading = false;
            })
            .addCase(fetchFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default fileSlice.reducer;
