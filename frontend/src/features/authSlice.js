import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';


const user = JSON.parse(localStorage.getItem('user'));


export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await api.post('/auth/login', userData);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});


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