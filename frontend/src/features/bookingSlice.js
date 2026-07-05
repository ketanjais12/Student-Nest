import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchStudentBookings = createAsyncThunk('bookings/fetchStudent', async (_, thunkAPI) => {
  try {
    const response = await api.get('/bookings/student');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
  }
});

export const fetchOwnerBookings = createAsyncThunk('bookings/fetchOwner', async (_, thunkAPI) => {
  try {
    const response = await api.get('/bookings/owner');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
  }
});

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: { bookings: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentBookings.pending, (state) => { state.loading = true; })
      .addCase(fetchStudentBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchStudentBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOwnerBookings.pending, (state) => { state.loading = true; })
      .addCase(fetchOwnerBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchOwnerBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default bookingSlice.reducer;