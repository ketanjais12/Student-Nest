import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Check for existing user in local storage to keep them logged in across refreshes
const user = JSON.parse(localStorage.getItem('user'));

// Async thunk for logging in
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await api.post('/auth/login', userData);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

// Async thunk for registration
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await api.post('/auth/register', userData);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    user: user ? user : null, 
    isLoading: false, 
    error: null 
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login Cases
      .addCase(login.pending, (state) => { 
        state.isLoading = true; 
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register Cases
      .addCase(register.pending, (state) => { 
        state.isLoading = true; 
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;