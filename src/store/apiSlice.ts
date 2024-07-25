import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApiRequestParams, ApiState } from '../lib/interface';

const initialState: ApiState = {
    data: null,
    status: 'idle',
    error: null,
};

export const apiRequest = createAsyncThunk<any, ApiRequestParams>(
    'api/apiRequest',
    async ({ url, method = 'GET', body, headers = { 'Content-Type': 'application/json' } }, { rejectWithValue }) => {
        try {
            const response = await fetch(url, {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(apiRequest.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(apiRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(apiRequest.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default apiSlice.reducer;