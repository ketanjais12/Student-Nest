import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchHostels = createAsyncThunk('hostels/fetchAll', async (filters, thunkAPI) => {
  try {
    const response = await api.get('/hostels', { params: filters });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch hostels');
  }
});

const hostelSlice = createSlice({
  name: 'hostels',
  initialState: { hostels: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHostels.pending, (state) => { state.loading = true; })
      .addCase(fetchHostels.fulfilled, (state, action) => {
        state.loading = false;
        state.hostels = action.payload;
      })
      .addCase(fetchHostels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default hostelSlice.reducer;